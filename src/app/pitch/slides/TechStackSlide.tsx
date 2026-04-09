"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";
import {
	Globe,
	LayoutDashboard,
	Shield,
	Server,
	Database,
	HardDrive,
	Cloud,
	GitBranch,
} from "lucide-react";

const apps = [
	{
		name: "Marketing Website",
		tech: "Next.js 15",
		desc: "SSR / SEO",
		icon: Globe,
	},
	{
		name: "Enterprise Portal",
		tech: "React 19 + Vite",
		desc: "SPA",
		icon: LayoutDashboard,
	},
	{
		name: "Admin Console",
		tech: "React 19 + Vite",
		desc: "SPA",
		icon: Shield,
	},
];

const infra = [
	{ icon: Database, label: "PostgreSQL + PostGIS", sub: "pgvector" },
	{ icon: HardDrive, label: "Redis + BullMQ", sub: "Async Jobs" },
	{ icon: Cloud, label: "AWS S3", sub: "File Storage" },
];

export function TechStackSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="grid grid-cols-12 gap-16 w-full items-center">
				{/* Left — Text */}
				<div className="col-span-5">
					<FadeIn>
						<p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
							Technology
						</p>
						<h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] text-primary-900 leading-[1.2]">
							Enterprise-grade architecture built for scale
						</h2>
						<p className="font-body text-[16px] text-surface-500 mt-6 leading-relaxed">
							Turborepo monorepo with 4 purpose-built applications,
							a shared type system via Zod, and fully automated
							CI/CD — from lint to deploy.
						</p>
					</FadeIn>

					{/* Deploy badges */}
					<FadeIn delay={0.6}>
						<div className="mt-8 flex flex-col gap-2.5">
							<div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full w-fit">
								<Cloud className="w-3.5 h-3.5 text-primary-700" strokeWidth={1.5} />
								<span className="font-sans text-xs font-medium text-primary-800">
									AWS Sydney · EC2 + S3 + CloudFront
								</span>
							</div>
							<div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full w-fit">
								<GitBranch className="w-3.5 h-3.5 text-primary-700" strokeWidth={1.5} />
								<span className="font-sans text-xs font-medium text-primary-800">
									GitHub Actions · Lint → Test → Build → Deploy
								</span>
							</div>
						</div>
					</FadeIn>
				</div>

				{/* Right — Architecture diagram */}
				<div className="col-span-7">
					<div className="rounded-xl border border-surface-300 bg-surface-100/50 p-6">
						{/* Monorepo header */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="flex items-center gap-2 mb-5"
						>
							<span className="font-sans text-[11px] uppercase tracking-[0.08em] text-surface-500 font-medium">
								Monorepo
							</span>
							<span className="font-sans text-[11px] text-surface-400">
								Turborepo + pnpm Workspaces
							</span>
						</motion.div>

						{/* 3 Frontend apps */}
						<div className="grid grid-cols-3 gap-3 mb-4">
							{apps.map((app, i) => (
								<motion.div
									key={app.name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + i * 0.12 }}
									className="bg-white rounded-lg border border-surface-300 p-4 text-center"
								>
									<app.icon
										className="w-5 h-5 text-primary-600 mx-auto mb-2"
										strokeWidth={1.5}
									/>
									<p className="font-sans text-[13px] font-medium text-primary-900">
										{app.name}
									</p>
									<p className="font-sans text-[11px] text-primary-700 mt-1">
										{app.tech}
									</p>
									<p className="font-sans text-[10px] text-surface-500 mt-0.5">
										{app.desc}
									</p>
								</motion.div>
							))}
						</div>

						{/* Shared types bar */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							className="flex items-center justify-center gap-2 py-2 mb-4 border-y border-dashed border-surface-300"
						>
							<span className="font-sans text-[11px] text-surface-500">
								Shared Types + Validation
							</span>
							<span className="font-sans text-[10px] bg-accent-light text-accent px-2 py-0.5 rounded-full font-medium">
								Zod Schemas
							</span>
						</motion.div>

						{/* API card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9 }}
							className="bg-primary-800 rounded-lg p-4 flex items-center justify-between mb-4"
						>
							<div className="flex items-center gap-3">
								<Server className="w-5 h-5 text-white" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[13px] font-medium text-white">
										REST API
									</p>
									<p className="font-sans text-[11px] text-white/60">
										/api/v1 · JWT Auth · RBAC
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="font-sans text-[11px] bg-white/15 text-white px-2.5 py-1 rounded-full">
									NestJS 11
								</span>
								<span className="font-sans text-[11px] bg-white/15 text-white px-2.5 py-1 rounded-full">
									TypeORM
								</span>
							</div>
						</motion.div>

						{/* Infrastructure row */}
						<div className="grid grid-cols-3 gap-3">
							{infra.map((item, i) => (
								<motion.div
									key={item.label}
									initial={{ opacity: 0, y: 15 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 1.0 + i * 0.1 }}
									className="bg-white rounded-lg border border-surface-300 p-3 flex items-center gap-2.5"
								>
									<item.icon
										className="w-4 h-4 text-primary-500 shrink-0"
										strokeWidth={1.5}
									/>
									<div>
										<p className="font-sans text-[11px] font-medium text-primary-900 leading-tight">
											{item.label}
										</p>
										<p className="font-sans text-[10px] text-surface-500">
											{item.sub}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</SlideLayout>
	);
}
