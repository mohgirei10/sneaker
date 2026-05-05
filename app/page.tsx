"use client";

import { motion, AnimatePresence, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useCallback, useRef, Key, ReactNode } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Menu, X, Eye, Info, Trash2 } from "lucide-react";
import { 
  SiInstagram, 
  SiX, 
  SiGithub, 
  SiFacebook 
} from "react-icons/si";
import Image from 'next/image';
import { Variants } from "framer-motion"; // Add this to your imports

// 1. Explicitly type as Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      // The Bezier curve needs to be a tuple or explicitly recognized
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

// 2. Or use "as const" for the entire object
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.3 
    }
  }
} as const;

// --- TYPES ---
type Shoe = {
  size: ReactNode;
  id: Key | null | undefined; name: string; price: string; img: string 
};
type CartItem = Shoe & { id: string; size: string };

// --- COMPONENTS ---
function Hotspot({ top, left, title, description }: { top: number; left: number; title: string; description: string; }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute z-40" style={{ top: `${top}%`, left: `${left}%` }}>
      <button
        className="relative h-6 w-6 md:h-8 md:w-8 flex items-center justify-center cursor-pointer focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="absolute h-full w-full bg-blue-500/30 rounded-full animate-ping" />
        <motion.div 
          animate={{ scale: isOpen ? 1.2 : 1 }}
          className="h-2 w-2 md:h-3 md:w-3 bg-white rounded-full shadow-[0_0_15px_#fff] z-10 border border-blue-500" 
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: 10, x: "-50%" }}
              className="absolute bottom-10 left-1/2 w-48 md:w-64 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-white pointer-events-none"
            >
              <h4 className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-blue-400 mb-1">{title}</h4>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState<Shoe | null>(null);

