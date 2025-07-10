"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react"
import Link from "next/link"

// Image Modal Component - Reduced size to match services segment
function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}: {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-md max-h-[60vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Yearbook-style presentation - smaller size */}
        <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl p-4 shadow-2xl border-4 border-amber-300">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-3 shadow-inner">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              className="w-full h-full object-contain rounded-lg shadow-lg max-h-[60vh]"
            />

            {/* Yearbook-style caption */}
            <div className="mt-3 text-center">
              <div className="bg-amber-200 rounded-full px-4 py-1 inline-block border-2 border-amber-400">
                <span className="text-amber-800 font-black text-sm">Happy Friends Project</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Service Carousel Component with Auto-advance and Modal - Added background overlay
function ServiceCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState("")

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc)
    setModalOpen(true)
  }

  return (
    <>
      <div className="relative">
        {/* Main Image Display */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border-2 border-white relative overflow-hidden">
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${title} ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out cursor-pointer hover:scale-105"
              onClick={() => openModal(images[currentIndex])}
            />
          </div>
        </div>

        {/* Dots Navigation - Moved much further down */}
        <div className="flex justify-center mt-16 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image Modal with background overlay */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={modalImage}
        imageAlt={`${title} - Full View`}
      />
    </>
  )
}

// Portfolio Carousel Component for different layouts
function PortfolioCarousel({
  images,
  title,
  height = "h-64",
  autoAdvanceDelay = 4000,
}: {
  images: string[]
  title: string
  height?: string
  autoAdvanceDelay?: number
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState("")

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoAdvanceDelay)
    return () => clearInterval(interval)
  }, [images.length, autoAdvanceDelay])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc)
    setModalOpen(true)
  }

  return (
    <>
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg group">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${title} ${currentIndex + 1}`}
            className={`w-full ${height} object-cover transition-all duration-1000 ease-in-out cursor-pointer hover:scale-105`}
            onClick={() => openModal(images[currentIndex])}
          />

          {/* Overlay with dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal with background overlay */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={modalImage}
        imageAlt={`${title} - Full View`}
      />
    </>
  )
}

