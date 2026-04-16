'use client'

import { motion } from 'framer-motion'
import {
	FolderOpen,
	FileText,
	FileSpreadsheet,
	FileImage,
	Search,
	Filter,
	Clock,
	Users,
	Tag,
	ArrowRight,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'
import { StaggerContainer, staggerItem } from '../shared/StaggerContainer'

const documents = [
	{
		name: 'Feasibility Report — Bridge St',
		type: 'PDF',
		icon: FileText,
		date: '2 hours ago',
		user: 'AI Generated',
		tag: 'Feasibility',
		tagColor: 'bg-success/10 text-success',
	},
	{
		name: 'Geotech Investigation Report',
		type: 'PDF',
		icon: FileText,
		date: '3 days ago',
		user: 'J. Mitchell (Consultant)',
		tag: 'Due Diligence',
		tagColor: 'bg-accent-light text-accent',
	},
	{
		name: 'Financial Model — Parramatta',
		type: 'XLSX',
		icon: FileSpreadsheet,
		date: '1 week ago',
		user: 'M. Chen',
		tag: 'Financial',
		tagColor: 'bg-primary-50 text-primary-700',
	},
	{
		name: 'Site Survey — Collins St',
		type: 'DWG',
		icon: FileImage,
		date: '2 weeks ago',
		user: 'Smith Surveyors',
		tag: 'Survey',
		tagColor: 'bg-surface-200 text-surface-500',
	},
	{
		name: 'DA Submission Package',
		type: 'PDF',
		icon: FileText,
		date: '1 month ago',
		user: 'Planning Team',
		tag: 'Planning',
		tagColor: 'bg-accent-light text-accent',
	},
]

const painPoints = [
	{ before: 'Files in email attachments', after: 'Centralised document hub' },
	{ before: 'No version control', after: 'Full version history' },
	{ before: "Can't find old reports", after: 'Instant search & filter' },
	{ before: 'Manual Word/Excel reports', after: 'AI-generated, always up-to-date' },
]

export function DocumentMgmtSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="grid grid-cols-12 gap-10 w-full items-start">
				{/* Left: Before/After + Description */}
				<div className="col-span-5">
					<FadeIn>
						<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
							Document Management
						</p>
						<h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
							Stop losing reports in email threads
						</h2>
						<p className="font-body text-[15px] text-surface-500 mt-4 leading-relaxed">
							Every feasibility report, consultant document, contract, and planning
							submission — organised, searchable, and version-controlled in one place.
						</p>
					</FadeIn>

					{/* Before → After */}
					<div className="mt-8 space-y-3">
						{painPoints.map((p, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 + i * 0.1 }}
								className="flex items-center gap-3 text-sm"
							>
								<span className="font-sans text-surface-500 line-through decoration-danger/40 min-w-[180px]">
									{p.before}
								</span>
								<ArrowRight className="w-3.5 h-3.5 text-primary-500 shrink-0" />
								<span className="font-sans text-primary-800 font-medium">
									{p.after}
								</span>
							</motion.div>
						))}
					</div>
				</div>

				{/* Right: Document browser mockup */}
				<div className="col-span-7">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-white rounded-xl border border-surface-300 shadow-lg overflow-hidden"
					>
						{/* Toolbar */}
						<div className="px-5 py-3 bg-surface-100 border-b border-surface-300 flex items-center gap-3">
							<div className="flex items-center gap-2 bg-white border border-surface-300 rounded-lg px-3 py-2 flex-1">
								<Search className="w-4 h-4 text-surface-400" strokeWidth={1.5} />
								<span className="font-sans text-xs text-surface-400">
									Search documents...
								</span>
							</div>
							<button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-300 bg-white hover:bg-surface-100 transition-colors">
								<Filter
									className="w-3.5 h-3.5 text-surface-500"
									strokeWidth={1.5}
								/>
								<span className="font-sans text-xs text-surface-500">Filter</span>
							</button>
							<button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-300 bg-white hover:bg-surface-100 transition-colors">
								<FolderOpen
									className="w-3.5 h-3.5 text-surface-500"
									strokeWidth={1.5}
								/>
								<span className="font-sans text-xs text-surface-500">
									All Projects
								</span>
							</button>
						</div>

						{/* Table header */}
						<div className="grid grid-cols-[1fr_80px_130px_100px] px-5 py-2.5 bg-surface-200/60">
							<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500">
								Document
							</span>
							<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500">
								Type
							</span>
							<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500">
								Uploaded by
							</span>
							<span className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-surface-500 text-right">
								Date
							</span>
						</div>

						{/* Document rows */}
						<StaggerContainer delay={0.5} stagger={0.08}>
							{documents.map((doc) => (
								<motion.div
									key={doc.name}
									variants={staggerItem}
									className="grid grid-cols-[1fr_80px_130px_100px] px-5 py-3 border-t border-surface-300 items-center hover:bg-surface-100/50 transition-colors cursor-pointer"
								>
									<div className="flex items-center gap-3 min-w-0">
										<doc.icon
											className="w-4 h-4 text-primary-600 shrink-0"
											strokeWidth={1.5}
										/>
										<div className="min-w-0">
											<span className="font-sans text-[13px] text-primary-900 block truncate">
												{doc.name}
											</span>
											<span
												className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${doc.tagColor}`}
											>
												{doc.tag}
											</span>
										</div>
									</div>
									<span className="font-sans text-xs text-surface-500">
										{doc.type}
									</span>
									<div className="flex items-center gap-1.5 min-w-0">
										<Users
											className="w-3 h-3 text-surface-400 shrink-0"
											strokeWidth={1.5}
										/>
										<span className="font-sans text-xs text-surface-500 truncate">
											{doc.user}
										</span>
									</div>
									<div className="flex items-center gap-1.5 justify-end">
										<Clock
											className="w-3 h-3 text-surface-400"
											strokeWidth={1.5}
										/>
										<span className="font-sans text-xs text-surface-500">
											{doc.date}
										</span>
									</div>
								</motion.div>
							))}
						</StaggerContainer>

						{/* Bottom bar */}
						<div className="px-5 py-3 bg-surface-100 border-t border-surface-300 flex items-center justify-between">
							<span className="font-sans text-[11px] text-surface-500">
								5 documents · 3 projects
							</span>
							<div className="flex gap-2">
								<Tag className="w-3.5 h-3.5 text-surface-400" strokeWidth={1.5} />
								<span className="font-sans text-[11px] text-surface-500">
									Auto-tagged by AI
								</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</SlideLayout>
	)
}
