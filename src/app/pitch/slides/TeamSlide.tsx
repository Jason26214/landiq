"use client";

import { motion } from "framer-motion";
import { SlideLayout } from "../shared/SlideLayout";
import { FadeIn } from "../shared/FadeIn";

const roles = [
	{ title: "Mentor", members: ["Winston"] },
	{ title: "Team Lead", members: ["Hal"] },
	{ title: "BA", members: ["David"] },
	{ title: "DevOps", members: ["Cathy"] },
	{
		title: "Dev",
		members: [
			["Edward", "Icey", "Jason", "Raymond", "Sharon"],
			["Shawn", "Skylar", "Stella", "Vanni", "Zoey"],
		],
	},
];

export function TeamSlide() {
	return (
		<SlideLayout bg="bg-white">
			<div className="grid grid-cols-12 gap-16 w-full items-center">
				{/* Left — Text */}
				<div className="col-span-4">
					<FadeIn>
						<p className="font-sans text-[15px] uppercase tracking-[0.08em] text-primary-600 mb-3">
							Our Team
						</p>
						<h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-primary-900 leading-[1.2]">
							14 people building the future of land feasibility
						</h2>
					</FadeIn>
				</div>

				{/* Right — Team roster */}
				<div className="col-span-8">
					<div className="space-y-0">
						{roles.map((role, i) => (
							<motion.div
								key={role.title}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 + i * 0.12 }}
								className="grid grid-cols-[140px_1fr] items-baseline py-5 border-b border-surface-300 first:border-t-2 first:border-t-primary-800"
							>
								<span className="font-sans text-[12px] font-semibold text-primary-600 uppercase tracking-[0.1em]">
									{role.title}
								</span>
								<div>
									{Array.isArray(role.members[0]) ? (
										(role.members as string[][]).map((row, ri) => (
											<p
												key={ri}
												className="font-serif text-[22px] text-primary-900 leading-relaxed tracking-tight"
											>
												{row.join("  ·  ")}
											</p>
										))
									) : (
										<p className="font-serif text-[22px] text-primary-900 tracking-tight">
											{(role.members as string[]).join("  ·  ")}
										</p>
									)}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</SlideLayout>
	);
}
