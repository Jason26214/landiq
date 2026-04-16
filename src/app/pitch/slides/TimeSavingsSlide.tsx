'use client'

import { motion } from 'framer-motion'
import {
	Clock,
	ArrowRight,
	Zap,
	Calendar,
	Users,
	FileText,
	Search,
	CheckCircle2,
	Timer,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { AnimatedCounter } from '../shared/AnimatedCounter'

const timeline = [
	{
		step: 'Desktop Planning Research',
		traditional: '2 – 3 days',
		tradDays: 3,
		landiq: '< 5 minutes',
		liqDays: 0.01,
		icon: Search,
	},
	{
		step: 'Constraint Screening (Flood/Fire/Heritage)',
		traditional: '1 – 2 days',
		tradDays: 2,
		landiq: 'Instant',
		liqDays: 0,
		icon: CheckCircle2,
	},
	{
		step: 'Initial Feasibility Assessment',
		traditional: '3 – 5 days',
		tradDays: 5,
		landiq: '< 10 minutes',
		liqDays: 0.01,
		icon: FileText,
	},
	{
		step: 'Consultant Coordination & Briefing',
		traditional: '2 – 3 days',
		tradDays: 3,
		landiq: 'Auto-generated',
		liqDays: 0.01,
		icon: Users,
	},
	{
		step: 'Report Compilation & Review',
		traditional: '3 – 5 days',
		tradDays: 5,
		landiq: 'AI-generated',
		liqDays: 0.01,
		icon: FileText,
	},
	{
		step: 'Revisions & Final Report',
		traditional: '2 – 4 days',
		tradDays: 4,
		landiq: '1-click re-run',
		liqDays: 0.01,
		icon: Timer,
	},
]

const totalTradDays = timeline.reduce((s, t) => s + t.tradDays, 0)

export function TimeSavingsSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="w-full">
				{/* Header */}
				<div className="flex items-end justify-between">
					<div className="max-w-xl">
						<FadeIn>
							<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
								Time to Decision
							</p>
							<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.15]">
								From <span className="text-danger">2 – 4 weeks</span> to{' '}
								<span className="text-success">under an hour</span>
							</h2>
							<p className="font-body text-[15px] text-surface-500 mt-3 leading-relaxed">
								Every week of delay is a week a competitor can move first. LandIQ
								compresses the entire desktop feasibility phase from weeks to
								minutes.
							</p>
						</FadeIn>
					</div>

					{/* Big time comparison */}
					<FadeIn delay={0.3}>
						<div className="flex items-center gap-6">
							<div className="text-center">
								<div className="font-serif text-4xl text-danger line-through decoration-2">
									<AnimatedCounter value={totalTradDays} suffix=" days" />
								</div>
								<p className="font-sans text-[11px] text-surface-500 mt-1">
									Traditional
								</p>
							</div>
							<ArrowRight className="w-6 h-6 text-primary-400" strokeWidth={1.5} />
							<div className="text-center">
								<div className="font-serif text-4xl text-success">&lt; 1 hr</div>
								<p className="font-sans text-[11px] text-surface-500 mt-1">
									With LandIQ
								</p>
							</div>
						</div>
					</FadeIn>
				</div>

				{/* Timeline comparison */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="mt-10 rounded-xl border border-surface-300 overflow-hidden"
				>
					{/* Header */}
					<div className="grid grid-cols-[1fr_180px_180px] px-5 py-2.5 bg-surface-200">
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500">
							Phase
						</span>
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500 text-center">
							Traditional Timeline
						</span>
						<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-primary-700 text-center">
							With LandIQ
						</span>
					</div>

					{timeline.map((row, i) => (
						<motion.div
							key={row.step}
							initial={{ opacity: 0, x: 15 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.6 + i * 0.08 }}
							className="grid grid-cols-[1fr_180px_180px] px-5 py-3.5 border-t border-surface-300 items-center"
						>
							<div className="flex items-center gap-3">
								<row.icon
									className="w-4 h-4 text-primary-600 shrink-0"
									strokeWidth={1.5}
								/>
								<span className="font-sans text-[13px] text-primary-900">
									{row.step}
								</span>
							</div>

							{/* Traditional - with bar */}
							<div className="flex items-center justify-center gap-2">
								<div className="flex-1 max-w-[80px] h-2 rounded-full bg-danger/15 overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${(row.tradDays / 5) * 100}%` }}
										transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
										className="h-full rounded-full bg-danger/50"
									/>
								</div>
								<span className="font-sans text-xs text-surface-500 whitespace-nowrap">
									{row.traditional}
								</span>
							</div>

							{/* LandIQ */}
							<div className="flex justify-center">
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success font-sans text-[12px] font-medium">
									<Zap className="w-3 h-3" strokeWidth={2} />
									{row.landiq}
								</span>
							</div>
						</motion.div>
					))}

					{/* Total row */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.2 }}
						className="grid grid-cols-[1fr_180px_180px] px-5 py-3.5 bg-primary-800 items-center"
					>
						<span className="font-sans text-sm font-medium text-white flex items-center gap-2">
							<Calendar className="w-4 h-4" strokeWidth={1.5} />
							Total Desktop Feasibility Phase
						</span>
						<div className="text-center">
							<span className="font-sans text-sm text-white/70 line-through">
								2 – 4 weeks
							</span>
						</div>
						<div className="flex justify-center">
							<span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/20 text-white font-sans text-sm font-medium">
								<Zap className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
								Under 1 hour
							</span>
						</div>
					</motion.div>
				</motion.div>

				{/* Bottom insight */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.4 }}
					className="mt-5 flex items-center gap-8"
				>
					<div className="flex items-start gap-3 flex-1 px-5 py-3.5 rounded-xl bg-primary-50 border border-primary-200">
						<Clock
							className="w-4 h-4 text-primary-700 mt-0.5 shrink-0"
							strokeWidth={1.5}
						/>
						<p className="font-sans text-xs text-primary-900 leading-relaxed">
							<span className="font-medium">Speed = competitive advantage.</span> A
							developer evaluating 10 sites per month can now screen all of them in a
							single morning — instead of dedicating a team member for 2+ months.
							First mover on the best sites wins.
						</p>
					</div>
					<div className="flex items-start gap-3 flex-1 px-5 py-3.5 rounded-xl bg-accent-light border border-accent/20">
						<Users className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
						<p className="font-sans text-xs text-primary-900 leading-relaxed">
							<span className="font-medium">Free up your team.</span> Planning
							consultants and acquisition managers can focus on negotiation and
							high-value decisions instead of manual data gathering and report
							writing.
						</p>
					</div>
				</motion.div>
			</div>
		</SlideLayout>
	)
}
