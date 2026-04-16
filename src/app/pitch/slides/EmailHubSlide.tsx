'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
	Mail,
	Inbox,
	Tag,
	Search,
	Star,
	Paperclip,
	Clock,
	Building2,
	Users,
	Link2,
	Filter,
} from 'lucide-react'
import { SlideLayout } from '../shared/SlideLayout'
import { FadeIn } from '../shared/FadeIn'

const accounts = [
	{ name: 'Work', email: 'john@devco.com.au', color: '#134A32', unread: 12 },
	{ name: 'Personal', email: 'john.smith@gmail.com', color: '#2B6CB0', unread: 3 },
	{ name: 'Projects', email: 'acquisitions@devco.com.au', color: '#C4952A', unread: 8 },
]

const emails = [
	{
		from: 'Sarah Chen — Knight Frank',
		subject: 'RE: 42 Bridge St — Updated feasibility numbers',
		preview:
			'Hi John, please find attached the revised yield analysis reflecting the heritage overlay...',
		time: '10:32 AM',
		account: 0,
		starred: true,
		attachment: true,
		linkedSite: '42 Bridge St, Sydney',
		tag: 'Feasibility',
		tagColor: 'bg-success/10 text-success',
	},
	{
		from: 'Parramatta Council',
		subject: 'DA-2026/0342 — Additional Information Required',
		preview:
			'Dear Applicant, further to our assessment of the above Development Application, we require...',
		time: '9:15 AM',
		account: 2,
		starred: false,
		attachment: true,
		linkedSite: '15 Campbell St, Parramatta',
		tag: 'Planning',
		tagColor: 'bg-accent-light text-accent',
	},
	{
		from: 'Mike Thompson — Geotech Solutions',
		subject: 'Contamination Assessment Phase 1 — Collins St',
		preview:
			'Please find the preliminary site investigation report for 88 Collins Street. Key findings...',
		time: 'Yesterday',
		account: 0,
		starred: false,
		attachment: true,
		linkedSite: '88 Collins St, Melbourne',
		tag: 'Due Diligence',
		tagColor: 'bg-primary-50 text-primary-700',
	},
	{
		from: 'Lisa Wang — Domain Commercial',
		subject: 'Off-market opportunity — Waterloo industrial site',
		preview:
			'Hi John, I have an off-market industrial site in Waterloo that may suit your acquisition brief...',
		time: 'Yesterday',
		account: 1,
		starred: true,
		attachment: false,
		linkedSite: null,
		tag: 'Opportunity',
		tagColor: 'bg-surface-200 text-surface-500',
	},
	{
		from: 'NSW Planning Portal',
		subject: 'Planning Certificate — s10.7(5) Ready for Download',
		preview:
			'Your planning certificate for Lot 1 DP598704 is now available. Certificate number...',
		time: '2 days ago',
		account: 2,
		starred: false,
		attachment: true,
		linkedSite: '42 Bridge St, Sydney',
		tag: 'Certificate',
		tagColor: 'bg-success/10 text-success',
	},
]

