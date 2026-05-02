"use client";

import { motion, AnimatePresence, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Menu, X } from "lucide-react";

function Hotspot({ top, left, title, description }: { top: number; left: number; title: string; description: string; }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute z-50" style={{ top: `${top}%`, left: `${left}%` }}>
      <button
        aria-label={`Info about ${title}`}
        className="relative h-8 w-8 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="absolute h-full w-full bg-blue-500/30 rounded-full animate-ping" />
        <div className="h-3 w-3 bg-white rounded-full shadow-[0_0_10px_#fff] z-10 border border-blue-500" />
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 p-5 bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-white"
            >
              <h4 className="font-bold text-xs uppercase tracking-widest text-blue-400 mb-2">{title}</h4>
              <p className="text-sm text-gray-300">{description}</p>
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
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const mouseX = useMotionValue(0);
  const rotateX = useTransform(mouseX, [-500, 500], [12, -12]);
  const rotateY = useTransform(mouseX, [-500, 500], [-12, 12]);

 const shoes = [
    { name: "Phantom Black", price: "$240", img: "img1.jpg", bg:"img1.jpg"  },
    { name: "Neon Volt", price: "$260", img: "img2.jpg", bg:"img2.jpg" },
    { name: "Arctic White", price: "$220", img: "img3.jpg",bg:"img3.jpg" },
    { name: "Midnight Blue", price: "$250", img: "img4.jpg", bg:"img4.jpg" },
    { name: "Crimson Red", price: "$245", img: "img5.jpg", bg:"img5.jpg" },
    { name: "Cyber Grey", price: "$270", img: "img6.jpg", bg:"img6.jpg" },
    { name: "Phantom Black", price: "$240", img: "img7.jpg", bg:"img7.jpg" },
    { name: "Neon Volt", price: "$260", img: "img8.jpg", bg:"img8.jpg" },
    { name: "Arctic White", price: "$220", img: "img9.jpg", bg:"img9.jpg" },
    { name: "Midnight Blue", price: "$250", img: "img10.jpg", bg:"img10.jpg" },
    { name: "Crimson Red", price: "$245", img: "img11.jpg", bg:"img11.jpg" },
    { name: "Cyber Grey", price: "$270", img: "img12.jpg", bg:"img12.jpg" }
    
  ];

  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    const newItem = { ...shoes[currentIndex], size: selectedSize };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % shoes.length);
  }, [shoes.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shoes.length) % shoes.length);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!mounted) return null;

  return (
    <main className="relative bg-[#050505] text-white overflow-x-hidden" lang="en">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 bg-blue-600 px-6 py-3 rounded-full z-100">
        Skip to main content
      </a>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center" onMouseMove={handleMouseMove} id="main-content">
        <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 flex justify-between items-center transition-all ${isScrolled ? 'bg-black/95 backdrop-blur-md' : ''}`} aria-label="Main navigation">
          <div className="text-2xl font-black tracking-tighter italic">SNEAK<span className="text-blue-600">ER.</span></div>
          
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-blue-500">Home</a>
            <a href="#premium-collection" className="hover:text-blue-500">Collection</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
          </div>


          <div className="flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} aria-label={`Cart (${cartItems.length} items)`} className="relative p-3 focus:ring-2 focus:ring-blue-500 rounded-full">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartItems.length}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

{/* Parallax Background Label */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h1
          style={{ y: yParallax }}
          className="text-[23vw] md:text-[23vw] h-150 font-black text-blue-600 italic tracking-tighter opacity-[0.] select-none"
        >
          SNEAKER
        </motion.h1>
      </div>

        <div className="relative px-6 w-full max-w-md pt-20">
          <motion.div style={{ rotateX, rotateY }}>
            <img src="/modal.png" alt="Premium performance sneaker" className="w-full drop-shadow-2xl" />
            <Hotspot top={58} left={48} title="Dynamic Ankle" description="Engineered for 360-degree range of motion with anti-roll support." />
            <Hotspot top={20} left={25} title="Cloud Foam" description="Proprietary nitrogen-infused midsole for maximum energy return." />
            <Hotspot top={40} left={65} title="Carbon Grip" description="Diamond-cut traction pattern designed for high-speed cuts." />
          </motion.div>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:sticky lg:top-24">
            <div className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
              <img src={shoes[currentIndex].img} alt={`${shoes[currentIndex].name} sneaker`} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">{shoes[currentIndex].name}</h1>
              <p className="text-3xl text-blue-500 mt-2">{shoes[currentIndex].price}</p>
            </div>

            <div>
              <p className="uppercase text-xs tracking-widest mb-4 text-gray-400">Select Size</p>
              <div className="grid grid-cols-6 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 border rounded-2xl text-sm font-medium transition-all hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedSize === size ? 'border-blue-500 bg-blue-500/10' : 'border-white/20'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <motion.button onClick={addToCart}
             disabled={status !== "idle"}
          whileHover={status === "idle" ? { scale: 1.05 } : {}}
          whileTap={status === "idle" ? { scale: 0.95 } : {}}
            className="w-full py-6 bg-white text-black hover:bg-blue-500 hover:text-white font-black uppercase hover:cursor-pointer tracking-widest rounded-2xl text-lg active:scale-[0.97]">
              ADD TO BAG
            </motion.button>
          </div>
        </div>
      </section>

{/* SECTION 2: FEATURE CARDS */}
    <section className="relative h-100 w-full py-12 px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { title: "Ultra Light", desc: "Weighing only 250g for maximum agility.", delay: 0.2, },
        { title: "Breathable", desc: "Multi-layered mesh for climate control.", delay: 0.4, },
        { title: "Responsive", desc: "Energy return system like you've never felt.", delay: 0.6 }
      ].map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: feature.delay }}
          className="p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all cursor-default"
        >
          <div className="h-1 w-12 bg-red-500 mb-12" />
          <h3 className="text-2xl font-bold mb-4 uppercase text-blue-500 tracking-tighter">{feature.title}</h3>
          <p className="text-white z-50 text-2xl leading-relaxed font-bold">{feature.desc}</p>
        </motion.div>
      ))}
    </section>

    {/* PREMIUM COLLECTION CAROUSEL */}
<section id="premium-collection" className="relative py-20 bg-black px-6 overflow-hidden">
  
  {/* DYNAMIC BACKGROUND LAYER */}
  <div className="absolute inset-0 z-0">
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.3, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Fallback to a placeholder if your local img files are missing */}
        <img
          src={shoes[currentIndex % shoes.length].img.startsWith('img') 
            ? shoes[currentIndex % shoes.length].img 
            : `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000`
          }
          className="w-full h-full object-cover grayscale"
          alt="Background"
        />
        {/* Corrected Tailwind Gradient Syntax */}
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black" />
      </motion.div>
    </AnimatePresence>
  </div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex justify-between items-end mb-10">
      <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
        <span className="text-blue-700">Premium </span> Collection
      </h2>
      <div className="flex gap-4">
        <button onClick={prevSlide} className="p-4 border border-white/20 rounded-full hover:cursor-pointer hover:bg-white/10 transition-all"><ChevronLeft size={24} /></button>
        <button onClick={nextSlide} className="p-4 border border-white/20 rounded-full hover:cursor-pointer hover:bg-white/10 transition-all"><ChevronRight size={24} /></button>
      </div>
    </div>

    <div className="relative">
      <motion.div
        // We move by the exact width of the items (50% per item)
        animate={{ x: `-${currentIndex * 50}%` }} 
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="flex"
      >
        {shoes.map((item, i) => (
          <div key={i} className="w-1/2 md:w-1/3 shrink-0 px-3">
            <div className="aspect-square bg-zinc-900 rounded-3xl overflow-hidden mb-6 border border-white/10">
              <img 
                src={item.img.startsWith('http') ? item.img : `https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000`} 
                alt={item.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
            <p className="text-blue-500 text-lg font-medium">{item.price}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
</section>

      {/* WAITLIST */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-blue-500 mb-12">RUN THE FUTURE</h2>
        
        <form onSubmit={handleWaitlistSubmit} className="w-full max-w-md space-y-6">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-2xl px-8 py-6 text-base focus:outline-none focus:border-blue-500"
            required
          />
         <motion.button

          type="submit"

          disabled={status !== "idle"}

          whileHover={status === "idle" ? { scale: 1.05 } : {}}

          whileTap={status === "idle" ? { scale: 0.95 } : {}}

          className={`relative px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all duration-500 overflow-hidden min-w-45

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
      </section>



<section className="pt-8 gap-2 pb-8 border-t border-white/5">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="text-xl font-black tracking-tighter italic">SNEAK<span className="text-blue-600">ER.</span></div>
      <footer className="py-2 px-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">© Developed by Mohammed Girei 2026 Sneaker Inc. All rights reserved.</div>
      </footer>
    </div>
</section>

      {/* Bottom Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900/95 backdrop-blur-2xl border border-white/10 py-4 px-8 rounded-3xl flex justify-between z-50">
        <a href="#" className="text-xs font-bold uppercase tracking-widest">Shop</a>
        <a href="#premium-collection" className="text-xs font-bold uppercase tracking-widest text-blue-500">Drops</a>
        <a href="#" className="text-xs font-bold uppercase tracking-widest">Contact</a>
      </div>
    </main>
  );
}