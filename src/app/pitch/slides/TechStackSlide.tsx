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

const frontendApps = [
	{ name: "Marketing Website", domain: "landiq.com.au", tech: "Next.js 15", badge: "SSR", icon: Globe },
	{ name: "Enterprise Portal", domain: "app.landiq.com.au", tech: "React 19 + Vite", badge: "SPA", icon: LayoutDashboard },
	{ name: "Admin Console", domain: "console.landiq.com.au", tech: "React 19 + Vite", badge: "SPA", icon: Shield },
];

export function TechStackSlide() {
	return (
		<SlideLayout bg="bg-surface-100">
			{/* Grid background */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.04 }}
				transition={{ delay: 0.2 }}
				className="absolute inset-0"
				style={{
					backgroundImage:
						"linear-gradient(#134A32 1px, transparent 1px), linear-gradient(90deg, #134A32 1px, transparent 1px)",
					backgroundSize: "80px 80px",
				}}
			/>

			{/* Full-height flex container */}
			<div className="w-full relative z-10 flex flex-col justify-center h-full gap-5">
				{/* Header */}
				<div className="flex items-end justify-between">
					<FadeIn>
						<p className="font-sans text-[15px] uppercase tracking-[0.08em] text-primary-600 mb-3">
							Technology
						</p>
						<h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-primary-900 leading-[1.2]">
							Four apps, one monorepo, zero friction
						</h2>
					</FadeIn>
					<FadeIn delay={0.3}>
						<div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-light shrink-0 mb-1">
							<span className="font-sans text-[13px] font-medium text-accent">
								Turborepo + pnpm Workspaces
							</span>
						</div>
					</FadeIn>
				</div>

				{/* === ROW 1: 3 Frontend Apps === */}
				<div className="grid grid-cols-3 gap-4">
					{frontendApps.map((app, i) => (
						<motion.div
							key={app.name}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
							className="bg-white rounded-xl border border-surface-300 px-6 py-7"
						>
							<div className="flex items-center gap-3.5 mb-5">
								<div className="w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center">
									<app.icon className="w-5.5 h-5.5 text-white" strokeWidth={1.5} />
								</div>
								<div>
									<h3 className="font-sans text-[17px] font-medium text-primary-900">
										{app.name}
									</h3>
									<p className="font-sans text-[13px] text-surface-500">
										{app.domain}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2.5">
								<span className="font-sans text-[13px] bg-surface-100 text-primary-700 px-3.5 py-1.5 rounded-full border border-surface-300">
									{app.tech}
								</span>
								<span className="font-sans text-[12px] bg-primary-50 text-primary-600 px-3 py-1.5 rounded-full font-medium">
									{app.badge}
								</span>
							</div>
						</motion.div>
					))}
				</div>

				{/* === ROW 2: API — full width hero === */}
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.7 }}
					className="bg-primary-800 rounded-xl py-8 px-8 relative overflow-hidden"
				>
					<svg
						className="absolute inset-0 w-full h-full opacity-[0.06]"
						viewBox="0 0 1200 200"
						preserveAspectRatio="xMidYMid slice"
					>
						{[30, 65, 100, 135, 170].map((y, i) => (
							<path
								key={i}
								d={`M-50 ${y} Q300 ${y - 15 + i * 6} 600 ${y + 12} T1250 ${y}`}
								fill="none"
								stroke="white"
								strokeWidth="1"
							/>
						))}
					</svg>

					<div className="relative z-10 flex items-center justify-between">
						<div className="flex items-center gap-5">
							<div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
								<Server className="w-7 h-7 text-white" strokeWidth={1.5} />
							</div>
							<div>
								<h3 className="font-sans text-[20px] font-medium text-white">
									REST API
								</h3>
								<p className="font-sans text-[14px] text-white/50 mt-1">
									api.landiq.com.au/api/v1 · JWT Auth · Multi-tenant RBAC
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2.5">
							<span className="font-sans text-[12px] font-medium text-accent bg-accent/10 px-3.5 py-2 rounded-full">
								Shared: Zod Schemas
							</span>
							{["NestJS 11", "TypeORM", "TypeScript"].map((tech, i) => (
								<motion.span
									key={tech}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 1.0 + i * 0.08 }}
									className="font-sans text-[13px] bg-white/10 text-white px-3.5 py-2 rounded-full border border-white/10"
								>
									{tech}
								</motion.span>
							))}
						</div>
					</div>
				</motion.div>

				{/* === ROW 3: Infrastructure + Deployment === */}
				<div className="grid grid-cols-2 gap-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2 }}
						className="bg-white rounded-xl border border-surface-300 px-7 py-6"
					>
						<p className="font-sans text-[12px] uppercase tracking-[0.08em] text-surface-500 font-medium mb-4">
							Infrastructure
						</p>
						<div className="flex items-center gap-7">
							<div className="flex items-center gap-3">
								<Database className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[15px] font-medium text-primary-900">PostgreSQL</p>
									<p className="font-sans text-[12px] text-surface-500">PostGIS · pgvector</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<HardDrive className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[15px] font-medium text-primary-900">Redis</p>
									<p className="font-sans text-[12px] text-surface-500">BullMQ Queues</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Cloud className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[15px] font-medium text-primary-900">AWS S3</p>
									<p className="font-sans text-[12px] text-surface-500">File Storage</p>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.35 }}
						className="bg-white rounded-xl border border-surface-300 px-7 py-6"
					>
						<p className="font-sans text-[12px] uppercase tracking-[0.08em] text-surface-500 font-medium mb-4">
							Cloud Deployment
						</p>
						<div className="flex items-center gap-7">
							<div className="flex items-center gap-3">
								<Cloud className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[15px] font-medium text-primary-900">AWS Sydney</p>
									<p className="font-sans text-[12px] text-surface-500">EC2 · S3 · CloudFront</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<GitBranch className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
								<div>
									<p className="font-sans text-[15px] font-medium text-primary-900">GitHub Actions</p>
									<p className="font-sans text-[12px] text-surface-500">Lint → Test → Build → Deploy</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</SlideLayout>
	);
}