export function EmailHubSlide() {
	const [selectedEmail, setSelectedEmail] = useState(0)

	return (
		<SlideLayout bg="bg-white">
			<div className="grid grid-cols-12 gap-10 w-full items-start">
				{/* Left: description */}
				<div className="col-span-4">
					<FadeIn>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center">
								<Mail className="w-5 h-5 text-white" strokeWidth={1.5} />
							</div>
							<p className="font-sans text-xs uppercase tracking-[0.08em] text-primary-600">
								Email Hub
							</p>
						</div>

						<h2 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-primary-900 leading-[1.2]">
							All your project emails, in one place
						</h2>

						<p className="font-body text-[15px] text-surface-500 mt-4 leading-relaxed">
							Connect multiple email accounts. AI automatically links emails to land
							sites, tags by category, and surfaces attachments — no more digging
							through inboxes.
						</p>
					</FadeIn>

					{/* Connected accounts */}
					<FadeIn delay={0.4}>
						<p className="font-sans text-xs uppercase tracking-[0.06em] text-surface-500 mt-8 mb-3">
							Connected Accounts
						</p>
						<div className="space-y-2">
							{accounts.map((acc) => (
								<div
									key={acc.email}
									className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-surface-300 bg-surface-50"
								>
									<div
										className="w-2.5 h-2.5 rounded-full shrink-0"
										style={{ background: acc.color }}
									/>
									<div className="flex-1 min-w-0">
										<span className="font-sans text-xs text-primary-900 font-medium block">
											{acc.name}
										</span>
										<span className="font-sans text-[10px] text-surface-500 truncate block">
											{acc.email}
										</span>
									</div>
									{acc.unread > 0 && (
										<span className="px-2 py-0.5 rounded-full bg-primary-800 text-white font-sans text-[10px] font-medium">
											{acc.unread}
										</span>
									)}
								</div>
							))}
						</div>
					</FadeIn>

					<FadeIn delay={0.6}>
						<div className="mt-6 space-y-2">
							{[
								{ icon: Tag, text: 'AI auto-tagging by project & category' },
								{ icon: Link2, text: 'Auto-link emails to land sites' },
								{ icon: Paperclip, text: 'Attachments → Document Management' },
								{ icon: Users, text: 'Shared team inbox for acquisitions' },
							].map((f, i) => (
								<div key={i} className="flex items-center gap-2.5">
									<f.icon
										className="w-3.5 h-3.5 text-primary-600 shrink-0"
										strokeWidth={1.5}
									/>
									<span className="font-sans text-xs text-surface-500">
										{f.text}
									</span>
								</div>
							))}
						</div>
					</FadeIn>
				</div>

				{/* Right: email client mockup */}
				<div className="col-span-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="rounded-xl border border-surface-300 shadow-lg overflow-hidden bg-white"
					>
						{/* Toolbar */}
						<div className="px-4 py-2.5 bg-surface-100 border-b border-surface-300 flex items-center gap-3">
							<Inbox className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
							<span className="font-sans text-sm font-medium text-primary-900">
								Unified Inbox
							</span>
							<span className="px-2 py-0.5 rounded-full bg-primary-800 text-white font-sans text-[10px]">
								23 new
							</span>
							<div className="flex-1" />
							<div className="flex items-center gap-2 bg-white border border-surface-300 rounded-lg px-2.5 py-1.5">
								<Search
									className="w-3.5 h-3.5 text-surface-400"
									strokeWidth={1.5}
								/>
								<span className="font-sans text-[11px] text-surface-400">
									Search all emails...
								</span>
							</div>
							<button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-surface-300 hover:bg-surface-200 transition-colors">
								<Filter className="w-3 h-3 text-surface-500" strokeWidth={1.5} />
								<span className="font-sans text-[11px] text-surface-500">
									Filter
								</span>
							</button>
						</div>

						{/* Email list */}
						<div style={{ height: 350 }} className="overflow-auto">
							{emails.map((email, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 + i * 0.08 }}
									onClick={() => setSelectedEmail(i)}
									className={`px-4 py-3 border-b border-surface-300 cursor-pointer transition-colors ${
										selectedEmail === i
											? 'bg-primary-50/50 border-l-2 border-l-primary-800'
											: 'hover:bg-surface-100/50 border-l-2 border-l-transparent'
									}`}
								>
									<div className="flex items-start gap-3">
										{/* Account color dot */}
										<div
											className="w-2 h-2 rounded-full mt-2 shrink-0"
											style={{ background: accounts[email.account].color }}
										/>

										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-0.5">
												<span className="font-sans text-[13px] font-medium text-primary-900 truncate">
													{email.from}
												</span>
												<div className="flex items-center gap-1.5 ml-auto shrink-0">
													{email.starred && (
														<Star className="w-3 h-3 text-accent fill-accent" />
													)}
													{email.attachment && (
														<Paperclip
															className="w-3 h-3 text-surface-400"
															strokeWidth={1.5}
														/>
													)}
													<Clock
														className="w-3 h-3 text-surface-400"
														strokeWidth={1.5}
													/>
													<span className="font-sans text-[10px] text-surface-500">
														{email.time}
													</span>
												</div>
											</div>

											<p className="font-sans text-[12px] text-primary-900 truncate">
												{email.subject}
											</p>
											<p className="font-sans text-[11px] text-surface-500 truncate mt-0.5">
												{email.preview}
											</p>

											<div className="flex items-center gap-2 mt-1.5">
												<span
													className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${email.tagColor}`}
												>
													{email.tag}
												</span>
												{email.linkedSite && (
													<span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-200 text-[9px] text-surface-500">
														<Building2
															className="w-2.5 h-2.5"
															strokeWidth={1.5}
														/>
														{email.linkedSite}
													</span>
												)}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</SlideLayout>
	)
}
