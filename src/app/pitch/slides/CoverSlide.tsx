'use client'

import { motion } from 'framer-motion'

export function CoverSlide() {
	return (
		<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
			{/* Background image */}
			<motion.div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/hero/hero-family-beach.jpg')` }}
				initial={{ scale: 1.05 }}
				animate={{ scale: 1 }}
				transition={{ duration: 20, ease: 'linear' }}
			/>
			{/* Dark green overlay */}
			<div className="absolute inset-0 bg-primary-900/80" />

			{/* Animated topographic lines */}
			<svg
				className="absolute inset-0 w-full h-full opacity-[0.06]"
				viewBox="0 0 1000 600"
				preserveAspectRatio="xMidYMid slice"
			>
				<motion.g
					animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
					transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
				>
					{[100, 180, 260, 340, 420, 500].map((y, i) => (
						<path
							key={i}
							d={`M-100 ${y} Q250 ${y - 40 + i * 8} 500 ${y + 20} T1100 ${y - 10 + i * 5}`}
							fill="none"
							stroke="white"
							strokeWidth="1.5"
						/>
					))}
				</motion.g>
			</svg>

			<div className="relative text-center z-10">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="font-serif text-[80px] leading-none text-white tracking-tight">
						LandIQ
					</h1>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<p className="font-serif text-2xl text-primary-200 mt-6 max-w-2xl mx-auto leading-relaxed">
						The AI-Powered Property Development
						<br />
						Operating System
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<p className="font-body text-lg text-primary-300 mt-4">
						Land Feasibility. Automated.
					</p>
				</motion.div>

				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.4 }}
					onClick={() => {
						document.documentElement.requestFullscreen?.().catch(() => {})
					}}
					className="mt-12 text-sm text-primary-400 hover:text-white transition-colors font-sans tracking-wide cursor-pointer"
				>
					Click to enter fullscreen →
				</motion.button>
			</div>
		</div>
	)
}
