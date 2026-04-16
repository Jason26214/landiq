'use client'

import { motion } from 'framer-motion'
import { MapPin, Cpu, Kanban, DollarSign, Settings, Calculator, HardHat } from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { StaggerContainer, staggerItem } from '../shared/StaggerContainer'

const modules = [
	{
		icon: MapPin,
		title: 'Land Acquisition',
		desc: 'Pipeline: Lead → Research → Feasibility → Negotiation → Acquired',
		phase: 1,
	},
	{
		icon: Cpu,
		title: 'Feasibility Engine',
		desc: 'AI-powered zoning, yield, risk analysis + auto-generated reports',
		phase: 1,
	},
	{
		icon: Settings,
		title: 'Admin & Operations',
		desc: 'Employee management, task workflows, document & financial tracking',
		phase: 1,
	},
	{
		icon: Calculator,
		title: 'ROI & Investment',
		desc: 'Per-lot ROI modeling: long-cycle, inflation, FSR, development yield',
		phase: 2,
	},
	{
		icon: Kanban,
		title: 'Pre-Construction Management',
		desc: 'DA approvals, consultants, timelines, document & email hub',
		phase: 3,
	},
	{
		icon: HardHat,
		title: 'Construction Management',
		desc: 'On-site workflow, builder coordination, cost & schedule tracking',
		phase: 4,
	},
	{
		icon: DollarSign,
		title: 'Property Sales',
		desc: 'Brochures, project website, posters, buyer pipeline & contracts',
		phase: 5,
	},
]

const phaseStyle = (phase: number) => {
	switch (phase) {
		case 1:
			return {
				card: 'border-primary-200 bg-white',
				badge: 'bg-success/10 text-success',
			}
		case 2:
			return {
				card: 'border-accent/30 bg-white',
				badge: 'bg-accent-light text-accent',
			}
		case 3:
			return {
				card: 'border-primary-200 bg-surface-100',
				badge: 'bg-primary-100 text-primary-800',
			}
		case 4:
			return {
				card: 'border-surface-300 bg-surface-100',
				badge: 'bg-accent/15 text-accent',
			}
		case 5:
		default:
			return {
				card: 'border-surface-300 bg-surface-100',
				badge: 'bg-surface-200 text-surface-500',
			}
	}
}

export function ModulesSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="w-full">
				<FadeIn>
					<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
						Platform
					</p>
					<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-primary-900 leading-[1.2]">
						A complete operating system for property development
					</h2>
				</FadeIn>

				<StaggerContainer className="grid grid-cols-4 gap-4 mt-10" delay={0.4}>
					{modules.map((m) => {
						const s = phaseStyle(m.phase)
						return (
							<motion.div
								key={m.title}
								variants={staggerItem}
								className={`p-5 rounded-xl border transition-shadow hover:shadow-md ${s.card}`}
							>
								<div className="flex items-center justify-between mb-3">
									<div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
										<m.icon
											className="w-4 h-4 text-primary-700"
											strokeWidth={1.5}
										/>
									</div>
									<span
										className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium font-sans ${s.badge}`}
									>
										Phase {m.phase}
									</span>
								</div>
								<h3 className="font-sans text-base font-medium text-primary-900 mb-1.5">
									{m.title}
								</h3>
								<p className="font-body text-[12px] text-surface-500 leading-relaxed">
									{m.desc}
								</p>
							</motion.div>
						)
					})}
				</StaggerContainer>
			</div>
		</SlideLayout>
	)
}
