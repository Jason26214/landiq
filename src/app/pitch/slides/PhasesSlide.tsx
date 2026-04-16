'use client'

import { motion } from 'framer-motion'
import {
	Rocket,
	TrendingUp,
	Code2,
	FileCheck,
	Map,
	Calculator,
	Home,
	DollarSign,
	LineChart,
	ArrowRight,
	Clock,
	Layers,
	Percent,
	AlertTriangle,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const phases = [
	{
		num: 'Phase 1',
		label: 'Build',
		title: 'Platform to MVP',
		subtitle: 'Zero to one — deliver a working feasibility platform',
		icon: Rocket,
		timeline: 'Q2 – Q3 2026',
		items: [
			{ icon: Code2, text: 'Core platform + data engine (NSW + VIC)' },
			{ icon: FileCheck, text: 'AI base report + simple ROI (FSR × price × cost)' },
			{ icon: Map, text: 'Interactive map & site intelligence' },
			{ icon: DollarSign, text: 'Admin & operations — SaaS revenue' },
		],
		outcome: 'SaaS subscription · $199 – $999 / month',
		outcomeIcon: DollarSign,
	},
	{
		num: 'Phase 2',
		label: 'Invest',
		title: 'ROI Engine & Co-Investment',
		subtitle: 'From tool to capital — platform-driven subdivision & build investment',
		icon: TrendingUp,
		timeline: 'Q4 2026 onwards · returns on 3 – 5 yr cycle',
		items: [
			{ icon: Calculator, text: 'Full ROI engine: long-cycle, inflation, IRR' },
			{ icon: Home, text: 'Subdivision + build feasibility analysis' },
			{ icon: LineChart, text: 'Data-driven land selection (top yield)' },
			{ icon: DollarSign, text: 'Co-investment / JV / profit-share models' },
		],
		outcome: 'SaaS revenue → asset appreciation gains',
		outcomeIcon: TrendingUp,
		highlighted: true,
	},
]

const roiFactors = [
	{ icon: Clock, label: 'Long cycle', note: '3 – 5 year horizon' },
	{ icon: Percent, label: 'Inflation', note: 'CPI, cost escalation' },
	{ icon: Layers, label: 'FSR', note: 'zoning yield' },
	{ icon: TrendingUp, label: 'Dev. return', note: 'IRR, profit margin' },
]

export function PhasesSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="w-full">
				<FadeIn>
					<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
						Two-Phase Strategy
					</p>
					<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.2]">
						Build the platform, then deploy capital
					</h2>
					<p className="font-body text-base text-surface-500 mt-3 max-w-3xl">
						Phase 1 ships an MVP that generates SaaS revenue. Phase 2 uses the
						platform&apos;s data to drive subdivision and development investment — for
						real asset returns.
					</p>
				</FadeIn>

				<div className="flex items-stretch gap-6 mt-8">
					{phases.map((phase, i) => {
						const Icon = phase.icon
						const OutcomeIcon = phase.outcomeIcon
						return (
							<motion.div
								key={phase.num}
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 + i * 0.25 }}
								className="flex-1 relative"
							>
								{i === 0 && (
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1, type: 'spring' }}
										className="absolute top-1/2 -right-5 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg"
									>
										<ArrowRight
											className="w-5 h-5 text-white"
											strokeWidth={2}
										/>
									</motion.div>
								)}

								<div
									className={`relative h-full rounded-2xl p-7 border ${
										phase.highlighted
											? 'bg-primary-900 border-primary-800 text-white'
											: 'bg-surface-100 border-surface-300'
									}`}
								>
									<div className="flex items-center gap-3 mb-5">
										<div
											className={`w-11 h-11 rounded-full flex items-center justify-center ${
												phase.highlighted ? 'bg-accent' : 'bg-primary-800'
											}`}
										>
											<Icon
												className="w-5 h-5 text-white"
												strokeWidth={1.5}
											/>
										</div>
										<div>
											<span
												className={`font-sans text-[10px] tracking-[0.12em] uppercase ${
													phase.highlighted
														? 'text-accent'
														: 'text-surface-500'
												}`}
											>
												{phase.num} · {phase.label}
											</span>
											<p
												className={`font-sans text-xs mt-0.5 ${
													phase.highlighted
														? 'text-white/60'
														: 'text-surface-500'
												}`}
											>
												{phase.timeline}
											</p>
										</div>
									</div>

									<h3
										className={`font-serif text-2xl leading-tight mb-2 ${
											phase.highlighted ? 'text-white' : 'text-primary-900'
										}`}
									>
										{phase.title}
									</h3>
									<p
										className={`font-body text-sm mb-5 ${
											phase.highlighted ? 'text-white/70' : 'text-surface-500'
										}`}
									>
										{phase.subtitle}
									</p>

									<ul className="space-y-2.5">
										{phase.items.map((item, j) => {
											const ItemIcon = item.icon
											return (
												<motion.li
													key={j}
													initial={{ opacity: 0, x: -10 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{
														delay: 0.6 + i * 0.25 + j * 0.08,
													}}
													className="flex items-start gap-3"
												>
													<div
														className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
															phase.highlighted
																? 'bg-white/10'
																: 'bg-white border border-surface-300'
														}`}
													>
														<ItemIcon
															className={`w-3.5 h-3.5 ${
																phase.highlighted
																	? 'text-accent'
																	: 'text-primary-700'
															}`}
															strokeWidth={1.5}
														/>
													</div>
													<span
														className={`font-sans text-[13px] leading-6 ${
															phase.highlighted
																? 'text-white/90'
																: 'text-primary-900'
														}`}
													>
														{item.text}
													</span>
												</motion.li>
											)
										})}
									</ul>

									{phase.highlighted && (
										<motion.div
											initial={{ opacity: 0, y: 6 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 1.2 }}
											className="mt-5 pt-4 border-t border-white/10"
										>
											<div className="flex items-center gap-2 mb-2">
												<AlertTriangle
													className="w-3.5 h-3.5 text-accent"
													strokeWidth={2}
												/>
												<span className="font-sans text-[10px] tracking-[0.12em] uppercase text-accent">
													Modeling complexity
												</span>
											</div>
											<div className="grid grid-cols-2 gap-2">
												{roiFactors.map((f) => {
													const F = f.icon
													return (
														<div
															key={f.label}
															className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white/5"
														>
															<F
																className="w-3 h-3 text-white/70 shrink-0"
																strokeWidth={1.5}
															/>
															<div className="leading-tight">
																<div className="font-sans text-[11px] text-white">
																	{f.label}
																</div>
																<div className="font-sans text-[9px] text-white/50">
																	{f.note}
																</div>
															</div>
														</div>
													)
												})}
											</div>
										</motion.div>
									)}

									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1.3 + i * 0.25 }}
										className={`mt-5 flex items-center gap-2 px-4 py-2.5 rounded-lg ${
											phase.highlighted
												? 'bg-accent/15 border border-accent/30'
												: 'bg-primary-50 border border-primary-100'
										}`}
									>
										<OutcomeIcon
											className={`w-4 h-4 shrink-0 ${
												phase.highlighted
													? 'text-accent'
													: 'text-primary-700'
											}`}
											strokeWidth={2}
										/>
										<span
											className={`font-sans text-xs font-medium ${
												phase.highlighted
													? 'text-white'
													: 'text-primary-800'
											}`}
										>
											{phase.outcome}
										</span>
									</motion.div>
								</div>
							</motion.div>
						)
					})}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.4 }}
					className="mt-6 flex items-center justify-between px-5 py-3 rounded-xl bg-primary-50 border border-primary-200"
				>
					<p className="font-sans text-xs text-primary-800">
						<span className="font-semibold">Data flywheel:</span> more users → more real
						transaction data → sharper ROI model → higher investment hit rate
					</p>
					<p className="font-sans text-xs text-surface-500">SaaS → Data → Capital</p>
				</motion.div>
			</div>
		</SlideLayout>
	)
}
