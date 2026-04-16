'use client'

import { motion } from 'framer-motion'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { Rocket, Brain, Chrome, Globe, Puzzle, CheckCircle2, Zap } from 'lucide-react'

const milestones = [
	{
		date: 'Q2 – Q3 2026',
		title: 'Core Platform & Base Report',
		icon: Rocket,
		active: true,
		status: 'In Progress',
		items: [
			'NSW + VIC data engine',
			'Site intelligence search',
			'AI base report + simple ROI',
			'Admin & operations module',
		],
	},
	{
		date: 'Q4 2026',
		title: 'ROI & Investment Engine',
		icon: Brain,
		active: false,
		status: 'Next',
		items: [
			'Per-lot ROI calculation',
			'Investment return modeling',
			'Subdivision + build feasibility',
			'Development profit analysis',
		],
	},
	{
		date: 'Q1 – Q2 2027',
		title: 'Pre-Construction Management',
		icon: Puzzle,
		active: false,
		status: 'Planned',
		items: [
			'DA approvals & consultant coordination',
			'Document management hub',
			'Email aggregation',
			'Timeline & team collaboration',
		],
	},
	{
		date: 'Q3 2027',
		title: 'Construction Management',
		icon: Globe,
		active: false,
		status: 'Stretch',
		items: [
			'On-site construction workflow',
			'Builder / contractor coordination',
			'Cost & schedule tracking',
			'⚠ Complex · delivery tentative',
		],
	},
	{
		date: 'Q4 2027',
		title: 'Property Sales',
		icon: Chrome,
		active: false,
		status: 'Target',
		items: [
			'Listing brochure generator',
			'Project marketing website',
			'Poster / flyer templates',
			'Sales pipeline & leads',
		],
	},
]

const statusStyle = (status: string) => {
	switch (status) {
		case 'In Progress':
			return 'bg-success/10 text-success'
		case 'Next':
			return 'bg-accent-light text-accent'
		case 'Stretch':
			return 'bg-accent/15 text-accent'
		default:
			return 'bg-surface-200 text-surface-500'
	}
}

export function RoadmapSlide() {
	return (
		<SlideLayout bg="bg-surface-100">
			{/* Topographic background */}
			<svg
				className="absolute inset-0 w-full h-full opacity-[0.04]"
				viewBox="0 0 1000 600"
				preserveAspectRatio="xMidYMid slice"
			>
				{[80, 160, 240, 320, 400, 480].map((y, i) => (
					<path
						key={i}
						d={`M-50 ${y} Q200 ${y - 30 + i * 10} 500 ${y + 15} T1050 ${y}`}
						fill="none"
						stroke="#134A32"
						strokeWidth="1"
					/>
				))}
			</svg>

			<div className="w-full relative z-10">
				<div className="flex items-end justify-between">
					<FadeIn>
						<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
							Roadmap 2026 – 2027
						</p>
						<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
							Full platform delivery over ~18 months
						</h2>
					</FadeIn>
					<FadeIn delay={0.3}>
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-800">
							<Zap className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
							<span className="font-sans text-xs text-white font-medium">
								AI-accelerated development
							</span>
						</div>
					</FadeIn>
				</div>

				{/* Timeline */}
				<div className="mt-12 relative">
					{/* Timeline line */}
					<motion.div
						className="absolute top-7 left-0 right-0 h-[2px] bg-primary-200"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' as const }}
						style={{ transformOrigin: 'left' }}
					/>

					{/* Progress fill */}
					<motion.div
						className="absolute top-7 left-0 h-[2px] bg-primary-800"
						initial={{ width: 0 }}
						animate={{ width: '12%' }}
						transition={{ duration: 1, delay: 0.8, ease: 'easeOut' as const }}
					/>

					<div className="flex justify-between relative">
						{milestones.map((m, i) => (
							<motion.div
								key={m.date}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 + i * 0.15 }}
								className="flex flex-col items-center w-[180px]"
							>
								{/* Node */}
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.7 + i * 0.15, type: 'spring' }}
									className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
										m.active
											? 'bg-primary-800 shadow-lg shadow-primary-800/30'
											: 'bg-white border-2 border-primary-200'
									}`}
								>
									<m.icon
										className={`w-5 h-5 ${
											m.active ? 'text-white' : 'text-primary-500'
										}`}
										strokeWidth={1.5}
									/>
								</motion.div>

								{/* Date + status */}
								<span className="font-sans text-sm font-semibold text-primary-800">
									{m.date}
								</span>
								<span
									className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${statusStyle(
										m.status,
									)}`}
								>
									{m.status}
								</span>

								{/* Title */}
								<h4 className="font-sans text-sm font-medium text-primary-900 mt-3 text-center">
									{m.title}
								</h4>

								{/* Items */}
								<ul className="mt-2 space-y-1">
									{m.items.map((item) => (
										<li
											key={item}
											className="flex items-start gap-1.5 text-left"
										>
											<CheckCircle2
												className={`w-3 h-3 mt-0.5 shrink-0 ${
													m.active ? 'text-success' : 'text-surface-400'
												}`}
												strokeWidth={1.5}
											/>
											<span className="font-sans text-[11px] text-surface-500 leading-tight">
												{item}
											</span>
										</li>
									))}
								</ul>
							</motion.div>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5 }}
					className="mt-10 flex items-center justify-between px-5 py-3 rounded-xl bg-primary-50 border border-primary-200"
				>
					<p className="font-sans text-xs text-primary-800">
						<span className="font-medium">~18-month delivery</span> — paced to funding
						cycles, with AI-assisted development throughout
					</p>
					<p className="font-sans text-xs text-surface-500">
						Scope & cadence may adjust based on investment progress
					</p>
				</motion.div>
			</div>
		</SlideLayout>
	)
}
