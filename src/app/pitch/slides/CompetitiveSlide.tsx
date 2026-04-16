'use client'

import { motion } from 'framer-motion'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const features = [
	'Planning Data (Zoning, FSR, Height)',
	'DCP Rules (AI Extraction)',
	'Risk Overlays (Flood/Fire/Heritage)',
	'Feasibility Engine',
	'AI Report Generation',
	'Land Acquisition CRM',
	'Project Management',
]

type Level = 'full' | 'partial' | 'none'

const competitors: Record<string, Level[]> = {
	LandIQ: ['full', 'full', 'full', 'full', 'full', 'full', 'full'],
	Landchecker: ['full', 'none', 'full', 'none', 'none', 'none', 'none'],
	Archistar: ['full', 'partial', 'full', 'partial', 'none', 'none', 'none'],
	CoreLogic: ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
	Feasly: ['none', 'none', 'none', 'full', 'none', 'none', 'none'],
}

function Dot({ level, delay }: { level: Level; delay: number }) {
	const bg =
		level === 'full' ? 'bg-success' : level === 'partial' ? 'bg-accent' : 'bg-surface-400/30'

	return (
		<motion.div
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ delay, type: 'spring', stiffness: 300 }}
			className={`w-4 h-4 rounded-full ${bg} mx-auto`}
		/>
	)
}

export function CompetitiveSlide() {
	return (
		<SlideLayout bg="bg-surface-100">
			<div className="w-full">
				<FadeIn>
					<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
						Competitive Advantage
					</p>
					<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2] max-w-2xl">
						The only end-to-end platform
					</h2>
				</FadeIn>

				<div className="mt-12 rounded-xl border border-surface-300 bg-white overflow-hidden">
					{/* Header */}
					<div className="grid grid-cols-[1fr_repeat(5,100px)] px-6 py-3 bg-surface-200">
						<span className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-surface-500">
							Capability
						</span>
						{Object.keys(competitors).map((name) => (
							<span
								key={name}
								className={`font-sans text-xs font-medium uppercase tracking-[0.08em] text-center ${
									name === 'LandIQ' ? 'text-primary-800' : 'text-surface-500'
								}`}
							>
								{name}
							</span>
						))}
					</div>

					{/* Rows */}
					{features.map((feat, rowIdx) => (
						<motion.div
							key={feat}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 + rowIdx * 0.08 }}
							className="grid grid-cols-[1fr_repeat(5,100px)] px-6 py-3.5 border-t border-surface-300 items-center"
						>
							<span className="font-sans text-[14px] text-primary-900">{feat}</span>
							{Object.values(competitors).map((levels, colIdx) => (
								<Dot
									key={colIdx}
									level={levels[rowIdx]}
									delay={0.6 + rowIdx * 0.08 + colIdx * 0.05}
								/>
							))}
						</motion.div>
					))}
				</div>

				<FadeIn delay={1.2}>
					<div className="mt-6 px-6 py-4 bg-primary-50 rounded-xl border border-primary-200 inline-block">
						<p className="font-sans text-sm text-primary-800">
							<span className="font-medium">Key differentiator:</span> Only platform
							that digitises DCP rules via AI and connects planning → feasibility →
							project management
						</p>
					</div>
				</FadeIn>
			</div>
		</SlideLayout>
	)
}
