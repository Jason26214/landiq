'use client'

import { useState, useEffect } from 'react'

interface NavigationProps {
	currentSlide: number
	totalSlides: number
	onGoTo: (index: number) => void
}

export function Navigation({ currentSlide, totalSlides, onGoTo }: NavigationProps) {
	const [visible, setVisible] = useState(true)
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleMouseMove = () => {
			setVisible(true)
			if (timeoutId) clearTimeout(timeoutId)
			const id = setTimeout(() => setVisible(false), 3000)
			setTimeoutId(id)
		}

		window.addEventListener('mousemove', handleMouseMove)
		const id = setTimeout(() => setVisible(false), 3000)
		setTimeoutId(id)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			if (timeoutId) clearTimeout(timeoutId)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div
			className={`absolute bottom-8 right-8 z-50 flex flex-col gap-2 transition-opacity duration-500 ${
				visible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			{Array.from({ length: totalSlides }).map((_, i) => (
				<button
					key={i}
					onClick={() => onGoTo(i)}
					className={`w-2.5 h-2.5 rounded-full border border-white/60 transition-all duration-300 hover:scale-125 ${
						i === currentSlide ? 'bg-white scale-110' : 'bg-white/20 hover:bg-white/50'
					}`}
					aria-label={`Go to slide ${i + 1}`}
				/>
			))}
		</div>
	)
}
