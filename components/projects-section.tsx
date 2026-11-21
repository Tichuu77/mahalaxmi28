"use client"

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react"
import { ArrowRight, MapPin, Phone, ShieldCheck, CheckCircle2, Download, Sparkles, Compass, Maximize2, Building2, ChevronDown } from "lucide-react"

type PlotCategory = {
  id: string
  title: string
  sizeRange: string
  carpetDesc: string
  roadWidth: string
  facing: string
  priceStarting: string
  image: string
  tag: string
  features: string[]
  description: string
  suitableFor: string
}

const PLOT_COLLECTIONS: PlotCategory[] = [
  {
    id: "executive",
    title: "Executive Villa Plots",
    sizeRange: "1,130 – 1,500 Sq.Ft",
    carpetDesc: "Approx 105 to 140 Sq.Mtrs",
    roadWidth: "9m & 12m Cement Roads",
    facing: "East / West Facing Available",
    priceStarting: "Starting ₹35.4 Lakh*",
    image: "/m51-entrance-gate.jpeg",
    tag: "Most Popular",
    features: ["NMRDA Sanctioned", "Clear Title RL", "Underground Drainage", "Up to 90% Loan"],
    description: "Perfect dimensions for building modern 3 to 4 BHK independent duplex villas. Positioned along quiet internal paved avenues with manicured street lighting and complete underground utility conduits.",
    suitableFor: "Ideal for young families, professionals, and smart investors seeking high capital appreciation.",
  },
  {
    id: "boulevard",
    title: "Premium Boulevard Plots",
    sizeRange: "1,800 – 2,500 Sq.Ft",
    carpetDesc: "Approx 167 to 232 Sq.Mtrs",
    roadWidth: "12m & 18m Tree-Lined Boulevards",
    facing: "Central Garden & Park Facing",
    priceStarting: "Custom Pricing on Request",
    image: "/m51-clock-tower.jpeg",
    tag: "Garden Facing",
    features: ["Park Frontage", "Grand Avenues", "Rainwater Harvesting", "Bank Approved"],
    description: "Positioned directly facing the landscaped central lawns and botanical gardens. Provides generous width allowing spacious front lawns, dual-car driveways, and expansive private terrace verandas.",
    suitableFor: "Designed for buyers planning luxury custom villas with private landscaping and open green views.",
  },
  {
    id: "estate",
    title: "Royal Estate Corner Plots",
    sizeRange: "3,000 – 5,000 Sq.Ft",
    carpetDesc: "Approx 278 to 465 Sq.Mtrs",
    roadWidth: "Dual Road Access (12m & 18m)",
    facing: "Double-Side Open Corner",
    priceStarting: "Flagship Luxury Plots",
    image: "/m51-reception.jpeg",
    tag: "Exclusive Release",
    features: ["Corner Parcel", "Double Access", "Maximum Privacy", "Prime Elevation"],
    description: "The crown jewels of Mahalaxmi Nagar 51 Anaya. Limited edition large corner plots with dual road frontages, ideal for multi-storey royal mansions, swimming pools, private gazebos, and grand courtyards.",
    suitableFor: "Tailored for HNIs, industrialists, and multi-generational families building landmark private estates.",
  },
  {
    id: "clubhouse",
    title: "Clubhouse & Sports Enclave Plots",
    sizeRange: "1,500 – 2,200 Sq.Ft",
    carpetDesc: "Approx 140 to 205 Sq.Mtrs",
    roadWidth: "12m Wide Central Ring",
    facing: "Clubhouse & Turf Facing",
    priceStarting: "Lifestyle Premium",
    image: "/m51-football-ground.jpeg",
    tag: "Next to Amenities",
    features: ["30-Sec Walk to Pool", "Turf Proximity", "Creche Nearby", "24/7 Security"],
    description: "Situated just steps away from the grand multi-facility Clubhouse, Olympic-length swimming pool, Box Cricket Turf, Football Turf, and the day-care crèche. Offers unmatched everyday convenience.",
    suitableFor: "Ideal for active families with children and sports enthusiasts who value healthy resort living.",
  },
]

type OtherProject = {
  title: string
  location: string
  status: "Ongoing" | "Delivered"
  img: string
}