const [copied, setCopied] = useState(false);


  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();
  
  // Smoother Spring Physics for Parallax
  const smoothY = useSpring(useTransform(scrollY, [0, 1000], [0, 150]), { stiffness: 100, damping: 30 });
  const mouseX = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseX, [-500, 500], [7, -7]), { stiffness: 50, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-7, 7]), { stiffness: 50, damping: 20 });

  const socialLinks = [
  { id: 1, name: "Instagram", icon: <SiInstagram />, link: "https://instagram.com/yourhandle", color: "#E1306C" },
  { id: 2, name: "X", icon: <SiX />, link: "https://x.com/yourhandle", color: "#FFFFFF" },
  { id: 4, name: "GitHub", icon: <SiGithub />, link: "https://github.com/yourhandle", color: "#2ea44f" },
  { id: 5, name: "Facebook", icon: <SiFacebook />, link: "https://facebook.com/yourhandle", color: "#1877F2" },
];

  const shoes: Shoe[] = [
      {
        name: "Phantom Black", price: "$240", img: "img1.jpg",
        id: 1,
        size: undefined
      },

    {
      name: "Neon Volt", price: "$260", img: "img11.jpg",
      id: 2,
      size: undefined
    },

    {
      name: "Arctic White", price: "$220", img: "img4.jpg",
      id: 3,
      size: undefined
    },

    {
      name: "Midnight Blue", price: "$250", img: "img12.jpg",
      id: 4,
      size: undefined
    },

    {
      name: "Crimson Red", price: "$245", img: "img7.jpg",
      id: 5,
      size: undefined
    },

    {
      name: "Cyber Grey", price: "$270", img: "img9.jpg",
      id: 6,
      size: undefined
    },

    {
      name: "Desert Storm", price: "$240", img: "img6.jpg",
      id: 7,
      size: undefined
    },

    {
      name: "White Red", price: "$260", img: "img8.jpg",
      id: 8,
      size: undefined
    },

    {
      name: "Ywllow White", price: "$220", img: "img2.jpg",
      id: 9,
      size: undefined
    },

    {
      name: "Brown White ", price: "$250", img: "img3.jpg",
      id: 10,
      size: undefined
    },

    {
      name: "Cindy Peach ", price: "$245", img: "img5.jpg",
      id: 11,
      size: undefined
    },

    {
      name: "Greench Lemon", price: "$270", img: "img10.jpg",
      id: 12,
      size: undefined
    }
  ];

  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

  const nextSlide = useCallback(() => setCurrentIndex((prev) => (prev + 1) % shoes.length), [shoes.length]);
  const prevSlide = () => { setCurrentIndex((prev) => (prev - 1 + shoes.length) % shoes.length); resetAutoSlide(); };
  const startAutoSlide = useCallback(() => { autoSlideTimer.current = setInterval(nextSlide, 5000); }, [nextSlide]);
  const resetAutoSlide = useCallback(() => { if (autoSlideTimer.current) clearInterval(autoSlideTimer.current); startAutoSlide(); }, [startAutoSlide]);

  const addToCart = (shoe: Shoe) => {
    if (!selectedSize) return;
    setCartItems([...cartItems, { ...shoe, size: selectedSize, id: Math.random().toString(36).substr(2, 9) }]);
    setIsCartOpen(true);
    setSelectedSize(null);
    setSelectedQuickView(null);
  };

  useEffect(() => { setMounted(true); startAutoSlide(); }, [startAutoSlide]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const copyToClipboard = () => {
    navigator.clipboard.writeText("amgtech1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;


  return (
    <main className="relative bg-[#050505] text-white overflow-x-hidden selection:bg-blue-600/40">
      
      {/* 1. MOBILE MENU - STAGGERED LINKS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl p-8 flex flex-col justify-center items-center md:hidden"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8"><X size={32} /></button>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-8">
              {['Home', 'Collection', 'Contact'].map(item => (
                <motion.a 
                  variants={fadeUp} key={item} href="#" 
                  className="text-5xl font-black italic tracking-tighter hover:text-blue-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CART SIDEBAR - SMOOTH SLIDE */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 z-120 p-8 border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic tracking-tighter">BAG ({cartItems.length})</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-6">
                <AnimatePresence mode="popLayout">
                     {shoes.map((item, idx) => (  
                    <motion.div 
                      layout 
                      key={idx} // Change from item.id to idx
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 border-b border-white/5 pb-6"
                    >
                      <Image 
                      src={`/${item.img}`} 
                      alt={item.name}
                      fill // This makes it fill the parent container
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-w-768px) 80vw, 33vw" // Tells browser which size to download
                      priority={idx < 3} // Only load the first 3 images immediately
  />
                        <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-blue-500 text-sm">{item.price} — Size {item.size}</p>
                      </div>
                      <button onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))} className="text-zinc-500 hover:text-red-500"><Trash2 size={18}/></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {cartItems.length > 0 && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl">Checkout Now</motion.button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. NAVIGATION - FADE DOWN */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter italic">SNEAK<span className="text-blue-600">ER.</span></div>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {['Home', 'Collection', 'Contact'].map(link => (
              <a key={link} href="#" className="hover:text-blue-500 transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-blue-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </motion.span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden"><Menu size={24} /></button>
          </div>
        </div>
      </motion.nav>

      {/* 4. HERO SECTION - ASSEMBLING ANIMATION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20" onMouseMove={(e) => mouseX.set(e.clientX - window.innerWidth / 2)}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.h1 
            style={{ y: smoothY }}
            initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[28vw] font-black text-blue-600/10 italic tracking-tighter select-none whitespace-nowrap"
          >
            SNEAKER
          </motion.h1>
        </div>
        
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          initial={{ opacity: 0, y: 50, rotateX: 20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full max-w-[320px] md:max-w-md px-6 z-10 transform-gpu"
        >
           <Image 
               src="/modal.png" 
               alt="Hero Sneaker" 
               width={500} 
               height={500} 
               priority 
               className="w-full drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)]"/>       
          <Hotspot top={55} left={45} title="Dynamic Ankle" description="Engineered for 360-degree range of motion." />
          <Hotspot top={25} left={30} title="Cloud Foam" description="Nitrogen-infused midsole for max energy." />
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="mt-12 text-center z-10 px-6"
        >
          <motion.p variants={fadeUp} className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase mb-4">New Era of Performance</motion.p>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-8"><span className="text-blue-600">SPEED </span> DEFINED.</motion.h2>
          <motion.button 
            variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black font-black rounded-full uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-colors shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:cursor-pointer hover:shadow-[0_0_35px_rgba(37,99,235,0.8)] duration-300"
          >
            Shop the drop
          </motion.button>
        </motion.div>
      </section>

      {/* 5. PREMIUM COLLECTION - SCROLL REVEAL */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
        id="collection" className="py-24 bg-black border-y border-white/5 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none"><span className="text-blue-600 block md:inline">Premium</span> Collection</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-4">Auto-cycling newest drops</p>
            </div>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-4 border border-white/10 rounded-full hover:cursor-pointer hover:bg-white/5 transition-all"><ChevronLeft size={20} /></button>
              <button onClick={() => { nextSlide(); resetAutoSlide(); }} className="p-4 border hover:cursor-pointer border-white/10 rounded-full hover:bg-white/5 transition-all"><ChevronRight size={20} /></button>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              animate={{ x: `-${currentIndex * (mounted && window.innerWidth < 768 ? 85 : 33.33)}%` }} 
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="flex gap-4 md:gap-8"
              onMouseEnter={() => autoSlideTimer.current && clearInterval(autoSlideTimer.current)}
              onMouseLeave={startAutoSlide}
            >
              {shoes.map((item, i) => (
                <motion.div 
                  variants={fadeUp} key={i} className="w-[80%] md:w-[calc(33.33%-1.5rem)] shrink-0 group"
                >
                  <div className="aspect-square bg-zinc-900 rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 relative">
                    <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} src={item.img} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                      <button onClick={() => setSelectedQuickView(item)} className="bg-white text-black p-4 rounded-full flex items-center gap-2 hover:cursor-pointer font-bold uppercase text-[10px] tracking-widest transform scale-90 group-hover:scale-100 transition-all hover:bg-blue-600 hover:text-white">
                        <Eye size={16} />View
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="text-xl font-bold italic tracking-tight">{item.name}</h3>
                      <p className="text-blue-500 font-bold mt-1">{item.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* QUICK VIEW MODAL - SHARED FEEL */}
      <AnimatePresence>
        {selectedQuickView && (
          <div className="fixed inset-0 z-130 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedQuickView(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-zinc-900 w-full max-w-4xl rounded-[2.5rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              <button onClick={() => setSelectedQuickView(null)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-white hover:text-black transition-colors"><X size={20}/></button>
              <img src={selectedQuickView.img} className="w-full md:w-1/2 aspect-square object-cover" alt="" />
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-4xl font-black italic tracking-tighter mb-4">{selectedQuickView.name}</h2>
                <p className="text-zinc-500 mb-8 text-sm">Experience peak performance with our latest silhouette. Featuring high-rebound cushioning and a breathable upper.</p>
                <div className="grid grid-cols-3 gap-2 mb-8">
                  {sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`py-3 rounded-xl border text-xs font-bold transition-all ${selectedSize === s ? 'bg-blue-600 border-blue-600 scale-105' : 'border-white/10 hover:border-white/30'}`}>{s}</button>
                  ))}
                </div>
                <button onClick={() => addToCart(selectedQuickView)} className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50" disabled={!selectedSize}>
                  {selectedSize ? `Add to Bag • ${selectedQuickView.price}` : 'Select Size'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

{/* SECTION 2: FEATURE CARDS */}
<section className="relative w-full py-16 px-6 md:px-12 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
    {[
      { 
        title: "Ultra Light", 
        desc: "Weighing only 250g for maximum agility.", 
        delay: 0.1, 
        accent: "bg-red-500" 
      },
      { 
        title: "Breathable", 
        desc: "Multi-layered mesh for climate control.", 
        delay: 0.2, 
        accent: "bg-blue-500" 
      },
      { 
        title: "Responsive", 
        desc: "Energy return system like you've never felt.", 
        delay: 0.3, 
        accent: "bg-green-500" 
      }
    ].map((feature, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.8, 
          delay: feature.delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        whileHover={{ y: -5 }}
        className="relative group p-8 md:p-10 bg-white/3 border border-white/10 rounded-[2.5rem] backdrop-blur-md overflow-hidden transition-colors hover:bg-white/[0.07]"
      >
        {/* Subtle Gradient Glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/10 blur-[50px] group-hover:bg-blue-600/20 transition-all" />

        {/* Decorative Accent Bar */}
        <div className={`h-1 w-10 md:w-12 ${feature.accent} mb-8 rounded-full`} />
        
        <h3 className="text-sm md:text-xs font-black uppercase text-blue-500 tracking-[0.2em] mb-3">
          {feature.title}
        </h3>
        
        <p className="text-white text-xl md:text-2xl leading-tight font-bold tracking-tight italic">
          {feature.desc}
        </p>

        {/* Mobile Touch Indicator (only visible on mobile) */}
        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">
          <span>Explore Tech</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </motion.div>
    ))}
  </div>
</section>

      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
        className="py-32 px-6 flex flex-col items-center text-center"
      >
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic mb-12">RUN <span className="text-blue-600">THE</span> FUTURE.</h2>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault(); 
    setStatus('loading'); 
    setTimeout(() => setStatus('success'), 2000); 
  }} className="w-full max-w-md space-y-4">
          <input 
            type="email" required placeholder="EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-700"
          />
        <motion.button

          type="submit"

          disabled={status !== "idle"}

          whileHover={status === "idle" ? { scale: 1.05 } : {}}

          whileTap={status === "idle" ? { scale: 0.95 } : {}}

          className={`relative px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all duration-500 overflow-hidden hover:cursor-pointer min-w-45 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.8)]

        ${status === "success" ? "bg-green-500 text-white" : "bg-white text-black hover:bg-blue-500 hover:text-white"}

        ${status === "loading" ? "opacity-70 cursor-wait" : ""}

      `}

        >

          <AnimatePresence mode="wait">

            {status === "idle" && (

              <motion.span

                key="idle"

                initial={{ opacity: 0, y: 10 }}

                animate={{ opacity: 1, y: 0 }}

                exit={{ opacity: 0, y: -10 }}

              >

                Join Waitlist

              </motion.span>

            )}

            {status === "loading" && (

              <motion.span

                key="loading"

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                className="flex items-center justify-center gap-2"

              >

                <div className="h-2 w-2 bg-black animate-bounce rounded-full" />

                <div className="h-2 w-2 bg-black animate-bounce [animation-delay:-0.15s] rounded-full" />

                <div className="h-2 w-2 bg-black animate-bounce [animation-delay:-0.3s] rounded-full" />

              </motion.span>

            )}

            {status === "success" && (

              <motion.span

                key="success"

                initial={{ opacity: 0, scale: 0.5 }}

                animate={{ opacity: 1, scale: 1 }}

                className="flex items-center gap-2"

              >

                Got It! ✓

              </motion.span>

            )}

          </AnimatePresence>

        </motion.button>
        </form>
      </motion.section>

{/* CONTACT SECTION */}
<section id="contact" className="py-20 md:py-32 px-6 border-t border-white/5 bg-[#080808] overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
      
      {/* Left Side: Big Text */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-left"
      >
        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-6 leading-none">
          LET'S <span className="text-blue-600">TALK.</span>
        </h2>
        <p className="text-zinc-500 text-base md:text-lg max-w-sm font-medium leading-relaxed">
          Open for collaborations, custom drops, and high-performance engineering inquiries.
        </p>
      </motion.div>

      {/* Right Side: Interaction Hub */}
      <div className="flex flex-col gap-8 w-full">
        
        {/* Social Icons Grid */}
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                color: social.color,
              }}
              whileTap={{ scale: 0.9 }}
              className="aspect-square flex items-center justify-center bg-white/3 border border-white/5 rounded-2xl text-white/40 text-2xl md:text-3xl transition-all duration-300 hover:border-white/20"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* The "Master" Email Button */}
        <motion.button
          onClick={copyToClipboard}
          className="w-full p-5 md:p-10 bg-blue-600 rounded-4xl flex flex-col items-center justify-center group relative overflow-hidden shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.4)] hover:cursor-pointer transition-all duration-500"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Subtle Glow Layer */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] z-10">
            {copied ? "Email Copied!" : "Drop a Message"}
          </span>
          <span className="text-white/70 text-xs md:text-sm font-bold z-10 tracking-tight">
            {copied ? "Ready to paste" : ""}
          </span>

          {/* Animated background flash on copy */}
          <AnimatePresence>
            {copied && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-green-500 flex items-center justify-center z-20"
              >
                <span className="font-black italic tracking-tighter text-white text-xl">COPIED ✓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Availability Badge */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
            Currently accepting new projects
          </span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="pt-10 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter italic">SNEAK<span className="text-blue-600">ER.</span></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 text-center">© 2026 Sneaker Inc. Developed by Mohammed Girei</p>
        </div>
      </footer>

    </main>
  );
}