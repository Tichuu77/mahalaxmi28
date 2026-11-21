"use client"

import { useEffect, useState, useRef, useCallback, memo } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Static data at module level
const galleryItems = [
  { id: 1, src: "/m51-entrance-gate.jpeg",   alt: "Grand Entrance Arch & Boulevard",         category: "Entrance Arch"   },
  { id: 2, src: "/m51-club-aerial.jpeg",     alt: "Signature Clubhouse & Olympic Swimming Pool", category: "Club & Pool"  },
  { id: 3, src: "/m51-clock-tower.jpeg",     alt: "Iconic European Clock Tower & Main Avenue",  category: "Landmark"      },
  { id: 4, src: "/m51-football-ground.jpeg", alt: "Football Ground & Box Cricket Turfs",      category: "Sports Enclave" },
  { id: 5, src: "/m51-kids-play.jpeg",       alt: "Children’s Adventure Play Wonderland",     category: "Kids Park"      },
  { id: 6, src: "/m51-reception.jpeg",       alt: "Township Reception & Welcome Lounge",       category: "Welcome Lounge" },
]

const TOTAL = galleryItems.length

// Precomputed modular nav — avoids recalc in multiple places
const nextId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) + 1) % TOTAL].id
const prevId = (id: number) => galleryItems[(galleryItems.findIndex(i => i.id === id) - 1 + TOTAL) % TOTAL].id