const otherProjectsList: OtherProject[] = [
  { title: "Mahalaxmi Nagar-30", location: "MOUZA - PIPLA", status: "Ongoing", img: "/project_M-30.webp" },
  { title: "Mahalaxmi Nagar-31", location: "MOUZA - PIPLA", status: "Ongoing", img: "/project_M-31.webp" },
  { title: "Mahalaxmi Nagar-38", location: "MOUZA - MHASALA", status: "Ongoing", img: "/project_M-38.webp" },
  { title: "Mahalaxmi Nagar-40", location: "MOUZA - KOTEWADA", status: "Ongoing", img: "/M-40-PROJECT.webp" },
  { title: "Mahalaxmi Nagar-45", location: "MOUZA - SUMTHANA", status: "Ongoing", img: "/project_M-45.jpg" },
  { title: "Mahalaxmi Nagar-50", location: "MOUZA - SUMTHANA", status: "Ongoing", img: "/project_M-50.webp" },
  { title: "Mahalaxmi Nagar-49", location: "MOUZA - SONDAPAR", status: "Ongoing", img: "/project_M-49.jpeg" },
  { title: "Mahalaxmi Nagar-47", location: "KORADI ROAD", status: "Ongoing", img: "/project_M-47.jpg" },
  { title: "Mahalaxmi Nagar-37", location: "MOUZA - KOTEWADA", status: "Delivered", img: "/M-37-PROJECT.webp" },
  { title: "Mahalaxmi Nagar-36", location: "MOUZA - PANJARI", status: "Delivered", img: "/M-36-PROJECT.jpg" },
  { title: "Mahalaxmi Nagar-28", location: "MOUZA - SONDAPAR", status: "Delivered", img: "/M-28-PROJECT.jpg" },
]

const TABS = [
  { label: "All Plot Layouts",     value: "all"       },
  { label: "1,130 – 1,500 Sq.Ft",  value: "executive" },
  { label: "1,800 – 2,500 Sq.Ft",  value: "boulevard" },
  { label: "3,000 – 5,000 Sq.Ft",  value: "estate"    },
  { label: "Clubhouse Enclave",    value: "clubhouse" },
] as const

type TabValue = (typeof TABS)[number]["value"]

