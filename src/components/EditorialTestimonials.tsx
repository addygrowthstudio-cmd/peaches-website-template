import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { mockProducts } from '../products-data';
import { Product } from '../types';

// High-quality asset imports
import serumCardImage from '../assets/images/serum_card_1780759261384.png';
import tonerCardImage from '../assets/images/toner_card_1780759276376.png';
import sunCardImage from '../assets/images/sun_protection_card_1780759290161.png';
import haircareCardImage from '../assets/images/haircare_card_1780759303152.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EditorialTestimonialsProps {
  onAddToCart: (product: Product, quantity: number, colorIdx: number) => void;
  settings: {
    colorText: string;
    colorAccent: string;
    colorBgSecondary: string;
    [key: string]: any;
  };
}

interface TestimonialData {
  name: string;
  label: string;
  rating: number;
  quote: string;
  avatar: string;
  productId: string;
}

const testimonials: TestimonialData[] = [
  {
    name: "SOPHIA ROSE",
    label: "Derm Approved Consumer — Dry Skin",
    rating: 5,
    quote: "My skin feels incredibly soft, hydrated, and looks more radiant than ever. The Peaches step program completely removed my acne bumps.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    productId: "super-retinol-vitamin-a",
  },
  {
    name: "MICHAEL NADER",
    label: "Verified Buyer — Active Athlete",
    rating: 5,
    quote: "The best moisturizer on the market! Lightweight, absorbs fast, and perfectly fits my dry base skin type. Highly recommend wave.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    productId: "cloud-whip-barrier-repair",
  },
  {
    name: "ELENA G.",
    label: "Skin Esthetician — Normal Skin",
    rating: 5,
    quote: "Simple, clean, and incredible results. Standard organic compound sourcing. My complexion faded significantly in under three weeks.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    productId: "glow-boost-vitamin-c",
  },
  {
    name: "CHARLOTTE K.",
    label: "Verified Buyer — Combination Skin",
    rating: 5,
    quote: "Visibly refined my pores and balanced my hydration levels within just a few days of use. A true lifesaver for combination skin.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    productId: "glow-remedy-hydrating-essence",
  },
  {
    name: "JONATHAN V.",
    label: "Verified Buyer — Tech Professional",
    rating: 5,
    quote: "An ultra-nourishing golden facial oil that leaves a beautiful non-greasy natural glow. It quickly restored my moisture barrier.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    productId: "golden-reset-radiance-oil",
  },
  {
    name: "ISABELLA M.",
    label: "Verified Buyer — Sensitive Skin",
    rating: 5,
    quote: "The peptide face lift serum literally sculpted my jawline and completely ironed out my dynamic frown lines! Absolute luxury in a bottle.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    productId: "peaches-peptide-serum",
  }
];

const getProductImage = (productId: string, fallbackImg: string): string => {
  if (productId === 'super-retinol-vitamin-a' || productId === 'cloud-whip-barrier-repair') return serumCardImage;
  if (productId === 'glow-remedy-hydrating-essence') return tonerCardImage;
  if (productId === 'overachiever-balm-cleanser') return haircareCardImage;
  if (productId === 'golden-reset-radiance-oil') return sunCardImage;
  return fallbackImg;
};

