"use client"

import { useState, useCallback, memo, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Send, X, Phone, ShieldCheck } from "lucide-react"
import {
    normalizePhone10,
    isBlockedOrFakePhone10,
    hasSubmittedThisPhone,
    recordSubmittedPhone,
    validateFillDuration,
} from "@/lib/form-protection"

const inputStyle = {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "rgba(48,83,74,0.04)",
    border: "1px solid rgba(48,83,74,0.18)",
    borderRadius: "0.875rem",
    color: "#0d0d0d",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
}

const inputFocus = (e) => { e.currentTarget.style.borderColor = "#C9862b" }
const inputBlur = (e) => { e.currentTarget.style.borderColor = "rgba(48,83,74,0.18)" }
const COOLDOWN_MS = 12 * 60 * 60 * 1000

const Label = memo(({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-[11px] sm:text-xs font-bold uppercase mb-1.5 leading-snug break-words"
        style={{ color: "#30534A", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.08em" }}>
        {children}
    </label>
))
Label.displayName = "Label"

const EMPTY_FORM = { name: "", mobile: "", plotCategory: "Executive Villa Plot (1,130 - 1,500 Sq.Ft)" }

export default function ContactPopup() {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [formState, setFormState] = useState(EMPTY_FORM)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState("idle")
    const [honeypot, setHoneypot] = useState("")
    const formStartedAtRef = useRef(null)
    const humanRef = useRef(false)

    const markFormStarted = useCallback(() => {
        if (formStartedAtRef.current === null) formStartedAtRef.current = Date.now()
    }, [])

    const markHuman = useCallback(() => {
        humanRef.current = true
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return

        const alreadySubmitted = localStorage.getItem("formSubmitted") === "true"
        const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0", 10)
        const withinCooldown = alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS
        if (withinCooldown) return

        const shouldHideOnce = sessionStorage.getItem("hideContactPopupOnce") === "true"
        if (shouldHideOnce) {
            sessionStorage.removeItem("hideContactPopupOnce")
            return
        }

        let observer = null
        let cancelled = false
        let rafId = 0

        const attachWhenReady = (attempt = 0) => {
            if (cancelled || attempt > 240) return
            const projectsSection = document.getElementById("projects")
            if (!projectsSection) {
                rafId = requestAnimationFrame(() => attachWhenReady(attempt + 1))
                return
            }
            let triggered = false
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (!entry.isIntersecting || triggered) continue
                        triggered = true
                        setOpen(true)
                        observer?.disconnect()
                        observer = null
                    }
                },
                { root: null, threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
            )
            observer.observe(projectsSection)
        }

        const timer = setTimeout(() => { attachWhenReady() }, 500)

        return () => {
            cancelled = true
            clearTimeout(timer)
            cancelAnimationFrame(rafId)
            observer?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!open) return
        formStartedAtRef.current = null
        humanRef.current = false
        setHoneypot("")
        setSubmitStatus("idle")
    }, [open])

    const handleChange = useCallback((e) => {
        markFormStarted()
        markHuman()
        const { name, value } = e.target
        setFormState((prev) => ({ ...prev, [name]: value }))
    }, [markFormStarted, markHuman])

    const handleMobileChange = useCallback((e) => {
        markFormStarted()
        markHuman()
        const raw = e.target.value.replace(/\D/g, "").slice(0, 10)
        setFormState((prev) => ({ ...prev, mobile: raw }))
    }, [markFormStarted, markHuman])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()

            if (typeof window !== "undefined") {
                const alreadySubmitted = localStorage.getItem("formSubmitted") === "true"
                const submittedAt = parseInt(localStorage.getItem("formSubmittedAt") || "0", 10)
                if (alreadySubmitted && Date.now() - submittedAt < COOLDOWN_MS) {
                    setSubmitStatus("rateLimit")
                    return
                }
            }

            if (honeypot.trim() !== "") {
                setSubmitStatus("spam")
                setTimeout(() => setSubmitStatus("idle"), 4000)
                return
            }

            if (!humanRef.current) {
                setSubmitStatus("interaction")
                setTimeout(() => setSubmitStatus("idle"), 4000)
                return
            }

            if (!validateFillDuration(formStartedAtRef.current)) {
                setSubmitStatus("timing")
                setTimeout(() => setSubmitStatus("idle"), 4000)
                return
            }

            const name = (formState.name || "").trim()
            const mobile = (formState.mobile || "").trim()
            const plotCategory = (formState.plotCategory || "").trim()
            const phone10 = normalizePhone10(mobile)

            if (!name || !mobile) {
                setSubmitStatus("error")
                setTimeout(() => setSubmitStatus("idle"), 3000)
                return
            }

            if (isBlockedOrFakePhone10(phone10)) {
                setSubmitStatus("phone")
                setTimeout(() => setSubmitStatus("idle"), 4000)
                return
            }

            if (hasSubmittedThisPhone(phone10)) {
                setSubmitStatus("duplicatePhone")
                setTimeout(() => setSubmitStatus("idle"), 4000)
                return
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("formSubmitted", "true")
                localStorage.setItem("formSubmittedAt", String(Date.now()))
            }

            setIsSubmitting(true)
            setSubmitStatus("idle")

            try {
                const formData = new FormData()
                formData.append("access_key", "7a6bc102-dcc3-4f79-a088-0a0f5bd21923")
                formData.append("name", name)
                formData.append("subject", `Popup Inquiry – Mahalaxmi Nagar 51 (${plotCategory})`)
                formData.append("message", `Project: Mahalaxmi Nagar 51 Anaya (Mouza Sumthana)\nName: ${name}\nMobile: ${phone10}\nPlot Category: ${plotCategory}\nSale Executive: Bharti Bharat Sangode (+91 9579302821)`)

                const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData,
                })
                const data = await res.json()

                if (res.ok && data.success) {
                    recordSubmittedPhone(phone10)
                    setFormState(EMPTY_FORM)
                    setHoneypot("")
                    setOpen(false)
                    if (typeof window !== "undefined") sessionStorage.setItem("hideContactPopupOnce", "true")
                    router.push("/thank-you")
                } else {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("formSubmitted")
                        localStorage.removeItem("formSubmittedAt")
                    }
                    setSubmitStatus("error")
                    setTimeout(() => setSubmitStatus("idle"), 3000)
                }
            } catch (err) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("formSubmitted")
                    localStorage.removeItem("formSubmittedAt")
                }
                setSubmitStatus("error")
                setTimeout(() => setSubmitStatus("idle"), 3000)
            } finally {
                setIsSubmitting(false)
            }
        },
        [formState, router, honeypot]
    )

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div
                className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#30534A]/15 animate-in zoom-in-95 duration-200"
                style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-[#999] hover:text-[#0d0d0d] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#C9862b] uppercase tracking-wider mb-1">
                    <ShieldCheck size={14} />
                    Mahalaxmi Nagar 51 · Anaya
                </div>
                <h3
                    className="text-xl sm:text-2xl font-extrabold text-[#0d0d0d] mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Get Layout &amp; Cost Sheet
                </h3>
                <p className="text-xs text-[#666] mb-5">
                    Sale Executive <strong>Bharti Bharat Sangode</strong> will share the latest availability and pricing.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5"
                    onPointerDownCapture={markHuman}
                    onKeyDownCapture={markHuman}
                    onFocusCapture={markHuman}
                >
                    <input
                        type="text"
                        name="b_phone"
                        tabIndex={-1}
                        autoComplete="new-password"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                        aria-hidden="true"
                    />

                    <div>
                        <Label htmlFor="popup-name">Full Name <span style={{ color: "#e55" }}>*</span></Label>
                        <input
                            type="text"
                            id="popup-name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            style={inputStyle}
                            onFocus={() => { markFormStarted(); markHuman() }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="popup-mobile">Mobile Number <span style={{ color: "#e55" }}>*</span></Label>
                        <input
                            type="tel"
                            id="popup-mobile"
                            name="mobile"
                            value={formState.mobile}
                            onChange={handleMobileChange}
                            required
                            placeholder="+91 9XXXX XXXXX"
                            maxLength={10}
                            pattern="\d{10}"
                            style={inputStyle}
                            onFocus={() => { markFormStarted(); markHuman() }}
                        />
                    </div>

                    <div>
                        <Label htmlFor="popup-category">Interested Plot Type</Label>
                        <select
                            id="popup-category"
                            name="plotCategory"
                            value={formState.plotCategory}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                appearance: "none",
                                cursor: "pointer",
                            }}
                            onFocus={() => { markFormStarted(); markHuman() }}
                        >
                            <option value="Executive Villa Plot (1,130 - 1,500 Sq.Ft)">Executive Villa Plot (1,130 - 1,500 Sq.Ft)</option>
                            <option value="Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)">Premium Boulevard Plot (1,800 - 2,500 Sq.Ft)</option>
                            <option value="Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)">Royal Estate Corner Plot (3,000 - 5,000 Sq.Ft)</option>
                            <option value="Clubhouse & Sports Enclave Plot">Clubhouse &amp; Sports Enclave Plot</option>
                        </select>
                    </div>

                    {submitStatus === "error" && (
                        <div className="rounded-xl p-2.5 text-xs text-[#c44] bg-red-50 border border-red-200">
                            Please check all fields and try again.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 font-bold text-xs sm:text-sm py-3.5 rounded-xl text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60 cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #30534A, #213c35)",
                            fontFamily: "'Poppins', sans-serif",
                            boxShadow: "0 6px 20px rgba(48,83,74,0.25)",
                        }}
                    >
                        {isSubmitting ? "Sending…" : <>Request Instant Details <Send size={14} /></>}
                    </button>

                    <div className="pt-2 text-center">
                        <a
                            href="tel:+919579302821"
                            className="text-xs font-bold text-[#30534A] hover:text-[#C9862b] inline-flex items-center gap-1.5"
                        >
                            <Phone size={13} className="text-[#C9862b]" />
                            Or Call Direct: +91 9579302821
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}