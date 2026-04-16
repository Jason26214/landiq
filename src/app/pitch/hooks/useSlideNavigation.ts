'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseSlideNavigationOptions {
	totalSlides: number
}

const readPageFromUrl = (totalSlides: number): number => {
	if (typeof window === 'undefined') return 0
	const params = new URLSearchParams(window.location.search)
	const raw = params.get('page')
	if (!raw) return 0
	const n = parseInt(raw, 10)
	if (isNaN(n)) return 0
	const idx = n - 1
	if (idx < 0) return 0
	if (idx >= totalSlides) return totalSlides - 1
	return idx
}

const writePageToUrl = (index: number) => {
	if (typeof window === 'undefined') return
	const url = new URL(window.location.href)
	url.searchParams.set('page', String(index + 1))
	window.history.replaceState(null, '', url.toString())
}

export function useSlideNavigation({ totalSlides }: UseSlideNavigationOptions) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
	const touchStartX = useRef(0)

	// Restore from ?page= on mount
	useEffect(() => {
		const initial = readPageFromUrl(totalSlides)
		if (initial !== 0) setCurrentSlide(initial)
		// eslint-disable-next-line
	}, [])

	// Keep URL in sync
	useEffect(() => {
		writePageToUrl(currentSlide)
	}, [currentSlide])

	// Listen for back/forward browser navigation
	useEffect(() => {
		const onPop = () => {
			const idx = readPageFromUrl(totalSlides)
			setCurrentSlide((prev) => {
				setDirection(idx > prev ? 'forward' : 'backward')
				return idx
			})
		}
		window.addEventListener('popstate', onPop)
		return () => window.removeEventListener('popstate', onPop)
	}, [totalSlides])

	const goTo = useCallback(
		(index: number) => {
			if (index < 0 || index >= totalSlides) return
			setDirection(index > currentSlide ? 'forward' : 'backward')
			setCurrentSlide(index)
		},
		[currentSlide, totalSlides],
	)

	const next = useCallback(() => {
		if (currentSlide < totalSlides - 1) {
			setDirection('forward')
			setCurrentSlide((s) => s + 1)
		}
	}, [currentSlide, totalSlides])

	const prev = useCallback(() => {
		if (currentSlide > 0) {
			setDirection('backward')
			setCurrentSlide((s) => s - 1)
		}
	}, [currentSlide])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key === 'ArrowRight' ||
				e.key === 'ArrowDown' ||
				e.key === ' ' ||
				e.key === 'Enter'
			) {
				e.preventDefault()
				next()
			} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
				e.preventDefault()
				prev()
			} else if (e.key === 'f' || e.key === 'F') {
				if (document.fullscreenElement) {
					document.exitFullscreen?.().catch(() => {})
				} else {
					document.documentElement.requestFullscreen?.().catch(() => {})
				}
			} else if (e.key === 'Escape') {
				document.exitFullscreen?.().catch(() => {})
			}
		}

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX.current = e.touches[0].clientX
		}

		const handleTouchEnd = (e: TouchEvent) => {
			const diff = touchStartX.current - e.changedTouches[0].clientX
			if (Math.abs(diff) > 50) {
				if (diff > 0) next()
				else prev()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('touchstart', handleTouchStart)
		window.addEventListener('touchend', handleTouchEnd)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('touchstart', handleTouchStart)
			window.removeEventListener('touchend', handleTouchEnd)
		}
	}, [next, prev])

	return { currentSlide, direction, totalSlides, next, prev, goTo }
}