export const EditorialTestimonials: React.FC<EditorialTestimonialsProps> = ({
  onAddToCart,
  settings,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const leftHeadingRef = useRef<HTMLDivElement>(null);
  const rightHeadingRef = useRef<HTMLDivElement>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const cards = gsap.utils.toArray('.editorial-testimonial-card') as HTMLDivElement[];
    if (cards.length === 0) return;

    let ctx = gsap.context(() => {
      // Create ScrollTrigger linked timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth damping for a luxury floating feeling
          invalidateOnRefresh: true,
        }
      });

      // Subtle scaling and parallax tilt for side headings on scroll
      tl.fromTo('.testimonial-heading', 
        { opacity: 0.9, y: 0 },
        { opacity: 1, y: -20, duration: 1 },
        0
      );

      // Define responsive coordinates & customized speeds for each card
      // Card 0: Drifts up and slightly right
      tl.fromTo(cards[0],
        { y: '105vh', x: '-20px', rotation: -4 },
        { y: '-115vh', x: '20px', rotation: 3, ease: 'none' },
        0
      );

      // Card 1: Drifts up and left (different speed)
      tl.fromTo(cards[1],
        { y: '135vh', x: '35px', rotation: 3 },
        { y: '-105vh', x: '-25px', rotation: -2, ease: 'none' },
        0.05
      );

      // Card 2: Drifts up and right (slower speed)
      tl.fromTo(cards[2],
        { y: '165vh', x: '-40px', rotation: -3 },
        { y: '-125vh', x: '15px', rotation: 1, ease: 'none' },
        0.1
      );

      // Card 3: Drifts up and left (faster speed)
      tl.fromTo(cards[3],
        { y: '195vh', x: '30px', rotation: 2 },
        { y: '-95vh', x: '-30px', rotation: -3, ease: 'none' },
        0.15
      );

      // Card 4: Drifts up and right
      tl.fromTo(cards[4],
        { y: '225vh', x: '-15px', rotation: -2 },
        { y: '-135vh', x: '35px', rotation: 3, ease: 'none' },
        0.2
      );

      // Card 5: Drifts up and left (final card)
      tl.fromTo(cards[5],
        { y: '255vh', x: '25px', rotation: 4 },
        { y: '-110vh', x: '-15px', rotation: -1, ease: 'none' },
        0.25
      );

    }, scrollContainer);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleQuickAdd = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      onAddToCart(product, 1, 0);
      setAddedProductId(productId);
      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);
    }
  };

  return (
    <section 
      ref={scrollContainerRef}
      id="editorial-reviews-section"
      className="relative w-full h-[300vh] select-none"
      style={{ backgroundColor: settings.colorBg || '#FAF5F0' }}
    >
      {/* Sticky viewport container - handles pinning natively */}
      <div 
        ref={stickyContainerRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        
        {/* Fixed Side Headings Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full h-full">
            
            {/* Left Title */}
            <div 
              ref={leftHeadingRef}
              className="testimonial-heading absolute top-[8%] md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[8vw] text-center md:text-left font-heading font-semibold text-stone-900 tracking-tight text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] xl:text-[54px] w-[90%] md:w-auto max-w-[90vw] md:max-w-[30vw]"
              style={{
                lineHeight: '1.05',
                willChange: 'transform, opacity',
              }}
            >
              Don't just trust <span className="italic font-normal text-rose-800">our</span><br />words.
            </div>

            {/* Right Title */}
            <div 
              ref={rightHeadingRef}
              className="testimonial-heading absolute bottom-[8%] md:top-1/2 md:-translate-y-1/2 right-1/2 translate-x-1/2 md:translate-x-0 md:right-[8vw] text-center md:text-right font-heading font-semibold text-stone-900 tracking-tight text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] xl:text-[54px] w-[90%] md:w-auto max-w-[90vw] md:max-w-[30vw]"
              style={{
                lineHeight: '1.05',
                willChange: 'transform, opacity',
              }}
            >
              See what people<br /><span className="italic font-normal text-rose-800">are saying.</span>
            </div>

          </div>
        </div>

        {/* Floating Testimonial Cards Overlay Canvas */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full">
            {testimonials.map((test, idx) => {
              const matchedProduct = mockProducts.find(p => p.id === test.productId);
              if (!matchedProduct) return null;

              // Left offsets are designed to distribute cards elegantly across the screen on desktop,
              // while keeping them perfectly centered on mobile device layouts.
              const leftPositions = [
                'left-[5%] md:left-[23%] lg:left-[26%]',
                'left-[5%] md:left-[38%] lg:left-[43%]',
                'left-[5%] md:left-[20%] lg:left-[23%]',
                'left-[5%] md:left-[41%] lg:left-[45%]',
                'left-[5%] md:left-[22%] lg:left-[25%]',
                'left-[5%] md:left-[39%] lg:left-[42%]',
              ];

              return (
                <div
                  key={idx}
                  className={`editorial-testimonial-card absolute pointer-events-auto select-text will-change-transform ${leftPositions[idx]} w-[90%] md:w-[410px] lg:w-[440px]`}
                  style={{
                    position: 'absolute',
                    top: '0vh', // Initial positioning offset, GSAP handles animation
                  }}
                >
                  {/* Inner card container holds visual style and scale interaction */}
                  <div 
                    className="p-6 md:p-8 rounded-[24px] border bg-[#FDFBF7]/90 backdrop-blur-md flex flex-col justify-between transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(45,41,38,0.15)] shadow-[0_15px_45px_rgba(45,41,38,0.04)] border-stone-200/60"
                  >
                    {/* Customer Info Row */}
                    <div className="flex items-center gap-4 mb-5">
                      <img 
                        src={test.avatar} 
                        alt={test.name} 
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <p className="font-subheading font-bold text-stone-900 text-xs sm:text-sm tracking-wider uppercase">{test.name}</p>
                        <p className="font-mono text-[9px] text-stone-500 font-bold tracking-wider mt-0.5">{test.label}</p>
                      </div>
                    </div>

                    {/* Testimonial Rating & Quote */}
                    <div className="my-1 text-left">
                      <div className="flex text-amber-500 gap-0.5 mb-3 select-none">
                        {Array(test.rating).fill(null).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                        ))}
                      </div>
                      <p className="font-heading italic text-stone-950 text-[14px] sm:text-base md:text-[18px] leading-relaxed">
                        "{test.quote}"
                      </p>
                    </div>

                    {/* Inline Product Row */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-200/50">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getProductImage(test.productId, matchedProduct.images[0])} 
                          alt={matchedProduct.title} 
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-contain bg-white border border-stone-100 p-1"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-left">
                          <p className="font-mono text-[8px] uppercase tracking-widest text-rose-800 font-bold">Featured Product</p>
                          <p className="font-subheading font-bold text-stone-950 text-xs sm:text-sm leading-tight line-clamp-1">{matchedProduct.title}</p>
                          <p className="font-mono text-xs text-stone-600 mt-0.5 font-bold">{matchedProduct.price}</p>
                        </div>
                      </div>

                      <button
                        id={`review-quickadd-${test.productId}`}
                        className="w-9 h-9 rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-700 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm select-none"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuickAdd(test.productId);
                        }}
                        aria-label="Quick Add to Cart"
                      >
                        {addedProductId === test.productId ? (
                          <Check className="w-4 h-4 text-[#F2A183] stroke-[3]" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