/* ── GalleryTile ── */
const GalleryTile = memo(({
  item, className, large = false, wide = false, onClick,
}: {
  item: { src: string; alt: string; category: string }
  className?: string
  large?: boolean
  wide?: boolean
  onClick: () => void
}) => (
  <div
    className={`group cursor-pointer relative rounded-2xl overflow-hidden ${className}`}
    onClick={onClick}
  >
    <img
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
      style={{ willChange: "transform" }}
    />

    <div
      className={`absolute inset-0 transition-opacity duration-300 ${wide ? "gallery-tile-overlay wide" : "gallery-tile-overlay"}`}
    />

    <div className={`absolute ${large || wide ? "bottom-5 left-5" : "bottom-3 left-3"}`}>
      {(large || wide) && (
        <span className="gallery-tile-category block text-[10px] uppercase tracking-widest mb-1 font-semibold">
          {item.category}
        </span>
      )}
      <p className="text-white font-bold drop-shadow-lg leading-tight" style={{ fontSize: large ? "1.15rem" : "0.78rem" }}>
        {item.alt}
      </p>
    </div>

    {large && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="gallery-tile-hover-icon w-14 h-14 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    )}

    {!large && (
      <div
        className="gallery-tile-accent absolute bottom-0 left-0 w-0 group-hover:w-full transition-all duration-500"
      />
    )}
  </div>
))
GalleryTile.displayName = "GalleryTile"

/* ── Lightbox ── */
const Lightbox = memo(({ selectedId, onClose, onPrev, onNext }: {
  selectedId: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  const active = galleryItems.find(i => i.id === selectedId)!
  return (
    <div
      className="gallery-lightbox-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        style={{ maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={active.src}
          alt={active.alt}
          decoding="async"
          className="w-full rounded-2xl object-contain"
          style={{ maxHeight: "80vh" }}
        />

        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          aria-label="Previous"
          className="gallery-lightbox-nav-button absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          aria-label="Next"
          className="gallery-lightbox-nav-button absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        <button
          onClick={onClose}
          aria-label="Close"
          className="gallery-lightbox-close-button absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors active:scale-95"
        >
          <X size={18} className="text-white" />
        </button>

        <div
          className="gallery-lightbox-info absolute bottom-3 left-3 right-3 rounded-xl px-4 py-3"
        >
          <p className="text-white font-semibold text-sm">{active.alt}</p>
          <span className="gallery-lightbox-info-category text-[10px] uppercase tracking-widest font-semibold">
            {active.category}
          </span>
        </div>
      </div>
    </div>
  )
})
Lightbox.displayName = "Lightbox"

/* ── Section ── */
export function GallerySection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isVisible, setIsVisible]   = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef  = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Intersection observer
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.08, rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Keyboard nav — only attached when lightbox is open
  useEffect(() => {
    if (selectedId === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); setSelectedId(id => id !== null ? nextId(id) : null) }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setSelectedId(id => id !== null ? prevId(id) : null) }
      if (e.key === "Escape")     { e.preventDefault(); setSelectedId(null) }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId])

  const closeModal  = useCallback(() => setSelectedId(null), [])
  const modalPrev   = useCallback(() => setSelectedId(id => id !== null ? prevId(id) : null), [])
  const modalNext   = useCallback(() => setSelectedId(id => id !== null ? nextId(id) : null), [])
  const nextSlide   = useCallback(() => setCurrentSlide(p => (p + 1) % TOTAL), [])
  const prevSlide   = useCallback(() => setCurrentSlide(p => (p - 1 + TOTAL) % TOTAL), [])

  // Stable per-item open handlers — built once at render, tiles are memoized so they won't re-render
  // Use data-id pattern to avoid creating 12 closures
  const handleTileClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const id = Number((e.currentTarget as HTMLElement).dataset.id)
    if (id) setSelectedId(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="gallery-section relative overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(48,83,74,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Glow accents */}
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(201,134,43,0.08)" }} />
      <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(48,83,74,0.07)" }} />

      {/* Label strip */}
      <div
        className="gallery-section-label-strip flex items-center gap-4 px-6 sm:px-16 lg:px-24 py-5 relative z-10"
      >
        <span className="gallery-section-label text-[10px] tracking-[0.35em] uppercase font-bold">Gallery</span>
        <span className="gallery-section-label-divider flex-1" />
        <span className="gallery-section-label-subtitle text-[10px] tracking-[0.2em] uppercase font-medium">{TOTAL} Photos</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 lg:px-24 pt-8 pb-6 relative z-10">

        {/* Header */}
        <div className={`mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ willChange: "transform, opacity" }}>
          <span className="text-[10px] tracking-[0.35em] uppercase font-bold block mb-3" style={{ color: "#C9862b", fontFamily: "'Poppins', sans-serif" }}>
            Visual Inspiration
          </span>
          <h2 className="font-bold leading-tight" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.2rem)", color: "#0d0d0d" }}>
            Mahalaxmi Nagar 51{" "}
            <span style={{ color: "#30534A" }}>Township</span>{" "}
            <span style={{ WebkitTextStroke: "1.5px #C9862b", color: "transparent" }}>Gallery</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#555] mt-2 max-w-xl">
            A visual tour through Nagpur’s premier 78-acre low-density gated township at Mouza Sumthana.
          </p>
        </div>

        {/* Mobile: 2 Cards per Row Grid */}
        <div className={`md:hidden mb-8 grid grid-cols-2 gap-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ willChange: "transform, opacity" }}>
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden shadow-xs border border-[#30534A]/10 group cursor-pointer active:scale-98 transition-transform"
              onClick={() => setSelectedId(item.id)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2.5">
                <div>
                  <span className="text-white/80 text-[8px] uppercase tracking-wider block font-semibold">{item.category}</span>
                  <p className="font-bold text-white text-xs leading-tight line-clamp-1">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop masonry */}
        <div className={`hidden md:grid grid-cols-12 gap-4 lg:gap-5 auto-rows-[220px] transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ willChange: "opacity" }}>
          <GalleryTile item={galleryItems[0]} className="col-span-8 row-span-2" large onClick={() => setSelectedId(galleryItems[0].id)} />
          <GalleryTile item={galleryItems[1]} className="col-span-4 row-span-1" onClick={() => setSelectedId(galleryItems[1].id)} />
          <GalleryTile item={galleryItems[2]} className="col-span-4 row-span-1" onClick={() => setSelectedId(galleryItems[2].id)} />
          <GalleryTile item={galleryItems[3]} className="col-span-4 row-span-1" onClick={() => setSelectedId(galleryItems[3].id)} />
          <GalleryTile item={galleryItems[4]} className="col-span-4 row-span-1" onClick={() => setSelectedId(galleryItems[4].id)} />
          <GalleryTile item={galleryItems[5]} className="col-span-4 row-span-1" onClick={() => setSelectedId(galleryItems[5].id)} />
        </div>
      </div>

      {/* Lightbox — only mounted when open */}
      {selectedId !== null && (
        <Lightbox
          selectedId={selectedId}
          onClose={closeModal}
          onPrev={modalPrev}
          onNext={modalNext}
        />
      )}
    </section>
  )
}