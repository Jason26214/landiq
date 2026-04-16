'use client'

import { motion } from 'framer-motion'
import { Globe, Cloud, Brain, Database, Users, Briefcase } from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const leadership = [
	{ name: 'Winston', role: 'Mentor / Advisor', icon: Briefcase },
	{ name: 'Hal', role: 'Team Lead', icon: Users },
	{ name: 'David', role: 'Business Analyst', icon: Briefcase },
]

const departments = [
	{
		name: 'Full-Stack Engineering',
		icon: Globe,
		stack: ['Next.js 15 SSR', 'React 19 SPA', 'NestJS REST API', 'PostgreSQL + PostGIS'],
		members: [
			{ name: 'Icey', title: 'Full-Stack Developer' },
			{ name: 'Raymond', title: 'Full-Stack Developer' },
			{ name: 'Sharon', title: 'Full-Stack Developer' },
			{ name: 'Skylar', title: 'Full-Stack Developer' },
			{ name: 'Stella', title: 'Full-Stack Developer' },
			{ name: 'Vanni', title: 'Full-Stack Developer' },
			{ name: 'Zoey', title: 'Full-Stack Developer' },
		],
		color: 'border-l-primary-600',
	},
	{
		name: 'AI Engineering',
		icon: Brain,
		stack: [
			'Claude / OpenAI API',
			'RAG Pipeline',
			'Machine Learning',
			'Report Generator',
			'DCP Parser',
			'pgvector Embeddings',
		],
		members: [
			{ name: 'Jason', title: 'AI Engineer' },
			{ name: 'Shawn', title: 'AI Engineer' },
		],
		color: 'border-l-accent',
	},
	{
		name: 'Data Engineering',
		icon: Database,
		stack: [
			'Data Engine',
			'Spatial ETL + dbt',
			'Ingestion Pipeline',
			'Data Orchestrator',
			'Machine Learning',
			'NSW / VIC Gov API',
		],
		members: [
			{ name: 'Jing', title: 'Lead Data Engineer' },
			{ name: 'Gary', title: 'Lead Data Engineer' },
			{ name: 'Sky', title: 'Data Engineer' },
			{ name: 'Snow', title: 'Data Engineer' },
		],
		color: 'border-l-primary-400',
	},
	{
		name: 'DevOps & Cloud',
		icon: Cloud,
		stack: [
			'AWS ECS · VPC · S3',
			'CloudFront CDN',
			'Redis 7 · Queue Workers',
			'Docker · Terraform',
			'GitHub Actions CI/CD',
		],
		members: [
			{ name: 'Cathy', title: 'DevOps Engineer' },
			{ name: 'Edward', title: 'DevOps Engineer' },
		],
		color: 'border-l-primary-800',
	},
]

/** P3 职业孵化器 — inline brand logo */
function P3Logo() {
	return (
		<div
			className="inline-flex items-center rounded-lg overflow-hidden"
			style={{ background: '#1A1B2E' }}
		>
			<div className="px-3 py-2 flex items-center justify-center">
				<span
					className="font-sans font-black text-white leading-none"
					style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
				>
					P3
				</span>
			</div>
			<div className="self-stretch w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
			<div className="px-3 py-2 flex items-center">
				<span
					className="font-sans font-bold text-white leading-none"
					style={{ fontSize: '14px', letterSpacing: '0.04em' }}
				>
					职业孵化器
				</span>
			</div>
		</div>
	)
}

export function TeamSlide() {
	return (
		<SlideLayout bg="bg-surface-100">
			{/* Grid background */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.03 }}
				transition={{ delay: 0.2 }}
				className="absolute inset-0"
				style={{
					backgroundImage:
						'linear-gradient(#134A32 1px, transparent 1px), linear-gradient(90deg, #134A32 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			<div className="w-full relative z-10 flex flex-col justify-center h-full gap-5">
				{/* Header */}
				<div className="flex items-end justify-between">
					<FadeIn>
						<p className="font-sans text-[15px] uppercase tracking-[0.08em] text-primary-600 mb-3">
							Tech Stack & Team
						</p>
						<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
							18-member team powering a full-stack platform
						</h2>
					</FadeIn>
					<FadeIn delay={0.3}>
						<div className="flex items-center gap-3 mb-1">
							<P3Logo />
							<div className="px-4 py-2 rounded-full bg-accent-light">
								<span className="font-sans text-[12px] font-medium text-accent">
									Turborepo · pnpm · 4 Apps
								</span>
							</div>
						</div>
					</FadeIn>
				</div>

				{/* Leadership row */}
				<div className="grid grid-cols-3 gap-4">
					{leadership.map((lead, i) => (
						<motion.div
							key={lead.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + i * 0.1 }}
							className="flex items-center gap-4 bg-primary-800 rounded-xl px-5 py-4"
						>
							<div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
								<lead.icon className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
							</div>
							<div>
								<p className="font-sans text-[15px] font-medium text-white">
									{lead.name}
								</p>
								<p className="font-sans text-[12px] text-white/50">{lead.role}</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* Department cards */}
				<div className="grid grid-cols-4 gap-4">
					{departments.map((dept, i) => (
						<motion.div
							key={dept.name}
							initial={{ opacity: 0, y: 25 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 + i * 0.12 }}
							className={`bg-white rounded-xl border border-surface-300 border-l-4 ${dept.color} px-5 py-5 flex flex-col`}
						>
							<div className="flex items-center gap-2.5 mb-4">
								<dept.icon
									className="w-4.5 h-4.5 text-primary-700"
									strokeWidth={1.5}
								/>
								<h3 className="font-sans text-[14px] font-semibold text-primary-900">
									{dept.name}
								</h3>
								{dept.members.length > 0 && (
									<span className="ml-auto font-sans text-[11px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
										{dept.members.length}
									</span>
								)}
							</div>

							{/* Tech tags */}
							<div className="flex flex-wrap gap-1.5 mb-4">
								{dept.stack.map((tech) => (
									<span
										key={tech}
										className="font-sans text-[11px] text-primary-700 bg-surface-100 border border-surface-300 px-2 py-0.5 rounded-full"
									>
										{tech}
									</span>
								))}
							</div>

							{/* Members */}
							<div className="mt-auto space-y-1.5">
								{dept.members.map((m) => (
									<div
										key={m.name}
										className="flex items-baseline justify-between"
									>
										<span className="font-sans text-[13px] font-medium text-primary-900">
											{m.name}
										</span>
										<span className="font-sans text-[11px] text-surface-500">
											{m.title}
										</span>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>

				{/* Bottom summary */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2 }}
					className="flex items-center justify-between px-5 py-3 rounded-xl bg-primary-50 border border-primary-200"
				>
					<p className="font-sans text-xs text-primary-800">
						<span className="font-semibold">3 leadership · 15 engineers</span> — full
						ownership from data pipeline to deployment
					</p>
					<p className="font-sans text-xs text-surface-500">Incubated by P3 职业孵化器</p>
				</motion.div>
			</div>
		</SlideLayout>
	)
}
