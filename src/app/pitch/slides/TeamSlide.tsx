"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../shared/FadeIn";
import { StaggerContainer, staggerItem } from "../shared/StaggerContainer";

const team = [
  {
    name: "Team Member",
    role: "CEO & Founder",
    image: "/landiq/images/team/professional-portrait-01.jpg",
  },
  {
    name: "Team Member",
    role: "CTO",
    image: "/landiq/images/team/professional-portrait-02.jpg",
  },
  {
    name: "Team Member",
    role: "Head of Product",
    image: "/landiq/images/team/professional-portrait-03.jpg",
  },
  {
    name: "Team Member",
    role: "Lead Developer",
    image: "/landiq/images/team/professional-portrait-04.jpg",
  },
];

const trustLogos = [
  "NSW ePlanning",
  "VIC Open Data",
  "G-NAF",
  "PostgreSQL + PostGIS",
];

export function TeamSlide() {
  return (
    <div className="absolute inset-0 flex overflow-hidden bg-white">
      {/* Left: team photo background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-[420px] relative hidden lg:block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/landiq/images/team/team-meeting-01.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
        {/* Overlay text */}
        <div className="absolute bottom-8 left-8 right-16">
          <p className="font-serif text-2xl text-white drop-shadow-lg leading-snug">
            Built by developers,
            <br />
            for developers.
          </p>
        </div>
      </motion.div>

      {/* Right: content */}
      <div className="flex-1 flex items-center px-16">
        <div className="w-full max-w-[700px]">
          <FadeIn>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-primary-600 mb-3">
              Team
            </p>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-primary-900 leading-[1.2]">
              Deep expertise in property, planning & technology
            </h2>
          </FadeIn>

          {/* Team members */}
          <StaggerContainer className="grid grid-cols-4 gap-5 mt-10" delay={0.4}>
            {team.map((member) => (
              <motion.div key={member.role} variants={staggerItem} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-surface-300 mb-3">
                  <img
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-sans text-sm font-medium text-primary-900">
                  {member.name}
                </h4>
                <p className="font-sans text-xs text-surface-500 mt-0.5">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Trust signals */}
          <FadeIn delay={0.8}>
            <p className="font-sans text-xs uppercase tracking-[0.06em] text-surface-500 mt-12 mb-4">
              Powered by verified government data sources
            </p>
            <div className="flex gap-3 flex-wrap">
              {trustLogos.map((logo) => (
                <div
                  key={logo}
                  className="px-4 py-2.5 rounded-lg border border-surface-300 bg-surface-100"
                >
                  <span className="font-sans text-xs text-primary-800 font-medium">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
