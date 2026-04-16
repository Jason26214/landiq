'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	Chrome,
	Zap,
	ArrowRight,
	MapPin,
	Building2,
	Ruler,
	Flame,
	Droplets,
	Landmark,
	MousePointerClick,
	ExternalLink,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const sites = [
	{
		id: 'rea',
		name: 'realestate.com.au',
		color: '#E4002B',
		desc: "Australia's #1 property portal",
	},
	{
		id: 'domain',
		name: 'domain.com.au',
		color: '#2B6CB0',
		desc: 'Property listings & market data',
	},
	{
		id: 'landchecker',
		name: 'landchecker.com.au',
		color: '#1A8754',
		desc: 'Planning & zoning data',
	},
]

const mockResult = {
	address: '42 Bridge Street, Sydney NSW 2000',
	data: [
		{
			icon: Building2,
			label: 'Zoning',
			value: 'SP5 Metropolitan Centre',
			status: 'info' as const,
		},
		{ icon: Ruler, label: 'FSR', value: '8:1 (Clause 4.4)', status: 'info' as const },
		{ icon: Landmark, label: 'Heritage', value: 'MLC Centre (I2287)', status: 'warn' as const },
		{ icon: Flame, label: 'Bushfire', value: 'Not Affected', status: 'clear' as const },
		{ icon: Droplets, label: 'Flood', value: 'Not Affected', status: 'clear' as const },
	],
}

const statusColor = {
	info: 'text-primary-800',
	warn: 'text-accent',
	clear: 'text-success',
}

