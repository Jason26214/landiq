'use client'

import { motion } from 'framer-motion'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { AnimatedCounter } from '../shared/AnimatedCounter'
import { StaggerContainer, staggerItem } from '../shared/StaggerContainer'
import { Building2, Clock, DollarSign, Calendar } from 'lucide-react'

const stats = [
	{ icon: Building2, value: 10000, suffix: '+', label: 'Active developers in Australia' },
	{ icon: Clock, value: 8, prefix: '', suffix: ' hrs', label: 'Manual screening per site' },
	{
		icon: DollarSign,
		value: 250,
		prefix: '$',
		suffix: 'K+',
		label: 'Due diligence per acquisition',
	},
	{ icon: Calendar, value: 12, suffix: ' weeks', label: 'Standard DD timeline' },
]

export function MarketSlide() {
	return (
		<SlideLayout bg="bg-sand-200">
			<div className="grid grid-cols-12 gap-12 w-full items-center">
				{/* Left: text */}
				<div className="col-span-5">
					<FadeIn>
						<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
							Market Context
						</p>
						<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.2]">
							A multi-billion dollar industry running on spreadsheets
						</h2>
						<p className="font-body text-[16px] text-surface-500 mt-6 leading-relaxed">
							Property development in Australia involves complex due diligence across
							fragmented government systems. The process costs developers tens of
							thousands per site — and months of delay.
						</p>
					</FadeIn>
				</div>

				{/* Right: stat grid */}
				<div className="col-span-7">
					<StaggerContainer className="grid grid-cols-2 gap-0" delay={0.5}>
						{stats.map((s) => (
							<motion.div
								key={s.label}
								variants={staggerItem}
								className="border-t-2 border-primary-800 pt-6 pb-8 px-4"
							>
								<s.icon
									className="w-5 h-5 text-primary-600 mb-4"
									strokeWidth={1.5}
								/>
								<div className="font-serif text-[clamp(2rem,4vw,3rem)] text-primary-900 leading-none">
									<AnimatedCounter
										value={s.value}
										prefix={s.prefix}
										suffix={s.suffix}
									/>
								</div>
								<p className="font-sans text-sm text-surface-500 mt-3">{s.label}</p>
							</motion.div>
						))}
					</StaggerContainer>
				</div>
			</div>

			{/* Vertical rotated label */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.08 }}
				transition={{ delay: 1 }}
				className="absolute right-8 top-1/2 -translate-y-1/2"
				style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
			>
				<span className="font-sans text-[28px] font-bold text-primary-900 tracking-[0.1em] uppercase">
					Property · Development · Intelligence
				</span>
			</motion.div>
		</SlideLayout>
	)
}
