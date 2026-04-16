'use client'

import { motion } from 'framer-motion'
import {
	TrendingDown,
	Clock,
	DollarSign,
	ShieldCheck,
	AlertTriangle,
	CheckCircle2,
	X,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { AnimatedCounter } from '../shared/AnimatedCounter'

const costComparison = [
	{
		item: 'Desktop Planning Research',
		traditional: '$3,000 – $8,000',
		landiq: 'Automated',
		savings: '100%',
		note: '4-8 hours manual → instant API query',
	},
	{
		item: 'Town Planner (Initial Assessment)',
		traditional: '$5,000 – $15,000',
		landiq: 'AI-Generated',
		savings: '80%',
		note: 'AI report replaces initial planner review',
	},
	{
		item: 'Constraint Screening (Flood/Fire/Heritage)',
		traditional: '$2,000 – $5,000',
		landiq: 'Automated',
		savings: '100%',
		note: 'Real-time overlay check in <300ms',
	},
	{
		item: 'Yield & Feasibility Modelling',
		traditional: '$5,000 – $20,000',
		landiq: 'AI-Calculated',
		savings: '70%',
		note: 'GFA, dwelling yield, margin auto-calculated',
	},
	{
		item: 'Document & Email Management',
		traditional: '$5,000 – $10,000',
		landiq: 'Built-in',
		savings: '100%',
		note: 'Centralised hub replaces ad-hoc management',
	},
	{
		item: 'Comparable Sales Research',
		traditional: '$2,000 – $5,000',
		landiq: 'API-Integrated',
		savings: '90%',
		note: 'Domain/CoreLogic data auto-aggregated',
	},
]

export function PricingSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="w-full">
				{/* Header with big numbers */}
				<div className="grid grid-cols-12 gap-8 items-end">
					<div className="col-span-5">
						<FadeIn>
							<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
								Investment Case
							</p>
							<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.15]">
								Every site that doesn&apos;t proceed costs
								<span className="text-danger"> $100K+ </span>
								in sunk due diligence
							</h2>
							<p className="font-body text-[15px] text-surface-500 mt-3 leading-relaxed">
								Australian developers abandon 70-80% of sites after spending tens of
								thousands on investigations. LandIQ eliminates the bulk of upfront
								cost by automating the desktop feasibility phase.
							</p>
						</FadeIn>
					</div>

					{/* Impact numbers */}
					<div className="col-span-7">
						<div className="grid grid-cols-3 gap-4">
							{[
								{
									icon: DollarSign,
									value: 100000,
									prefix: '$',
									suffix: '+',
									label: 'Traditional DD cost per site',
									sub: 'Wasted on abandoned sites',
									color: 'text-danger',
									bg: 'bg-danger-light',
									borderColor: 'border-danger/30',
								},
								{
									icon: TrendingDown,
									value: 70,
									prefix: '',
									suffix: '%',
									label: 'Cost reduction with LandIQ',
									sub: 'On Phase 1 desktop screening',
									color: 'text-success',
									bg: 'bg-success/10',
									borderColor: 'border-success/30',
								},
								{
									icon: Clock,
									value: 90,
									prefix: '',
									suffix: '%',
									label: 'Time saved on initial screening',
									sub: 'Days → minutes per site',
									color: 'text-primary-800',
									bg: 'bg-primary-50',
									borderColor: 'border-primary-200',
								},
							].map((stat, i) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + i * 0.15 }}
									className={`p-5 rounded-xl border ${stat.borderColor} ${stat.bg}`}
								>
									<stat.icon
										className={`w-5 h-5 ${stat.color} mb-3`}
										strokeWidth={1.5}
									/>
									<div
										className={`font-serif text-[clamp(1.8rem,3vw,2.5rem)] ${stat.color} leading-none`}
									>
										<AnimatedCounter
											value={stat.value}
											prefix={stat.prefix}
											suffix={stat.suffix}
										/>
									</div>
									<p className="font-sans text-xs font-medium text-primary-900 mt-2">
										{stat.label}
									</p>
									<p className="font-sans text-[10px] text-surface-500 mt-0.5">
										{stat.sub}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Cost breakdown table */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 }}
					className="mt-8 rounded-xl border border-surface-300 overflow-hidden"
				>
					{/* Table header */}
					<div className="grid grid-cols-[1fr_150px_130px_80px] px-5 py-2.5 bg-surface-200">
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500">
							Investigation Item
						</span>
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500 text-center">
							Traditional Cost
						</span>
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-primary-700 text-center">
							With LandIQ
						</span>
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-success text-center">
							Saved
						</span>
					</div>

					{costComparison.map((row, i) => (
						<motion.div
							key={row.item}
							initial={{ opacity: 0, x: 15 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.8 + i * 0.08 }}
							className="grid grid-cols-[1fr_150px_130px_80px] px-5 py-3 border-t border-surface-300 items-center group hover:bg-surface-100/50 transition-colors"
						>
							<div>
								<span className="font-sans text-[13px] text-primary-900 block">
									{row.item}
								</span>
								<span className="font-sans text-[10px] text-surface-500">
									{row.note}
								</span>
							</div>
							<div className="text-center">
								<span className="font-sans text-[13px] text-surface-500 line-through decoration-danger/40">
									{row.traditional}
								</span>
							</div>
							<div className="flex justify-center">
								<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 font-sans text-[11px] font-medium">
									<CheckCircle2 className="w-3 h-3" strokeWidth={2} />
									{row.landiq}
								</span>
							</div>
							<div className="text-center">
								<span className="font-sans text-sm font-bold text-success">
									{row.savings}
								</span>
							</div>
						</motion.div>
					))}

					{/* Total row */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.3 }}
						className="grid grid-cols-[1fr_150px_130px_80px] px-5 py-3.5 bg-primary-800 items-center"
					>
						<span className="font-sans text-sm font-medium text-white">
							Phase 1 Desktop Screening Total
						</span>
						<div className="text-center flex items-center justify-center gap-1.5">
							<X className="w-3.5 h-3.5 text-danger-light" strokeWidth={2} />
							<span className="font-sans text-sm text-white/70">$22K – $63K</span>
						</div>
						<div className="flex justify-center">
							<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white font-sans text-xs font-medium">
								<ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
								~$5K
							</span>
						</div>
						<div className="text-center">
							<span className="font-sans text-base font-bold text-accent">~80%</span>
						</div>
					</motion.div>
				</motion.div>

				{/* Bottom insight */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5 }}
					className="mt-4 flex items-start gap-3 px-5 py-3 rounded-xl bg-accent-light border border-accent/20"
				>
					<AlertTriangle
						className="w-4 h-4 text-accent mt-0.5 shrink-0"
						strokeWidth={1.5}
					/>
					<p className="font-sans text-xs text-primary-900 leading-relaxed">
						<span className="font-medium">
							If a developer evaluates 10 sites per year and abandons 7
						</span>
						, that&apos;s <span className="font-bold text-danger">$700K+ wasted</span>{' '}
						in traditional due diligence. With LandIQ, the same screening costs under{' '}
						<span className="font-bold text-success">$50K</span> — freeing capital for
						the sites that actually proceed.
					</p>
				</motion.div>
			</div>
		</SlideLayout>
	)
}
