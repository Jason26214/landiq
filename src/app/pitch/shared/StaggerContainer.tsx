'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerContainerProps {
	children: ReactNode
	stagger?: number
	delay?: number
	className?: string
}

const container = {
	hidden: {},
	show: (custom: { stagger: number; delay: number }) => ({
		transition: {
			staggerChildren: custom.stagger,
			delayChildren: custom.delay,
		},
	}),
}

export const staggerItem = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function StaggerContainer({
	children,
	stagger = 0.15,
	delay = 0.2,
	className = '',
}: StaggerContainerProps) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			custom={{ stagger, delay }}
			className={className}
		>
			{children}
		</motion.div>
	)
}
