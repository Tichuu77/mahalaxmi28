"use client"

import { useEffect, useRef, useState, memo } from "react"
import { MapPin, Plane, Route, School, Building2, ShoppingBag, Hospital, Train, Navigation as NavIcon, Phone, Car } from "lucide-react"

const connectivityNodes = [
  {
    icon: Route,
    landmark: "Samruddhi Mahamarg",
    distance: "Touch Corridor",
    time: "2 Mins",
    category: "Expressway",
    tag: "Direct Access",
    tagGold: true,
    detail: "Directly touching the Samruddhi Expressway interchange for seamless travel across Maharashtra.",
  },
  {
    icon: ShoppingBag,
    landmark: "D-Mart & Retail Zone",
    distance: "2.5 Km",
    time: "5 Mins",
    category: "Shopping",
    tag: "Everyday Needs",
    tagGold: false,
    detail: "Convenient access to D-Mart hypermarket, restaurants, daily convenience stores, and commercial banks.",
  },
  {
    icon: Building2,
    landmark: "MIHAN SEZ & Tech Park",
    distance: "4.8 Km",
    time: "7 Mins",
    category: "Employment Hub",
    tag: "High Rental Demand",
    tagGold: true,
    detail: "Home to IT giants (TCS, Infosys, Tech Mahindra, HCL), Boeing MRO, and 50,000+ professionals.",
  },
  {
    icon: Hospital,
    landmark: "AIIMS & NCI Nagpur",
    distance: "5.5 Km",
    time: "8 Mins",
    category: "Healthcare",
    tag: "Premier Medical",
    tagGold: true,
    detail: "All India Institute of Medical Sciences (AIIMS) & National Cancer Institute providing world-class medical facilities.",
  },
  {
    icon: Train,
    landmark: "Upcoming Metro Phase 3",
    distance: "4.0 Km",
    time: "8 Mins",
    category: "Public Transit",
    tag: "Rapid Transit",
    tagGold: false,
    detail: "Upcoming Nagpur Metro Phase 3 corridor ensuring rapid, traffic-free commute to the heart of the city.",
  },
  {
    icon: Route,
    landmark: "Wardha Road Arterial",
    distance: "6.0 Km",
    time: "10 Mins",
    category: "Main Arterial",
    tag: "Prime Corridor",
    tagGold: false,
    detail: "Nagpur’s fastest-growing growth corridor connecting directly to hotels, multiplexes, and city hubs.",
  },
  {
    icon: School,
    landmark: "IIIT, MNLU & Sanskrit Univ",
    distance: "6.5 Km",
    time: "10 Mins",
    category: "Education",
    tag: "Top Institutes",
    tagGold: false,
    detail: "Premier higher education institutions: Indian Institute of Information Technology & National Law University.",
  },
  {
    icon: Plane,
    landmark: "Nagpur International Airport",
    distance: "12 Km",
    time: "15 Mins",
    category: "Air Transit",
    tag: "Quick Airport Run",
    tagGold: true,
    detail: "Dr. Babasaheb Ambedkar International Airport accessible effortlessly via outer express corridors.",
  },
  {
    icon: NavIcon,
    landmark: "Besa & Somalwada Hubs",
    distance: "9.0 Km",
    time: "12 Mins",
    category: "Neighborhood",
    tag: "Thriving Suburb",
    tagGold: false,
    detail: "Established urban centers with premium schools, multi-speciality clinics, cafes, and markets.",
  },
]

export function LocationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="location"
      className="locations-section relative overflow-hidden py-20"
      style={{ background: "#ffffff" }}
    >
      {/* Decorative vertical stripe */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #30534A, #C9862b, #30534A)" }}
      />

      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(48,83,74,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top Header Label */}
      <div
        className="flex items-center gap-4 pl-6 pr-4 sm:pl-12 sm:pr-10 lg:px-24 py-4 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C9862b]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          STRATEGIC LOCATION &amp; CONNECTIVITY
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span
          className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#30534A]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          MOUZA SUMTHANA, NAGPUR
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30534A]/8 text-[#30534A] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin size={13} className="text-[#C9862b]" />
            PRIME NAGPUR GROWTH CORRIDOR
          </div>

          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Connected to Everything{" "}
            <span style={{ color: "#30534A" }}>That Matters</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>
              Most
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#555] leading-relaxed">
            Mahalaxmi Nagar 51 (Anaya) is located in <strong className="text-[#30534A]">Mouza Sumthana</strong>,
            Nagpur’s most sought-after investment zone directly on the Samruddhi Mahamarg Corridor.
            Minutes away from key IT parks, healthcare landmarks, educational institutes, and retail centers.
          </p>
        </div>

        {/* Connectivity Grid: 2 Cards per Row on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 mb-10 sm:mb-14">
          {connectivityNodes.map((node, index) => {
            const Icon = node.icon
            return (
              <div
                key={node.landmark}
                className="group p-3 sm:p-5 rounded-2xl bg-white border border-[#30534A]/12 shadow-xs sm:shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{
                  transitionDelay: isVisible ? `${index * 40}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: node.tagGold ? "rgba(201,134,43,0.12)" : "rgba(48,83,74,0.08)",
                        color: node.tagGold ? "#C9862b" : "#30534A",
                        border: `1px solid ${node.tagGold ? "rgba(201,134,43,0.3)" : "rgba(48,83,74,0.15)"}`,
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="text-right">
                      <span
                        className="text-sm sm:text-lg font-extrabold text-[#30534A] block leading-none"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {node.time}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-[#888] font-medium">{node.distance}</span>
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md truncate"
                      style={{
                        background: node.tagGold ? "rgba(201,134,43,0.15)" : "rgba(48,83,74,0.08)",
                        color: node.tagGold ? "#a86a1a" : "#30534A",
                      }}
                    >
                      {node.tag}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-[#999] uppercase tracking-wider hidden sm:inline">{node.category}</span>
                  </div>

                  <h3
                    className="text-xs sm:text-lg font-bold text-[#0d0d0d] mb-1 sm:mb-2 leading-snug group-hover:text-[#30534A] transition-colors line-clamp-1 sm:line-clamp-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {node.landmark}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#666] leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {node.detail}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-[#30534A]/8 flex items-center justify-between text-[9px] sm:text-[11px] text-[#888]">
                  <span className="hidden sm:inline">From Anaya</span>
                  <span className="text-[#C9862b] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 truncate">
                    Expressway Drive →
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Free Site Visit & Pickup Strip */}
        <div
          className="rounded-3xl p-6 sm:p-10 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #30534A 0%, #1f3a33 100%)",
            boxShadow: "0 12px 35px rgba(48,83,74,0.3)",
          }}
        >
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3">
              <Car size={14} className="text-[#C9862b]" />
              Complimentary Site Visit
            </div>
            <h3
              className="text-2xl sm:text-3xl font-extrabold mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Experience Mouza Sumthana in Person
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              We provide free site visit pickup and drop service across Nagpur.
              Let Sale Executive Bharti Bharat Sangode walk you through the sanctioned plot boundaries and township amenities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+919579302821"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{
                background: "#C9862b",
                color: "#ffffff",
                boxShadow: "0 4px 18px rgba(201,134,43,0.5)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Phone size={15} />
              Call Bharti (+91 9579302821)
            </a>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm border border-white/30 hover:border-white text-white hover:bg-white/10 transition-all text-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Schedule Online Visit
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}