export function ProjectsSection() {
  const [selectedTab, setSelectedTab] = useState<TabValue>("all")
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [otherStatusFilter, setOtherStatusFilter] = useState<"all" | "Ongoing" | "Delivered">("all")
  const [showOtherProjects, setShowOtherProjects] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filteredPlots = useMemo(() => {
    if (selectedTab === "all") return PLOT_COLLECTIONS
    return PLOT_COLLECTIONS.filter((p) => p.id === selectedTab)
  }, [selectedTab])

  const filteredOtherProjects = useMemo(() => {
    if (otherStatusFilter === "all") return otherProjectsList
    return otherProjectsList.filter((p) => p.status === otherStatusFilter)
  }, [otherStatusFilter])

  const handleWhatsAppInquiry = useCallback((title: string, sizeRange: string) => {
    const text = `Hi Bharti ji, I am interested in the "${title} (${sizeRange})" at Mahalaxmi Nagar 51 Anaya, Mouza Sumthana. Please share the detailed layout plan, available plot numbers, and pricing.`
    window.open(`https://wa.me/919579302821?text=${encodeURIComponent(text)}`, "_blank")
  }, [])

  const handleOtherProjectInquiry = useCallback((title: string, location: string) => {
    const text = `Hi Bharti ji, I am interested in knowing more about "${title}" located at ${location}. Please share layout plan, available inventory, and price sheet.`
    window.open(`https://wa.me/919579302821?text=${encodeURIComponent(text)}`, "_blank")
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section relative overflow-hidden py-20"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7f9f8 50%, #ffffff 100%)" }}
    >
      {/* Decorative vertical border */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #C9862b, #30534A, #C9862b)" }}
      />

      {/* Top Header Label */}
      <div
        className="flex items-center gap-4 pl-6 pr-4 sm:pl-12 sm:pr-10 lg:px-24 py-4 relative z-10"
        style={{ borderBottom: "1px solid rgba(48,83,74,0.1)" }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full text-white"
          style={{ background: "#30534A", fontFamily: "'Poppins', sans-serif" }}
        >
          EXCLUSIVE TOWNSHIP LAYOUTS
        </span>
        <span className="flex-1 h-px" style={{ background: "rgba(48,83,74,0.1)" }} />
        <span
          className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#C9862b]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          MAHARERA: PP1190002602003
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-6 relative z-10">

        {/* Section Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9862b]/15 text-[#a86a1a] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={13} className="text-[#C9862b]" />
            MAHALAXMI NAGAR 51 · ANAYA MASTERPLAN
          </div>

          <h2
            className="text-3xl sm:text-5xl font-extrabold text-[#0d0d0d] leading-tight mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Sanctioned Villa Plots &amp;{" "}
            <span style={{ color: "#30534A" }}>Township</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>
              Inventory
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#555] leading-relaxed">
            Mahalaxmi Nagar 51 (Anaya) spans across a massive 78-acre integrated master plan at Mouza Sumthana.
            Featuring 524 clear-title, NMRDA-sanctioned residential plots with up to 90% bank loan approval.
          </p>
        </div>

        {/* Masterplan Showcase Banner Card */}
        <div
          className="rounded-3xl overflow-hidden mb-14 shadow-xl border border-[#30534A]/15 bg-white"
          style={{ boxShadow: "0 14px 40px rgba(48,83,74,0.08)" }}
        >
          <div className="grid lg:grid-cols-[1.3fr_0.9fr] items-stretch">
            {/* Visual Masterplan Image with Zoom */}
            <div className="relative group bg-[#11231e] min-h-[300px] sm:min-h-[420px] overflow-hidden flex items-center justify-center">
              <img
                src="/project_M-51.png"
                alt="Mahalaxmi Nagar 51 Anaya Master Plan Layout"
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-[#C9862b]/40">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[11px] font-bold text-[#30534A] uppercase tracking-wider">
                  Official Sanctioned Layout
                </span>
              </div>

              <button
                onClick={() => setModalImage("/project_M-51.png")}
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-[#30534A] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
              >
                <Maximize2 size={14} />
                Zoom Masterplan
              </button>
            </div>

            {/* Masterplan Highlights & Specifications */}
            <div className="p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#fbfdfc]">
              <div>
                <div className="flex items-center gap-2 text-[#C9862b] text-xs font-bold uppercase tracking-widest mb-2">
                  <Compass size={15} />
                  Integrated Master Township
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-extrabold text-[#0d0d0d] mb-4 leading-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Anaya — Designed for Royal Living &amp; High ROI
                </h3>

                <p className="text-sm text-[#555] leading-relaxed mb-6">
                  Strategically situated at Mouza Sumthana, touching the Samruddhi Mahamarg Interchange. Designed with wide cement roads, underground drainage, electrical conduit, landscaped open spaces, and world-class sports &amp; community infrastructure.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-xs text-[#888]">Total Project Size</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#30534A]">78+ Acres</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-xs text-[#888]">Total Sanctioned Plots</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#C9862b]">524 Villa Units</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-xs text-[#888]">Plot Sizes Available</span>
                    <span className="text-sm font-bold text-[#0d0d0d]">1,130 to 5,000 Sq.Ft</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#30534A]/5 border border-[#30534A]/10">
                    <span className="block text-xs text-[#888]">Bank Loan Approval</span>
                    <span className="text-sm font-bold text-[#0d0d0d]">Up to 85% - 90%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#30534A]/10">
                <a
                  href="tel:+919579302821"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #30534A 0%, #203b34 100%)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={15} className="text-[#C9862b]" />
                  Call Direct Sales Desk for Layout Pricing (+91 9579302821)
                </a>

                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[#30534A] border border-[#30534A]/30 hover:border-[#C9862b] hover:text-[#C9862b] font-semibold text-xs sm:text-sm transition-all"
                >
                  Request Masterplan PDF &amp; Cost Sheet
                  <Download size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  selectedTab === tab.value
                    ? "linear-gradient(135deg, #30534A, #244139)"
                    : "rgba(48,83,74,0.06)",
                color: selectedTab === tab.value ? "#ffffff" : "#30534A",
                border:
                  selectedTab === tab.value
                    ? "1px solid #30534A"
                    : "1px solid rgba(48,83,74,0.15)",
                boxShadow:
                  selectedTab === tab.value
                    ? "0 4px 15px rgba(48,83,74,0.25)"
                    : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Dedicated Mahalaxmi Nagar 51 Plot Collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-16">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="rounded-3xl overflow-hidden bg-white border border-[#30534A]/12 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ boxShadow: "0 10px 30px rgba(48,83,74,0.06)" }}
            >
              <div>
                {/* Card Top Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={plot.image}
                    alt={plot.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#30534A] tracking-wider uppercase border border-[#C9862b]/30">
                    {plot.tag}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#C9862b] uppercase tracking-wider block">
                        Mahalaxmi Nagar 51 · Anaya
                      </span>
                      <h4
                        className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {plot.title}
                      </h4>
                    </div>
                    <span className="bg-[#C9862b] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                      {plot.sizeRange}
                    </span>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-6">
                  {/* Key Quick Specs */}
                  <div className="grid grid-cols-2 gap-2.5 pb-4 mb-4 border-b border-[#30534A]/10 text-xs">
                    <div>
                      <span className="text-[#888] block text-[11px]">Road Width:</span>
                      <span className="font-semibold text-[#0d0d0d]">{plot.roadWidth}</span>
                    </div>
                    <div>
                      <span className="text-[#888] block text-[11px]">Facing:</span>
                      <span className="font-semibold text-[#0d0d0d]">{plot.facing}</span>
                    </div>
                    <div>
                      <span className="text-[#888] block text-[11px]">Area Scale:</span>
                      <span className="font-semibold text-[#30534A]">{plot.carpetDesc}</span>
                    </div>
                    <div>
                      <span className="text-[#888] block text-[11px]">Pricing Guide:</span>
                      <span className="font-bold text-[#C9862b]">{plot.priceStarting}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-4">
                    {plot.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[#30534A]/4 text-[11px] text-[#30534A] font-medium leading-snug mb-4">
                    {plot.suitableFor}
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {plot.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#30534A]/6 text-[#30534A] text-[10px] font-semibold"
                      >
                        <CheckCircle2 size={11} className="text-[#C9862b]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex gap-2.5">
                <button
                  onClick={() => handleWhatsAppInquiry(plot.title, plot.sizeRange)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #30534A, #25423b)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Phone size={13} className="text-[#C9862b]" />
                  Inquire Layout Plan
                </button>

                <a
                  href="#contact"
                  className="px-4 py-3 rounded-xl border border-[#30534A]/25 text-[#30534A] hover:border-[#C9862b] hover:text-[#C9862b] text-xs font-bold transition-all flex items-center justify-center"
                >
                  Cost Sheet
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            ONGOING & DELIVERED LANDMARK PROJECTS BY MAHALAXMI INFRA
           ========================================================================= */}
        <div id="other-projects" className="pt-8 border-t border-[#30534A]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active &amp; Delivered Developments
              </div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold text-[#0d0d0d] leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Other Ongoing Projects by{" "}
                <span style={{ color: "#30534A" }}>Mahalaxmi</span>{" "}
                <span style={{ color: "#C9862b" }}>Infra</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#555] mt-1">
                Explore our prestigious ongoing &amp; delivered residential plotted townships across Nagpur.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              {(["all", "Ongoing", "Delivered"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOtherStatusFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    otherStatusFilter === filter
                      ? "bg-[#30534A] text-white shadow-sm"
                      : "bg-[#30534A]/6 text-[#30534A] hover:bg-[#30534A]/10 border border-[#30534A]/15"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {filter === "all" ? "All Projects" : filter === "Ongoing" ? "Ongoing (8)" : "Delivered (3)"}
                </button>
              ))}

              <button
                onClick={() => setShowOtherProjects((prev) => !prev)}
                className="text-xs font-bold text-[#30534A] hover:text-[#C9862b] flex items-center gap-1 py-1.5 px-3 rounded-full border border-[#30534A]/20 bg-white transition-colors cursor-pointer"
              >
                <span>{showOtherProjects ? "Hide" : "Show"}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${showOtherProjects ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {showOtherProjects && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 animate-in fade-in duration-300">
              {filteredOtherProjects.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl overflow-hidden bg-white border border-[#30534A]/12 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-32 sm:h-44 overflow-hidden bg-[#11231e]">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5">
                        {p.status === "Ongoing" ? (
                          <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            Ongoing
                          </span>
                        ) : (
                          <span className="bg-[#C9862b] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                            Delivered
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                        <span className="text-[9px] font-semibold text-[#C9862b] uppercase tracking-wider block">
                          Mahalaxmi Infra
                        </span>
                        <h4
                          className="font-bold text-xs sm:text-sm leading-tight drop-shadow-sm truncate"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {p.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="flex items-center gap-1 text-[#666] text-[10px] sm:text-xs mb-3">
                        <MapPin size={12} className="text-[#C9862b] shrink-0" />
                        <span className="font-semibold text-[#0d0d0d] truncate">{p.location}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#30534A]/5 text-[10px] sm:text-[11px] text-[#30534A] font-medium leading-tight">
                        NMRDA Sanctioned · RERA Approved Layout
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 pt-0">
                    <button
                      onClick={() => handleOtherProjectInquiry(p.title, p.location)}
                      className="w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#30534A] to-[#25423b] hover:from-[#25423b] hover:to-[#1a302a] text-white text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Phone size={12} className="text-[#C9862b]" />
                      <span>Inquire Project</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Fullscreen Masterplan Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Full Masterplan"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center text-xs text-[#555] font-semibold">
              Mahalaxmi Nagar 51 (Anaya) · Sanctioned Township Master Plan · RERA: PP1190002602003
            </div>
          </div>
        </div>
      )}
    </section>
  )
}