export function ChromeExtSlide() {
	const [step, setStep] = useState(0) // 0=browse, 1=click, 2=result

	return (
		<SlideLayout bg="bg-surface-100">
			<div className="grid grid-cols-12 gap-12 w-full items-center">
				{/* Left: description */}
				<div className="col-span-5">
					<FadeIn>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center">
								<Chrome className="w-5 h-5 text-white" strokeWidth={1.5} />
							</div>
							<div>
								<p className="font-sans text-xs uppercase tracking-[0.08em] text-primary-600">
									Chrome Extension
								</p>
								<p className="font-sans text-xs text-surface-500">
									Coming in Phase 1
								</p>
							</div>
						</div>

						<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
							One click. Instant intelligence on any listing.
						</h2>

						<p className="font-body text-[15px] text-surface-500 mt-4 leading-relaxed">
							Browse property listings on REA, Domain, or Landchecker — our Chrome
							extension automatically detects the address and delivers real-time
							planning data without leaving the page.
						</p>
					</FadeIn>

					{/* Supported sites */}
					<FadeIn delay={0.4}>
						<p className="font-sans text-xs uppercase tracking-[0.06em] text-surface-500 mt-8 mb-3">
							Works on
						</p>
						<div className="flex gap-3">
							{sites.map((site) => (
								<div
									key={site.id}
									className="flex items-center gap-2 px-3 py-2 rounded-lg border border-surface-300 bg-white"
								>
									<div
										className="w-2.5 h-2.5 rounded-full"
										style={{ background: site.color }}
									/>
									<span className="font-sans text-xs text-primary-900 font-medium">
										{site.name}
									</span>
								</div>
							))}
						</div>
					</FadeIn>

					{/* How it works steps */}
					<FadeIn delay={0.6}>
						<div className="mt-8 space-y-4">
							{[
								{
									num: '1',
									text: 'Browse any property listing',
									icon: ExternalLink,
								},
								{
									num: '2',
									text: 'Click the LandIQ extension icon',
									icon: MousePointerClick,
								},
								{ num: '3', text: 'Get instant planning data overlay', icon: Zap },
							].map((s, i) => (
								<button
									key={s.num}
									onClick={() => setStep(i)}
									className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all ${
										step === i
											? 'bg-primary-800 text-white'
											: 'bg-white text-primary-900 border border-surface-300 hover:border-primary-300'
									}`}
								>
									<div
										className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
											step === i
												? 'bg-white text-primary-800'
												: 'bg-surface-200 text-surface-500'
										}`}
									>
										{s.num}
									</div>
									<s.icon
										className={`w-4 h-4 shrink-0 ${
											step === i ? 'text-white' : 'text-primary-600'
										}`}
										strokeWidth={1.5}
									/>
									<span className="font-sans text-sm">{s.text}</span>
								</button>
							))}
						</div>
					</FadeIn>
				</div>

				{/* Right: browser mockup */}
				<div className="col-span-7">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="rounded-2xl overflow-hidden shadow-2xl border border-surface-300"
					>
						{/* Browser chrome */}
						<div className="bg-[#2A2A2E] px-4 py-3 flex items-center gap-3">
							<div className="flex gap-1.5">
								<div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
								<div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
								<div className="w-3 h-3 rounded-full bg-[#28C840]" />
							</div>
							<div className="flex-1 flex items-center gap-2 bg-[#1C1C1E] rounded-lg px-3 py-1.5 ml-2">
								<div
									className="w-3 h-3 rounded-full shrink-0"
									style={{ background: sites[0].color }}
								/>
								<span className="font-sans text-[11px] text-[#A0A0A5] truncate">
									realestate.com.au/property/42-bridge-st-sydney-nsw-2000
								</span>
							</div>
							{/* Extension icon in toolbar */}
							<motion.div
								animate={step >= 1 ? { scale: [1, 1.3, 1] } : {}}
								transition={{ duration: 0.5 }}
								className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
									step >= 1 ? 'bg-primary-600' : 'bg-[#3A3A3E] hover:bg-[#4A4A4E]'
								}`}
								onClick={() => setStep((s) => Math.min(s + 1, 2))}
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
									<path
										d="M12 2L15 8H21L16 12L18 19L12 15L6 19L8 12L3 8H9L12 2Z"
										fill={step >= 1 ? '#fff' : '#888'}
									/>
								</svg>
							</motion.div>
						</div>

						{/* Page content */}
						<div className="bg-white relative" style={{ height: 420 }}>
							{/* Fake listing content */}
							<div className="p-6">
								<div className="flex gap-4">
									<div className="w-[55%] h-[200px] bg-surface-200 rounded-lg flex items-center justify-center">
										<span className="font-sans text-xs text-surface-400">
											Property Image
										</span>
									</div>
									<div className="flex-1">
										<div className="h-3 bg-surface-200 rounded w-3/4 mb-3" />
										<div className="flex items-center gap-2 mb-3">
											<MapPin className="w-3.5 h-3.5 text-surface-400" />
											<span className="font-sans text-sm text-primary-900">
												42 Bridge Street, Sydney NSW 2000
											</span>
										</div>
										<div className="h-2.5 bg-surface-200 rounded w-full mb-2" />
										<div className="h-2.5 bg-surface-200 rounded w-5/6 mb-2" />
										<div className="h-2.5 bg-surface-200 rounded w-2/3 mb-4" />
										<div className="h-8 bg-[#E4002B]/10 rounded-lg w-32 flex items-center justify-center">
											<span className="font-sans text-xs text-[#E4002B] font-medium">
												Contact Agent
											</span>
										</div>
									</div>
								</div>

								<div className="mt-4 space-y-2">
									<div className="h-2.5 bg-surface-200 rounded w-full" />
									<div className="h-2.5 bg-surface-200 rounded w-11/12" />
									<div className="h-2.5 bg-surface-200 rounded w-4/5" />
								</div>
							</div>

							{/* Extension overlay panel - slides in from right */}
							<AnimatePresence>
								{step >= 2 && (
									<motion.div
										initial={{ x: '100%', opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: '100%', opacity: 0 }}
										transition={{ type: 'spring', damping: 25, stiffness: 300 }}
										className="absolute top-0 right-0 bottom-0 w-[280px] bg-white border-l border-surface-300 shadow-2xl flex flex-col"
									>
										{/* Extension header */}
										<div className="bg-primary-800 px-4 py-3 flex items-center gap-2">
											<div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
												<Zap
													className="w-3 h-3 text-white"
													strokeWidth={2}
												/>
											</div>
											<span className="font-sans text-xs text-white font-medium">
												LandIQ Site Intelligence
											</span>
										</div>

										{/* Detected address */}
										<div className="px-4 py-3 border-b border-surface-300 bg-surface-100">
											<p className="font-sans text-[10px] uppercase tracking-[0.06em] text-surface-500 mb-1">
												Detected Address
											</p>
											<div className="flex items-center gap-1.5">
												<MapPin
													className="w-3 h-3 text-primary-600"
													strokeWidth={2}
												/>
												<span className="font-sans text-xs text-primary-900 font-medium">
													{mockResult.address}
												</span>
											</div>
										</div>

										{/* Data rows */}
										<div className="flex-1 px-3 py-2 space-y-1 overflow-auto">
											{mockResult.data.map((row, i) => (
												<motion.div
													key={row.label}
													initial={{ opacity: 0, x: 15 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: 0.15 + i * 0.08 }}
													className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-100 transition-colors"
												>
													<row.icon
														className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${statusColor[row.status]}`}
														strokeWidth={1.5}
													/>
													<div className="min-w-0">
														<p className="font-sans text-[10px] uppercase tracking-[0.04em] text-surface-500">
															{row.label}
														</p>
														<p
															className={`font-sans text-[12px] font-medium ${statusColor[row.status]}`}
														>
															{row.value}
														</p>
													</div>
												</motion.div>
											))}
										</div>

										{/* Actions */}
										<div className="px-3 py-3 border-t border-surface-300 space-y-2">
											<button className="w-full py-2 rounded-full bg-primary-800 text-white font-sans text-[11px] hover:bg-primary-700 transition-colors flex items-center justify-center gap-1.5">
												Open in LandIQ
												<ArrowRight className="w-3 h-3" />
											</button>
											<button className="w-full py-2 rounded-full border border-primary-800 text-primary-800 font-sans text-[11px] hover:bg-primary-50 transition-colors">
												Generate Report
											</button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							{/* Click indicator on extension icon */}
							<AnimatePresence>
								{step === 1 && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="absolute top-[-48px] right-[6px] z-30"
									>
										<motion.div
											animate={{ y: [0, -5, 0] }}
											transition={{ duration: 1, repeat: Infinity }}
											className="flex flex-col items-center"
										>
											<span className="font-sans text-[10px] text-white bg-primary-800 px-2.5 py-1 rounded-full mb-1 whitespace-nowrap">
												Click to activate
											</span>
											<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-800" />
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
				</div>
			</div>
		</SlideLayout>
	)
}
