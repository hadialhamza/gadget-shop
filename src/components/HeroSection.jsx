"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: 1,
    tag: "Studio Quality Gear",
    title: "Create Masterpieces,",
    highlight: "Like a Pro.",
    description:
      "Professional grade audio and recording equipment for creators who demand the best. Elevate your content today.",
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80",
    alt: "Recording Setup",
  },
  {
    id: 2,
    tag: "Smart Living Tech",
    title: "Intelligence Meets,",
    highlight: "Style on Wrist.",
    description:
      "Stay connected and track your health with the latest smart wearables designed for modern life. Seamlessly integrated.",
    image: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80",
    alt: "Smart Watch",
  },
  {
    id: 3,
    tag: "Immersive Reality",
    title: "Dive Deeper Into,",
    highlight: "New Worlds.",
    description:
      "Experience the next generation of virtual reality with crystal clear optics and immersive audio. Reality redefined.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80",
    alt: "VR Headset",
  },
  {
    id: 4,
    tag: "Pure Sound Audio",
    title: "Experience Audio,",
    highlight: "That Moves You.",
    description:
      "Rediscover your favorite music with high-fidelity audio gear engineered for pure sound isolation and depth.",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80",
    alt: "AirPod Max",
  },
  {
    id: 5,
    tag: "Ultimate Gaming",
    title: "Level Up Your,",
    highlight: "Gaming Skills.",
    description:
      "High-performance peripherals designed for competitive gaming and streaming. Dominate the leaderboard.",
    image: "https://images.unsplash.com/photo-1595087873528-1fe582a3b302?q=80",
    alt: "Gaming Setup",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background pt-10 pb-22 lg:pt-16">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text & Animation */}
          <div className="z-10 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-8 text-center lg:text-left"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{heroSlides[activeIndex].tag}</span>
                </motion.div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                  {heroSlides[activeIndex].title} <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 via-cyan-500 to-blue-500 bg-size-[200%_auto]">
                    {heroSlides[activeIndex].highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="subtitle">
                  {heroSlides[activeIndex].description}
                </p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button
                    className="btn-primary-custom group py-5 px-8"
                    asChild
                  >
                    <Link href="/products">
                      <span className="flex items-center justify-center gap-2">
                        Shop Now{" "}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>

                  <Button className="btn-outline-custom py-4.5 px-8" asChild>
                    <Link href="/about">
                      <span>Explore</span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Content - Swiper Slider with Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 p-[3px] rounded-[2.5rem] bg-linear-to-r from-blue-500 via-cyan-400 to-blue-600 shadow-2xl">
              <div className="rounded-[2.3rem] overflow-hidden bg-background w-full h-[400px] md:h-[600px]">
                <Swiper
                  modules={[Autoplay, EffectFade, Pagination]}
                  speed={1500}
                  effect="fade"
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-full h-full"
                >
                  {heroSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-tr from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-40 animate-pulse delay-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
