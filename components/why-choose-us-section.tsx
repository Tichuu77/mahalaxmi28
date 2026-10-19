"use client"

import { Check, ShieldCheck, TrendingUp, Sparkles, Phone, Award, Building, Compass, Lightbulb, MapPin, Landmark } from "lucide-react"

const reasons = [
  {
    icon: Landmark,
    title: "Samruddhi Expressway Junction",
    description: "Located directly at Mouza Sumthana, touching the Samruddhi Mahamarg Corridor — Nagpur's highest appreciation investment belt.",
    stat: "7 Mins",
    statLabel: "To MIHAN SEZ",
  },
  {
    icon: Award,
    title: "100% NMRDA & MahaRERA Sanctioned",
    description: "Fully approved under MahaRERA PP1190002602003 with sanctioned RL layout. Absolute safety and clear title guarantee.",
    stat: "100%",
    statLabel: "RL Clear Title",
  },
  {
    icon: TrendingUp,
    title: "Up to 90% Bank Finance Approved",
    description: "Pre-approved by leading nationalized and private banks including SBI, HDFC, ICICI, and Bank of Baroda for smooth loan processing.",
    stat: "90%",
    statLabel: "Loan Available",
  },
  {
    icon: Compass,
    title: "Clear Title & Instant Registration",
    description: "Free of any legal encumbrances with verified RL release. Buyers receive transparent paperwork, registry support, and clear demarcation.",
    stat: "524",
    statLabel: "Sanctioned Plots",
  },
  {
    icon: Lightbulb,
    title: "Attractive Entry from ₹35.4 Lakh*",
    description: "Plot sizes from 1,130 to 5,000 sq.ft at competitive per-square-foot rates. Token booking starts from just ₹51,000.",
    stat: "₹35.4L",
    statLabel: "Starting Price",
  },
  {
    icon: ShieldCheck,
    title: "Direct Developer Booking Desk",
    description: "Direct booking with Mahalaxmi Infra — zero brokerage, guaranteed transparent pricing, and comprehensive end-to-end registry assistance.",
    stat: "13+",
    statLabel: "Years Infra Trust",
  },
]

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="why-choose-us-section relative overflow-hidden py-14 sm:py-20"
      style={{ background: "#f8faf9" }}
    >
      {/* Decorative vertical stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Top Header Label */}
      <div
        className="flex items-center gap-4 pl-4 pr-3 sm:pl-12 sm:pr-10 lg:px-24 py-3 sm:py-4 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9862b]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          INVESTMENT HIGHLIGHTS
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span
          className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-[#30534A]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          MAHALAXMI NAGAR 51 · ANAYA
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 lg:px-16 pt-8 sm:pt-12 pb-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9862b]/15 text-[#a86a1a] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            SECURE YOUR FAMILY'S FUTURE
          </div>

          <h2
            className="text-2xl sm:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-3 sm:mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Why Invest in{" "}
            <span style={{ color: "#30534A" }}>Mahalaxmi Nagar 51</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>
              Anaya?
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#555] leading-relaxed">
            Plotted land along the Samruddhi Expressway corridor offers the strongest capital appreciation in Nagpur.
            Here is why Anaya is Nagpur’s standout plotted community for builders, investors, and homeowners.
          </p>
        </div>

        {/* Reasons Grid: 2 Cards per Row on Mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 mb-10 sm:mb-14">
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.title}
                className="group p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#30534A]/12 shadow-xs sm:shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-[#30534A]/8 border border-[#30534A]/15 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={18} className="text-[#C9862b]" />
                    </div>

                    <div className="text-right">
                      <span
                        className="text-base sm:text-xl font-extrabold text-[#30534A] block leading-none"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {r.stat}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-[#888] font-bold uppercase truncate block">{r.statLabel}</span>
                    </div>
                  </div>

                  <h3
                    className="text-xs sm:text-lg font-bold text-[#0d0d0d] mb-1 sm:mb-2 group-hover:text-[#30534A] transition-colors leading-snug line-clamp-1 sm:line-clamp-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {r.title}
                  </h3>

                  <p className="text-[11px] sm:text-sm text-[#666] leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {r.description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#30534A]/8 flex items-center gap-1 text-[9px] sm:text-xs font-semibold text-[#30534A]">
                  <Check size={12} className="text-[#C9862b] shrink-0" />
                  <span className="truncate">Developer Verified</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#30534A]/15 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-xl font-bold text-[#0d0d0d] mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Looking for a specific plot size or corner facing?
            </h3>
            <p className="text-xs sm:text-sm text-[#666]">
              Contact Direct Sales Desk at <strong className="text-[#30534A]">+91 9579302821</strong> for the latest real-time plot inventory.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+919579302821"
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#30534A] text-white text-xs font-bold hover:bg-[#233d36] transition-all flex items-center justify-center gap-2"
            >
              <Phone size={14} className="text-[#C9862b]" />
              Call Desk
            </a>
            <a
              href="#contact"
              className="flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-[#30534A]/30 text-[#30534A] hover:border-[#C9862b] hover:text-[#C9862b] text-xs font-bold transition-all text-center"
            >
              Book Site Visit
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}