// Video Carousel Component for video content
function VideoCarousel({ videos, title }: { videos: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalVideo, setModalVideo] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Removed interval-based auto-advance

  // Auto-play video when currentIndex changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const openModal = (videoSrc: string) => {
    setModalVideo(videoSrc)
    setModalOpen(true)
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = e.currentTarget.querySelector("video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
        setIsPlaying(false)
      } else {
        video.play()
        setIsPlaying(true)
      }
    }
  }

  // Handler for when video ends
  const handleVideoEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(false);
  }

  return (
    <>
      <div className="relative">
        {/* Main Video Display */}
        <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border-2 border-white relative overflow-hidden">
          <div className="relative h-48 rounded-xl overflow-hidden group">
            <video
              ref={videoRef}
              src={videos[currentIndex] || "/placeholder.mp4"}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out cursor-pointer hover:scale-105"
              muted
              loop={false}
              playsInline
              poster="/placeholder.svg?height=200&width=300&text=Video+Thumbnail"
              onClick={() => openModal(videos[currentIndex])}
              onEnded={handleVideoEnded}
            />

            {/* Play/Pause Overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                {isPlaying ? (
                  <div className="w-4 h-4 bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-gray-800"></div>
                      <div className="w-1 h-4 bg-gray-800"></div>
                    </div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[8px] border-l-gray-800 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                )}
              </div>
            </div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                {`${title} ${currentIndex + 1}`}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-16 space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[80vh] w-full">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-black rounded-2xl p-4 shadow-2xl">
              <video
                src={modalVideo}
                className="w-full h-full max-h-[70vh] object-contain rounded-lg"
                controls
                autoPlay
                playsInline
              />
              <div className="mt-4 text-center">
                <div className="bg-red-600 rounded-full px-6 py-2 inline-block">
                  <span className="text-white font-black">{title} - Full View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Detect active section based on scroll position
      const sections = ["home", "services", "portfolio", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  // WhatsApp function
  const openWhatsApp = () => {
    const phoneNumber = "628111224478"
    const message = "Mau nanya-nanya min soal Happy Friends Project"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  // Real yearbook images
  const yearbookImages = [
    "/yearbook1.jpg", // Wanderlust theme
    "/yearbook2.jpg", // Luxerra theme
    "/yearbook3.jpg", // Actala theme
    "/yearbook4.jpg", // The Musical theme
    "/yearbook5.jpg", // Antevorta theme
  ]

  // Real photography images - Updated with actual images
  const photographyImages = [
    "/photography1.jpg", // Student profiles with orange background
    "/photography2.jpg", // Class of 2023 Group 8
    "/photography3.jpg", // Money Heist themed
    "/photography4.jpg", // Our Profile with golden frames
    "/photography5.jpg", // Money Heist graduation theme
  ]

  const videoImages = [
    "/v1.mp4?height=200&width=300&text=Video+Production+1",
    "/placeholder.svg?height=200&width=300&text=Video+Production+2",
    "/placeholder.svg?height=200&width=300&text=Video+Production+3",
    "/placeholder.svg?height=200&width=300&text=Video+Production+4",
    "/placeholder.svg?height=200&width=300&text=Video+Production+5",
  ]

  // Portfolio images for different sections
  const portfolioLeftTopImages = [
    "/kia1.JPG?height=300&width=400&text=Portfolio+Left+1",
    "/kia2.JPG?height=300&width=400&text=Portfolio+Left+2",
    "/kia3.JPG?height=300&width=400&text=Portfolio+Left+3",
  ]

  const portfolioLeftBottomImages = [
    "/kib1.JPG?height=300&width=400&text=Portfolio+Left+1",
    "/kib2.JPG?height=300&width=400&text=Portfolio+Left+2",
    "/kib3.JPG?height=300&width=400&text=Portfolio+Left+3",
  ]

  const portfolioRightBottomImages = [
    "/kb1.JPG?height=300&width=400&text=Portfolio+Right+1",
    "/kb2.JPG?height=300&width=400&text=Portfolio+Right+2",
    "/kb3.JPG?height=300&width=400&text=Portfolio+Right+3",
  ]
  const portfolioRightTopImages = [
    "/ka1.JPG?height=300&width=400&text=Portfolio+Right+1",
    "/ka2.JPG?height=300&width=400&text=Portfolio+Right+2",
    "/ka3.JPG?height=300&width=400&text=Portfolio+Right+3",
  ]

  // Updated center portfolio images with the 4 real photos provided by user
  const portfolioCenterImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nara%20Olivia%20Lahutna.JPG-bMW6GO9wjJYhTAJzufxiO0I0XT61uo.jpeg", // Nara Olivia Lahutna - vintage aesthetic portrait
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rana%20Hazimah.JPG-YUVuiQ8ffnsxH5bE6azcenLlSgp6f2.jpeg", // Rana Hazimah - professional portrait with hijab
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fabio%20Alfath%20Setiawan.JPG-BjjQB4wc5ztGG4dHPOzypwXkJ5LquM.jpeg", // Fabio Alfath Setiawan - modern futuristic portrait
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Djimi%20Rizqi%20Darmawan.JPG-V7KRZK8GMBl0ksIPOUiuu0wfQ8es4I.jpeg", // Djimi Rizqi Darmawan - creative shopping cart portrait
  ]

  const stats = [
    { number: "5", label: "Years", subtitle: "& still going strong" },
    { number: "150+", label: "Schools", subtitle: "across Indonesia" },
    { number: "50K+", label: "Yearbooks", subtitle: "created with love" },
    { number: "25", label: "Cities", subtitle: "we've reached" },
    { number: "1K+", label: "Designs", subtitle: "unique & creative" },
    { number: "15K+", label: "Photos", subtitle: "captured memories" },
  ]

  const faqs = [
    {
      question: "Dimana Kantor Pusat Happy Friends Project?",
      answer:
        "Kantor pusat kami berada di Jakarta dan kami melayani seluruh Indonesia dengan tim kreatif yang berpengalaman dalam pembuatan yearbook.",
    },
    {
      question: "Apakah Memiliki Legalitas?",
      answer:
        "Ya, Happy Friends Project adalah perusahaan yang terdaftar resmi dengan semua dokumen legalitas yang lengkap.",
    },
    {
      question: "Apakah Ada Garansi?",
      answer: "Kami memberikan garansi kepuasan 100% untuk setiap project yearbook yang kami kerjakan.",
    },
    {
      question: "Apakah Happy Friends Project Bisa Menerima Project di Luar Jawa?",
      answer:
        "Tentu saja! Kami melayani seluruh Indonesia dan siap membantu sekolah di manapun untuk membuat yearbook yang memorable.",
    },
    {
      question: "Bagaimana Sistem Pembayaran Projectnya?",
      answer:
        "Kami menyediakan sistem pembayaran yang fleksibel dengan berbagai metode pembayaran yang aman dan terpercaya.",
    },
  ]

    const videoFiles = [
    "/videos/v1.mp4",
    // "/videos/video2.mp4",
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, #FF1493, #FF69B4)`,
            opacity: 0.1,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, #00BFFF, #1E90FF)`,
            opacity: 0.08,
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, #FFD700, #FFA500)`,
            opacity: 0.1,
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, #8A2BE2, #9370DB)`,
            opacity: 0.08,
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        {/* HP Logo Silhouette Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-96 h-96 opacity-5 transform rotate-12"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hp-removebg-preview-mWbCO2m0mEnyTiYjULaSWk7YyKUTKs.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: `rotate(12deg) translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
            }}
          />
        </div>
      </div>

      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50" : "bg-transparent"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hp-removebg-preview-mWbCO2m0mEnyTiYjULaSWk7YyKUTKs.png"
              alt="Happy Friends Project Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              HAPPY FRIENDS PROJECT
            </h1>
            <p className="text-xs text-gray-600">#BEHAPPYWITHYOURFRIENDS</p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={`transition-colors font-bold ${
              activeSection === "home" ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className={`transition-colors font-bold ${
              activeSection === "services" ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
            }`}
          >
            SERVICES
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className={`transition-colors font-bold ${
              activeSection === "portfolio" ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
            }`}
          >
            PORTFOLIO
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={`transition-colors font-bold ${
              activeSection === "about" ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
            }`}
          >
            ABOUT
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={`transition-colors font-bold ${
              activeSection === "contact" ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
            }`}
          >
            CONTACT
          </button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-800 hover:text-purple-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-2xl transition-colors font-bold ${
                activeSection === "home" ? "text-purple-400" : "text-white hover:text-yellow-300"
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`text-2xl transition-colors font-bold ${
                activeSection === "services" ? "text-purple-400" : "text-white hover:text-yellow-300"
              }`}
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className={`text-2xl transition-colors font-bold ${
                activeSection === "portfolio" ? "text-purple-400" : "text-white hover:text-yellow-300"
              }`}
            >
              PORTFOLIO
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-2xl transition-colors font-bold ${
                activeSection === "about" ? "text-purple-400" : "text-white hover:text-yellow-300"
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-2xl transition-colors font-bold ${
                activeSection === "contact" ? "text-purple-400" : "text-white hover:text-yellow-300"
              }`}
            >
              CONTACT
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative z-10 px-4 py-20 lg:py-32 pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                This is Our Era
              </span>
              <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
                The Memory is
              </span>
              <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                You.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              We create unforgettable yearbooks that capture your precious moments with friends. Let's make your school
              memories last forever!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 text-lg font-black shadow-2xl border-2 border-gray-900 transform hover:scale-105 transition-all"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                onClick={() => scrollToSection("portfolio")}
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 text-lg font-black shadow-2xl border-2 border-gray-900 transform hover:scale-105 transition-all"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-700 font-medium">All the best choice come from us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Yearbook Design Card */}
            <div className="relative group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 h-[800px] overflow-hidden relative border-4 border-gray-900 shadow-2xl">
                {/* Decorative Elements - Moved HAPPY 2024 badge to bottom left */}
                <div className="absolute bottom-20 left-8 w-16 h-16 bg-cyan-300 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="text-center">
                    <div className="text-xs font-black text-orange-500">HAPPY</div>
                    <div className="text-xs font-black text-orange-500">2024</div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="text-white font-black text-lg transform -rotate-90 whitespace-nowrap drop-shadow-lg">
                    #BEHAPPYWITHYOURFRIENDS
                  </div>
                </div>

                {/* Geometric Patterns */}
                <div className="absolute bottom-20 right-8 w-8 h-20 bg-gradient-to-b from-purple-500 to-pink-500 rounded border-2 border-white"></div>
                <div className="absolute bottom-32 right-12 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">Yearbook Design</h3>
                  <p className="text-white text-lg mb-8 font-bold">All the best choice come from us</p>

                  {/* Carousel */}
                  <ServiceCarousel images={yearbookImages} title="Yearbook Design" />
                </div>

                {/* Bottom Hashtag */}
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="bg-white/30 rounded-full px-4 py-2 backdrop-blur-sm border-2 border-white">
                    <span className="text-white font-black">#BEHAPPYWITHYOURFRIENDS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photography Card */}
            <div className="relative group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-8 h-[800px] overflow-hidden relative border-4 border-gray-900 shadow-2xl">
                {/* Decorative Elements - Moved HAPPY 2024 badge to bottom left */}
                <div className="absolute bottom-20 left-8 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="text-center">
                    <div className="text-xs font-black text-purple-600">HAPPY</div>
                    <div className="text-xs font-black text-purple-600">2024</div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="text-white font-black text-lg transform -rotate-90 whitespace-nowrap drop-shadow-lg">
                    #BEHAPPYWITHYOURFRIENDS
                  </div>
                </div>

                {/* Geometric Patterns */}
                <div className="absolute bottom-20 right-8 w-8 h-20 bg-gradient-to-b from-orange-500 to-red-500 rounded border-2 border-white"></div>
                <div className="absolute bottom-32 right-12 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white"></div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-yellow-300 mb-4 drop-shadow-lg">Photography</h3>
                  <p className="text-white text-lg mb-8 font-bold">All the best choice come from us</p>

                  {/* Carousel */}
                  <ServiceCarousel images={photographyImages} title="Photography" />
                </div>

                {/* Bottom Hashtag */}
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="bg-white/30 rounded-full px-4 py-2 backdrop-blur-sm border-2 border-white">
                    <span className="text-white font-black">#BEHAPPYWITHYOURFRIENDS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Production Card */}
            {/* Video Production Card */}
            <div className="relative group transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-8 h-[800px] overflow-hidden relative border-4 border-gray-900 shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute bottom-20 left-8 w-16 h-16 bg-red-400 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="text-center">
                    <div className="text-xs font-black text-gray-800">HAPPY</div>
                    <div className="text-xs font-black text-gray-800">2024</div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <div className="text-white font-black text-lg transform -rotate-90 whitespace-nowrap drop-shadow-lg">
                    #BEHAPPYWITHYOURFRIENDS
                  </div>
                </div>
                {/* Geometric Patterns */}
                <div className="absolute bottom-20 right-8 w-8 h-20 bg-gradient-to-b from-pink-500 to-purple-500 rounded border-2 border-white"></div>
                <div className="absolute bottom-32 right-12 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black text-red-400 mb-4 drop-shadow-lg">Video</h3>
                  <p className="text-white text-lg mb-8 font-bold">All the best choice come from us</p>
                  {/* Video Carousel */}
                  <VideoCarousel videos={videoFiles} title="Video Production" />
                </div>
                {/* Bottom Hashtag */}
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="bg-white/30 rounded-full px-4 py-2 backdrop-blur-sm border-2 border-white">
                    <span className="text-white font-black">#BEHAPPYWITHYOURFRIENDS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Portfolio Section - Fixed centering */}
      <section id="portfolio" className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-[3rem] p-4 border-4 border-gray-900 shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-[2.5rem] p-8 border-2 border-white">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-orange-600 mb-4 drop-shadow-lg">Photo</h2>
                <p className="text-orange-700 text-xl font-bold">All the best choice come from us</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Left Column - 3 landscape images carousel */}
                <div className="space-y-4 flex flex-col justify-center">
                  <PortfolioCarousel
                    images={portfolioLeftTopImages}
                    title="Portfolio Left Top"
                    height="h-40"
                    autoAdvanceDelay={5000}
                  />
                  <PortfolioCarousel
                    images={portfolioLeftBottomImages}
                    title="Portfolio Left Bottom"
                    height="h-40"
                    autoAdvanceDelay={5000}
                  />
                </div>

                {/* Center Column - 4 portrait images carousel with moderate height - Fixed centering */}
                <div className="flex items-center justify-center">
                  <div className="w-full">
                    <PortfolioCarousel
                      images={portfolioCenterImages}
                      title="Portfolio Center Featured"
                      height="h-80"
                      autoAdvanceDelay={5000}
                    />
                  </div>
                </div>

                {/* Right Column - 3 landscape images carousel */}
                <div className="space-y-4 flex flex-col justify-center">
                  <PortfolioCarousel
                    images={portfolioRightTopImages}
                    title="Portfolio Right Top"
                    height="h-40"
                    autoAdvanceDelay={5000}
                  />
                  <PortfolioCarousel
                    images={portfolioRightBottomImages}
                    title="Portfolio Right Bottom"
                    height="h-40"
                    autoAdvanceDelay={5000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Stats Section */}
      <section id="about" className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              #BEHAPPYWITHYOURFRIENDS
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-pink-300/50 shadow-xl rounded-3xl transform hover:scale-105 transition-all"
              >
                <CardContent className="p-6 text-center rounded-3xl">
                  <div className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">{stat.number}</div>
                  <div className="text-xl md:text-2xl font-black text-yellow-300 mb-1 drop-shadow-lg">{stat.label}</div>
                  <div className="text-sm text-white font-bold">{stat.subtitle}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">
            Any Questions?
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-4 border-purple-500">
                <button
                  className="w-full py-6 flex justify-between items-center text-left hover:text-purple-600 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-xl md:text-2xl font-black text-gray-800">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="pb-6 text-gray-700 text-lg leading-relaxed font-medium">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Address
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-purple-600 mb-4">Jakarta Office</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    Jl. Sudirman No. 123, Jakarta Pusat
                    <br />
                    DKI Jakarta 10220
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-purple-600 mb-4">Bandung Office</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    Jl. Braga No. 45, Bandung
                    <br />
                    Jawa Barat 40111
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-purple-600 mb-4">Yogyakarta Office</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">
                    Jl. Malioboro No. 67, Yogyakarta
                    <br />
                    DI Yogyakarta 55213
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
                <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  Representative Marketing
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-black mb-2 text-purple-600">Jawa Timur</h4>
                    <h4 className="font-black mb-2 text-purple-600">Jawa Tengah</h4>
                    <h4 className="font-black mb-2 text-purple-600">Sumatera</h4>
                  </div>
                  <div>
                    <h4 className="font-black mb-2 text-purple-600">Kalimantan</h4>
                    <h4 className="font-black mb-2 text-purple-600">Sulawesi</h4>
                    <h4 className="font-black mb-2 text-purple-600">Bali-NTB</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Updated to show only Jakarta office */}
      <section id="contact" className="relative z-10 px-4 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Contact Our Admin
            </h2>
            <p className="text-xl text-gray-700 font-medium">Ready to help you from our office</p>
          </div>

          <div className="flex justify-center">
            {/* Jakarta Admin - Only one office now */}
            <div className="relative group transform hover:scale-105 transition-all duration-300 max-w-md w-full">
              <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                    <span className="text-2xl font-black text-white">HFP</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Happy Friends Project</h3>
                  <p className="text-purple-600 font-bold">Admin Pusat</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-200">
                    <h4 className="font-black text-purple-600 mb-2">📱 WhatsApp</h4>
                    <p className="text-gray-700 font-bold">+62 811-122-4478</p>
                    <p className="text-sm text-gray-600">Admin Happy Friends</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
                    <h4 className="font-black text-orange-600 mb-2">📞 Telepon</h4>
                    <p className="text-gray-700 font-bold">(021) 1234-5678</p>
                    <p className="text-sm text-gray-600">Senin - Jumat 9AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact CTA - Updated to only show WhatsApp */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl p-8 border-4 border-gray-900 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-lg">Need Quick Response?</h3>
              <p className="text-white text-lg mb-6 font-bold">Contact our admin directly for faster service!</p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 text-lg font-black shadow-2xl border-2 border-gray-900 transform hover:scale-105 transition-all"
                >
                  WhatsApp Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-12 border-t-4 border-gray-900 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hp-removebg-preview-mWbCO2m0mEnyTiYjULaSWk7YyKUTKs.png"
                alt="Happy Friends Project Logo"
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                HAPPY FRIENDS PROJECT
              </h3>
            </div>
            <p className="text-purple-600 font-black">#BEHAPPYWITHYOURFRIENDS</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <Link
              href="https://www.instagram.com/happyfriendsprjct/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors font-bold"
            >
              Instagram
            </Link>
            <button onClick={openWhatsApp} className="text-gray-700 hover:text-purple-600 transition-colors font-bold">
              WhatsApp
            </button>
            <Link
              href="https://www.tiktok.com/@happyfriendsprjct"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors font-bold"
            >
              TikTok
            </Link>
            <Link
              href="https://www.youtube.com/@happyfriendsproject4082"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-purple-600 transition-colors font-bold"
            >
              YouTube
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-gray-500 text-sm font-medium">© 2024 Happy Friends Project. All rights reserved.</p>
            <p className="text-gray-500 text-sm font-medium">
              Created By B<sup className="text-xs">2</sup>AN
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
