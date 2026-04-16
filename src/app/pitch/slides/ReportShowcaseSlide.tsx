'use client'

import { motion } from 'framer-motion'
import {
	FileText,
	Download,
	Share2,
	BarChart3,
	AlertTriangle,
	CheckCircle2,
	TrendingUp,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const reportSections = [
	{
		title: 'Executive Summary',
		status: 'complete',
		detail: 'Site overview, key metrics, go/no-go recommendation',
	},
	{
		title: 'Planning Analysis',
		status: 'complete',
		detail: 'Zoning SP5, FSR 8:1, Height SEPP-controlled, Heritage I2287',
	},
	{
		title: 'Development Potential',
		status: 'complete',
		detail: 'Max GFA 82,628 sqm · Est. 480 apartments · 95% efficiency',
	},
	{
		title: 'Risk Assessment',
		status: 'warning',
		detail: 'Heritage overlay detected · Flood: Clear · Bushfire: Clear',
	},
	{
		title: 'Financial Feasibility',
		status: 'complete',
		detail: 'GRV $384M · TDC $298M · Margin 28.8% · IRR 24.2%',
	},
	{
		title: 'Recommendation',
		status: 'complete',
		detail: 'PROCEED — Strong yield, manageable heritage constraint',
	},
]

const statusStyle = (s: string) => {
	if (s === 'warning') return { icon: AlertTriangle, color: 'text-accent', bg: 'bg-accent-light' }
	return { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' }
}

export function ReportShowcaseSlide() {
	return (
		<SlideLayout bg="bg-surface-100">
			<div className="grid grid-cols-12 gap-12 w-full items-start">
				{/* Left: Report preview */}
				<div className="col-span-7">
					<FadeIn>
						<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
							AI-Generated Report
						</p>
						<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
							Professional feasibility reports, generated in minutes
						</h2>
					</FadeIn>

					{/* Report card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="mt-8 bg-white rounded-xl border border-surface-300 shadow-lg overflow-hidden"
					>
						{/* Report header */}
						<div className="bg-primary-800 px-6 py-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<FileText className="w-5 h-5 text-white" strokeWidth={1.5} />
								<div>
									<span className="font-sans text-sm text-white font-medium block">
										Land Feasibility Report
									</span>
									<span className="font-sans text-[11px] text-primary-300">
										42 Bridge Street, Sydney NSW 2000
									</span>
								</div>
							</div>
							<div className="flex gap-2">
								<button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
									<Download className="w-4 h-4 text-white" strokeWidth={1.5} />
								</button>
								<button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
									<Share2 className="w-4 h-4 text-white" strokeWidth={1.5} />
								</button>
							</div>
						</div>

						{/* Report sections */}
						<div className="divide-y divide-surface-300">
							{reportSections.map((section, i) => {
								const { icon: Icon, color, bg } = statusStyle(section.status)
								return (
									<motion.div
										key={section.title}
										initial={{ opacity: 0, x: -15 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.5 + i * 0.12 }}
										className="px-6 py-4 flex items-start gap-4 hover:bg-surface-100/50 transition-colors"
									>
										<div
											className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}
										>
											<Icon
												className={`w-4 h-4 ${color}`}
												strokeWidth={1.5}
											/>
										</div>
										<div className="min-w-0 flex-1">
											<h4 className="font-sans text-[14px] font-medium text-primary-900">
												{section.title}
											</h4>
											<p className="font-sans text-xs text-surface-500 mt-0.5 leading-relaxed">
												{section.detail}
											</p>
										</div>
									</motion.div>
								)
							})}
						</div>

						{/* Export bar */}
						<div className="px-6 py-4 bg-surface-100 flex items-center gap-3">
							<span className="px-4 py-2 rounded-full bg-primary-800 text-white font-sans text-xs cursor-pointer hover:bg-primary-700 transition-colors">
								Export PDF
							</span>
							<span className="px-4 py-2 rounded-full border border-primary-800 text-primary-800 font-sans text-xs cursor-pointer hover:bg-primary-50 transition-colors">
								Export Word
							</span>
							<span className="px-4 py-2 rounded-full border border-surface-400 text-surface-500 font-sans text-xs cursor-pointer hover:bg-surface-200 transition-colors">
								Share Link
							</span>
						</div>
					</motion.div>
				</div>

				{/* Right: Key metrics */}
				<div className="col-span-5 pt-16">
					<FadeIn delay={0.6}>
						<div className="space-y-5">
							{[
								{ label: 'Max GFA', value: '82,628', unit: 'sqm', icon: BarChart3 },
								{
									label: 'Est. Dwellings',
									value: '480',
									unit: 'apartments',
									icon: TrendingUp,
								},
								{ label: 'Dev Margin', value: '28.8', unit: '%', icon: TrendingUp },
								{ label: 'IRR', value: '24.2', unit: '%', icon: BarChart3 },
							].map((metric, i) => (
								<motion.div
									key={metric.label}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.8 + i * 0.1 }}
									className="border-t-2 border-primary-800 pt-4"
								>
									<div className="flex items-center gap-2 mb-1">
										<metric.icon
											className="w-4 h-4 text-primary-600"
											strokeWidth={1.5}
										/>
										<span className="font-sans text-xs uppercase tracking-[0.06em] text-surface-500">
											{metric.label}
										</span>
									</div>
									<div className="flex items-baseline gap-1.5">
										<span className="font-serif text-3xl text-primary-900">
											{metric.value}
										</span>
										<span className="font-sans text-sm text-surface-500">
											{metric.unit}
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</FadeIn>

					<FadeIn delay={1.2}>
						<div className="mt-8 p-4 rounded-xl bg-success/10 border border-success/20">
							<div className="flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.5} />
								<span className="font-sans text-sm font-medium text-success">
									AI Recommendation: PROCEED
								</span>
							</div>
							<p className="font-sans text-xs text-surface-500 mt-1 ml-7">
								Strong yield potential with manageable heritage constraint
							</p>
						</div>
					</FadeIn>
				</div>
			</div>
		</SlideLayout>
	)
}
