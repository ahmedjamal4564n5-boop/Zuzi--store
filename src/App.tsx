import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  ArrowRight,
  Check,
  ShieldCheck,
  Award,
  Leaf,
  ChevronRight,
  ChevronLeft,
  X,
  Mail,
  Phone,
  MapPin,
  Copy,
  Eye,
  Search,
  Menu,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  ShoppingBag as BagIcon,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Types
interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  tag?: string;
  skinType?: string[];
  concern?: string[];
}

// Product Database
const PRODUCTS: Product[] = [
  {
    id: 'rose-gold-elixir',
    title: 'Rose Gold Radiance Elixir',
    category: 'Serums',
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.pexels.com/photos/13516790/pexels-photo-13516790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A luxurious face oil infused with 24k gold flakes and cold-pressed rosehip extract to deeply hydrate, brighten, and firm the skin. Reflects light for an instant, natural glass-skin finish.',
    benefits: [
      'Deeply hydrates and locks in skin moisture',
      'Infused with real 24k gold flakes for cellular radiance',
      'Fades dark spots and hyperpigmentation',
      'Improves skin elasticity and reduces fine lines'
    ],
    ingredients: ['24k Gold Flakes', 'Organic Rosehip Seed Oil', 'Squalane (derived from olives)', 'Vitamin E (Tocopherol)', 'Coenzyme Q10'],
    howToUse: 'Apply 2-3 drops to a clean face and neck morning and night. Press gently into the skin in upward circular motions. Can be mixed with foundation for an extra dewy glow.',
    tag: 'Best Seller',
    skinType: ['Dry', 'Combination', 'Sensitive'],
    concern: ['Brightening & Anti-Aging', 'Hydration & Plumping']
  },
  {
    id: 'nectar-cream',
    title: 'Nectar Infusion Cream',
    category: 'Skincare',
    price: 54.00,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.pexels.com/photos/7670737/pexels-photo-7670737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A rich, whip-textured daily moisturizer that locks in 72-hour moisture, restoring elasticity and youthfulness. Formulated with botanical peptides and barrier-supporting ceramides.',
    benefits: [
      'Provides 72-hour deep, non-greasy hydration',
      'Strengthens the skin barrier against environmental stressors',
      'Visibly plumps skin to smooth fine lines',
      'Calms redness and dry patches instantly'
    ],
    ingredients: ['Ceramide NP', 'Triple Peptide Complex', 'Hyaluronic Acid', 'Shea Butter', 'Centella Asiatica'],
    howToUse: 'Warm a dime-sized amount between fingertips and smooth gently over face and neck. Use as the final step of your skincare routine in the morning and evening.',
    tag: 'Award Winner',
    skinType: ['Dry', 'Sensitive', 'Combination'],
    concern: ['Hydration & Plumping', 'Calming & Reducing Redness']
  },
  {
    id: 'lip-souffle',
    title: 'Velvet Petal Lip Soufflé',
    category: 'Cosmetics',
    price: 32.00,
    rating: 4.7,
    reviewsCount: 215,
    image: 'https://images.pexels.com/photos/16378446/pexels-photo-16378446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A weightless, whipped matte liquid lipstick that hydrates like a balm while delivering high-pigment, transfer-proof rose pink color. Petal-soft texture that never dries out lips.',
    benefits: [
      'Ultra-pigmented, buildable color payoff',
      'Comfortable 12-hour wear that does not smudge',
      'Infused with jojoba oil to keep lips soft and plump',
      'Blurring finish that softens lip lines'
    ],
    ingredients: ['Jojoba Seed Oil', 'Rose Extract', 'Vitamin E', 'Shea Butter Ester', 'Natural Pigments'],
    howToUse: 'Define lips with the custom teardrop applicator, then fill in. Blend outwards with fingers for a soft-focus bitten look, or layer for full impact drama.',
    tag: 'Trending',
    skinType: ['Dry', 'Oily', 'Sensitive', 'Combination'],
    concern: ['Brightening & Anti-Aging']
  },
  {
    id: 'gilded-glow',
    title: 'Gilded Glow Liquid Highlighter',
    category: 'Cosmetics',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 87,
    image: 'https://images.pexels.com/photos/13516791/pexels-photo-13516791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A multi-use liquid gold highlighter that blends seamlessly into the skin for a lit-from-within luxury radiance. Features micro-fine pearl pigments and soothing botanical extracts.',
    benefits: [
      'Creates a natural, high-shine wet look without glitter particles',
      'Easily mixable with foundation, primer, or body lotion',
      'Hydrating formula that does not settle into pores',
      'Long-lasting formula that locks in place'
    ],
    ingredients: ['Micro-fine Gold Pearls', 'Coconut Alkanes', 'Aloe Vera Juice', 'Green Tea Extract', 'Glycerin'],
    howToUse: 'Dab 1-2 drops onto the high points of the face (cheekbones, brow bones, bridge of the nose, cupid\'s bow) and blend with fingers or a damp beauty sponge.',
    tag: 'Must Have',
    skinType: ['Dry', 'Oily', 'Sensitive', 'Combination'],
    concern: ['Brightening & Anti-Aging', 'Hydration & Plumping']
  },
  {
    id: 'celestial-droplet',
    title: 'Celestial Droplet Night Serum',
    category: 'Serums',
    price: 72.00,
    rating: 5.0,
    reviewsCount: 64,
    image: 'https://images.pexels.com/photos/6167866/pexels-photo-6167866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'An overnight resurfacing and repairing serum that gently exfoliates dull cells while stimulating cellular turnover. Wake up to remarkably smooth, even-toned, and youthful skin.',
    benefits: [
      'Gently resurfaces skin texture without peeling or irritation',
      'Improves cellular turnover for fresh skin cells',
      'Refines pores and balances oil production',
      'Reduces the appearance of fine lines and age spots'
    ],
    ingredients: ['Encapsulated Retinol 1%', 'Niacinamide 5%', 'Licorice Root Extract', 'Squalane', 'Allantoin'],
    howToUse: 'Apply 2 drops to clean, dry skin in the evening. Follow with your favorite moisturizer. Always wear sunscreen during the day when using retinol products.',
    tag: 'New Release',
    skinType: ['Oily', 'Combination', 'Dry'],
    concern: ['Brightening & Anti-Aging', 'Pore Refining & Detox']
  },
  {
    id: 'earthy-clay-mask',
    title: 'Earthy Clay Detox Mask',
    category: 'Self-Care',
    price: 45.00,
    rating: 4.6,
    reviewsCount: 112,
    image: 'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A pore-refining French pink clay mask that extracts toxins, impurities, and excess sebum while soothing redness, replenishing moisture, and calming irritation.',
    benefits: [
      'Deeply cleanses pores and reduces blackheads',
      'Gently exfoliates dead skin cells with rose flower powder',
      'Soothes redness, inflammation, and blemish-prone areas',
      'Restores skin softness and refines texture'
    ],
    ingredients: ['French Pink Clay', 'Rose Water', 'Colloidal Oatmeal', 'Kaolin', 'Chamomile Extract'],
    howToUse: 'Apply an even layer to clean skin, avoiding the eye area. Leave on for 10-15 minutes until dry. Rinse thoroughly with warm water and follow with serum.',
    tag: 'Detox Ritual',
    skinType: ['Oily', 'Combination', 'Sensitive'],
    concern: ['Pore Refining & Detox', 'Calming & Reducing Redness']
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Sophia Vance',
    location: 'New York, NY',
    rating: 5,
    text: 'The Rose Gold Radiance Elixir completely changed my skin texture. In just 2 weeks, my skin went from dull and dry to absolute glass-like radiance. I get compliments daily, and I do not even need foundation anymore!',
    image: 'https://images.pexels.com/photos/16961217/pexels-photo-16961217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    productTag: 'Rose Gold Radiance Elixir'
  },
  {
    name: 'Gabriella Torres',
    location: 'Miami, FL',
    rating: 5,
    text: 'I have tried hundreds of high-end moisturizers, but the Nectar Infusion Cream is on another level. It feels like pure silk and keeps my face plump and dewy all day long without feeling greasy. A luxury staple.',
    image: 'https://images.pexels.com/photos/29065407/pexels-photo-29065407.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    productTag: 'Nectar Infusion Cream'
  },
  {
    name: 'Elena Rostova',
    location: 'London, UK',
    rating: 5,
    text: 'The Velvet Petal Lip Soufflé is my holy grail lipstick. It stays on through meals but feels completely weightless, like a lip balm! Plus, the gold-accented packaging is incredibly chic. Highly recommend!',
    image: 'https://images.pexels.com/photos/3762765/pexels-photo-3762765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    productTag: 'Velvet Petal Lip Soufflé'
  }
];

// FAQs Data
const FAQS = [
  {
    question: 'Are Zuzi products safe for sensitive skin types?',
    answer: 'Absolutely. All our products are dermatologically tested, hypoallergenic, and formulated without common irritants like parabens, sulfates, phthalates, mineral oils, and synthetic fragrances. We prioritize skin health above all.'
  },
  {
    question: 'What are the benefits of 24k gold in skincare?',
    answer: '24k gold is a powerful natural antioxidant that helps stimulate microcirculation, reduce inflammation, protect against collagen breakdown, and reflect light to give your skin an instant, luxurious candlelit glow.'
  },
  {
    question: 'Do you offer international shipping and returns?',
    answer: 'Yes! We ship worldwide. We offer free premium shipping on all orders over $75, and we back our products with a 30-day, hassle-free money-back guarantee. If you are not completely satisfied, we will make it right.'
  },
  {
    question: 'Are your products cruelty-free and vegan?',
    answer: 'Yes, Zuzi Store is 100% cruelty-free. We never test on animals at any stage of product development, and all our skincare and cosmetic formulas are 100% vegan, made with ethically sourced botanical ingredients.'
  },
  {
    question: 'How long does a bottle of Rose Gold Elixir typically last?',
    answer: 'When used daily (2-3 drops morning and night), a standard 30ml bottle of Rose Gold Radiance Elixir will last approximately 2.5 to 3 months. A little goes a very long way!'
  }
];

// Custom ScrollReveal Component for Elegant Entrance Animations
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.98]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  // Preloader State
  const [loading, setLoading] = useState(true);

  // Cart State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Category Filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Quick View Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Before/After Drag Slider
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);
  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);

  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Interactive Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0: Welcome, 1: Skin Type, 2: Primary Concern, 3: Texture, 4: Result
  const [quizAnswers, setQuizAnswers] = useState({
    skinType: '',
    concern: '',
    texture: ''
  });
  const [quizResult, setQuizResult] = useState<Product | null>(null);

  // Special Offer Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 44, seconds: 53 });

  // Newsletter Subscription State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Special Promo Claim State
  const [promoClaimed, setPromoClaimed] = useState(false);

  // Toast Notifications
  const [notification, setNotification] = useState<string | null>(null);

  // Checkout Modal State
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  // FAQ Accordion State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Parallax Hero Mouse Position
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  // Premium Preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to simulate continuous offer
          return { hours: 3, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show Toast Notification helper
  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Cart Functions
  const addToCart = (product: Product, quantity: number = 1, silent: boolean = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    if (!silent) {
      showToast(`✨ ${product.title} added to your collection!`);
      setIsCartOpen(true);
      // Trigger a small burst of confetti
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#F8BFCF', '#D4AF37', '#FFFFFF']
      });
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Product removed from cart.');
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setAppliedDiscount({ code: 'WELCOME10', percent: 10 });
      setCouponError('');
      showToast('🎉 10% discount applied!');
      confetti({
        particleCount: 30,
        spread: 30,
        colors: ['#F8BFCF', '#D4AF37']
      });
    } else if (code === 'GOLDEN15') {
      setAppliedDiscount({ code: 'GOLDEN15', percent: 15 });
      setCouponError('');
      showToast('🎉 15% VIP discount applied!');
      confetti({
        particleCount: 40,
        spread: 30,
        colors: ['#F8BFCF', '#D4AF37']
      });
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or GOLDEN15');
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode('');
    setCouponError('');
    showToast('Coupon code removed.');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount ? (cartSubtotal * appliedDiscount.percent) / 100 : 0;
  const cartTotal = cartSubtotal - discountAmount;
  const freeShippingThreshold = 75;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = { ...prev, [productId]: !prev[productId] };
      const isLiked = updated[productId];
      showToast(isLiked ? '❤️ Added to your wishlist!' : 'Removed from wishlist.');
      return updated;
    });
  };

  const wishlistCount = Object.values(wishlist).filter(Boolean).length;

  // Search filter
  const filteredProducts = PRODUCTS.filter((p) =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Before & After Drag handlers
  const handleBeforeAfterMove = (clientX: number) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setBeforeAfterPos(percentage);
  };

  const handleBeforeAfterTouch = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleBeforeAfterMove(e.touches[0].clientX);
    }
  };

  const handleBeforeAfterMouse = (e: React.MouseEvent) => {
    if (e.buttons === 1 || e.type === 'click') {
      handleBeforeAfterMove(e.clientX);
    }
  };

  // Quiz Logic
  const handleQuizAnswer = (key: 'skinType' | 'concern' | 'texture', value: string) => {
    const updatedAnswers = { ...quizAnswers, [key]: value };
    setQuizAnswers(updatedAnswers);

    if (key === 'skinType') setQuizStep(2);
    if (key === 'concern') setQuizStep(3);
    if (key === 'texture') {
      // Calculate Recommendation
      let match = PRODUCTS[0]; // default
      // Match by concern primarily
      const matches = PRODUCTS.filter((p) =>
        p.concern?.includes(updatedAnswers.concern) || p.skinType?.includes(updatedAnswers.skinType)
      );
      if (matches.length > 0) {
        match = matches[0];
      }
      setQuizResult(match);
      setQuizStep(4);
      // Confetti splash on completing quiz!
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F8BFCF', '#D4AF37']
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({ skinType: '', concern: '', texture: '' });
    setQuizResult(null);
    setQuizStep(1);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast('✨ Welcome to the VIP beauty club!');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#F8BFCF', '#D4AF37', '#FFFFFF']
    });
  };

  // Promo Wheel / Click claim
  const claimPromo = () => {
    if (promoClaimed) return;
    setPromoClaimed(true);
    navigator.clipboard.writeText('GOLDEN15');
    showToast('🎁 VIP Code GOLDEN15 copied to clipboard! Extra 15% off.');
    confetti({
      particleCount: 100,
      spread: 80,
      colors: ['#D4AF37', '#F8BFCF', '#FFFFFF']
    });
  };

  // Complete checkout simulation
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#F8BFCF', '#D4AF37', '#FFFFFF']
    });
    // Reset cart
    setCart([]);
  };

  // Parallax Hero Mouse Movement
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / (width / 2); // range -1 to 1
    const y = (clientY - top - height / 2) / (height / 2); // range -1 to 1
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick view helper
  const openQuickView = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#2B2B2B] relative selection:bg-[#F8BFCF]/30 selection:text-[#2B2B2B]">
      
      {/* 1. PREMIUM FADE-OUT PRELOADER */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF5F0] transition-opacity duration-500">
          <div className="text-center space-y-6 max-w-md px-6">
            {/* Spinning Golden Orbit */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#F8BFCF]/40 border-t-[#D4AF37] animate-spin-slow"></div>
              <div className="absolute w-16 h-16 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-white shadow-sm">
                <span className="font-serif text-2xl font-bold tracking-widest text-[#2B2B2B]">Z</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-light tracking-widest text-[#2B2B2B] uppercase">LOGO Store</h2>
              <p className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase font-medium">Formulating Clean Luxury Beauty</p>
            </div>
            
            {/* Loading Bar */}
            <div className="w-48 h-[2px] bg-[#F5E6DA] mx-auto rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F8BFCF] to-[#D4AF37] w-full origin-left animate-[shimmer_2s_infinite_linear]" 
                   style={{ backgroundSize: '200% 100%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed top-20 right-4 md:right-8 z-50 animate-fade-in-up luxury-glass px-6 py-4 rounded-xl shadow-lg border border-[#F8BFCF]/60 flex items-center gap-3 max-w-sm">
          <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2B2B2B]">{notification}</p>
          </div>
          <button onClick={() => setNotification(null)} className="ml-auto text-gray-400 hover:text-[#2B2B2B] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ANNOUNCEMENT TICKER */}
      <div className="bg-[#FAF5F0] border-b border-[#F5E6DA] text-xs py-2.5 px-4 overflow-hidden relative z-40">
        <div className="flex justify-center items-center gap-6 whitespace-nowrap animate-pulse-subtle">
          <span className="flex items-center gap-1.5 font-medium tracking-wider uppercase text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] inline" />
            FREE SHIPPING ON ORDERS OVER $75
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="hidden md:flex items-center gap-1.5 font-medium tracking-wider uppercase text-xs">
            <Award className="w-3.5 h-3.5 text-[#D4AF37] inline" />
            USE CODE <span className="font-semibold text-[#D4AF37] px-1 bg-white border border-[#D4AF37]/20 rounded">WELCOME10</span> FOR 10% OFF
          </span>
        </div>
      </div>

      {/* HEADER / FLOATING NAVIGATION */}
      <header className="sticky top-0 z-40 luxury-glass border-b border-[#F5E6DA]/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F8BFCF] to-[#F5E6DA] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-xl font-bold tracking-widest text-[#2B2B2B]">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-semibold tracking-widest text-[#2B2B2B] leading-none uppercase">LOGO</span>
              <span className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase leading-tight font-semibold mt-0.5">Luxury Beauty</span>
            </div>
          </a>

          {/* Navigation links - Apple Level Minimalism */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <button onClick={() => scrollToSection('hero')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Home</button>
            <button onClick={() => { setSelectedCategory('All'); scrollToSection('shop'); }} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Shop</button>
            <button onClick={() => scrollToSection('why-zuzi')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Why Zuzi</button>
            <button onClick={() => scrollToSection('best-sellers')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Best Sellers</button>
            <button onClick={() => scrollToSection('before-after')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Results</button>
            <button onClick={() => scrollToSection('quiz')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">Skin Quiz</button>
            <button onClick={() => scrollToSection('faq')} className="text-[#2B2B2B] hover:text-[#D4AF37] transition-colors cursor-pointer text-xs">FAQ</button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#FAF5F0] transition-colors text-[#2B2B2B] hover:text-[#D4AF37]"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button 
              onClick={() => showToast(`💖 Wishlist contains ${wishlistCount} items. Scroll down to shop them!`)}
              className="p-2.5 rounded-full hover:bg-[#FAF5F0] transition-colors text-[#2B2B2B] hover:text-[#D4AF37] relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F8BFCF] text-white font-semibold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#FAF5F0] transition-colors text-[#2B2B2B] hover:text-[#D4AF37] relative"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white font-semibold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => {
                setSelectedCategory('All');
                scrollToSection('shop');
                showToast('✨ Discover our premium beauty range below!');
              }} 
              className="md:hidden p-2.5 rounded-full hover:bg-[#FAF5F0] transition-colors text-[#2B2B2B]"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-white via-[#FAF5F0] to-[#FFF0F3] py-16 md:py-24"
      >
        {/* Luxury Background Graphics */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#F8BFCF]/15 blur-3xl -z-10 animate-pulse-subtle"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#F5E6DA]/35 blur-2xl -z-10"></div>
        
        {/* Animated Gold Sparkle Rings */}
        <div className="absolute top-12 right-12 w-64 h-64 border border-[#D4AF37]/10 rounded-full -z-10 animate-spin-slow"></div>
        <div className="absolute bottom-20 left-6 w-40 h-40 border border-[#F8BFCF]/20 rounded-full -z-10 animate-bounce" style={{ animationDuration: '6s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* Left Text Column */}
          <div className="space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F8BFCF]/40 text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase animate-fade-in-up">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24K Gold & Clean Botanical Care</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#2B2B2B] leading-[1.1] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Reveal Your <br />
                <span className="gold-text-gradient font-serif italic font-normal">Natural Radiance</span>, <br />
                Define Confidence.
              </h1>
              <p className="text-[#2B2B2B]/80 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                Experience clinical-grade, clean cosmetics infused with pure botanical extracts and 24k gold. Formulated to rejuvenate, protect, and illuminate your skin with effortless luxury.
              </p>
            </div>

            {/* CTAs with Gold Hover Glows */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <button 
                onClick={() => scrollToSection('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-medium tracking-widest uppercase text-xs rounded-full shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('quiz')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#FAF5F0] text-[#2B2B2B] border border-[#F5E6DA] font-medium tracking-widest uppercase text-xs rounded-full transition-all duration-300 hover:border-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Find My Formula</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Trust Badges under CTA */}
            <div className="pt-6 border-t border-[#F5E6DA] grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="space-y-1">
                <div className="flex justify-center lg:justify-start text-[#D4AF37]">
                  <Leaf className="w-5 h-5" />
                </div>
                <p className="text-[10px] tracking-wider uppercase font-bold text-[#2B2B2B] text-left">100% Organic</p>
                <p className="text-[9px] text-gray-400 text-left">Pure botanical actives</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-center lg:justify-start text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-[10px] tracking-wider uppercase font-bold text-[#2B2B2B] text-left">Dermatologist Tested</p>
                <p className="text-[9px] text-gray-400 text-left">Safe for all skin</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-center lg:justify-start text-[#D4AF37]">
                  <Award className="w-5 h-5" />
                </div>
                <p className="text-[10px] tracking-wider uppercase font-bold text-[#2B2B2B] text-left">Cruelty-Free & Vegan</p>
                <p className="text-[9px] text-gray-400 text-left">Ethical clean beauty</p>
              </div>
            </div>
          </div>

          {/* Right 3D Cosmetic Showcase Column (Interactive Parallax) */}
          <div className="relative flex items-center justify-center z-10 min-h-[420px] sm:min-h-[500px]">
            
            {/* Soft Glowing Backplates */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#F8BFCF]/30 to-[#F5E6DA]/50 blur-2xl -z-10"></div>
            
            {/* Macro Cream texture background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-cover bg-center -z-10"
                 style={{ backgroundImage: `url('https://images.pexels.com/photos/14816260/pexels-photo-14816260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')` }}></div>

            {/* Floating Star sparkles */}
            <div 
              className="absolute top-10 left-10 text-[#D4AF37] transition-transform duration-300"
              style={{ transform: `translate(${heroMousePos.x * -35}px, ${heroMousePos.y * -35}px)` }}
            >
              <Sparkles className="w-8 h-8 animate-pulse-subtle" />
            </div>

            <div 
              className="absolute bottom-12 right-12 text-[#F8BFCF] transition-transform duration-300"
              style={{ transform: `translate(${heroMousePos.x * 25}px, ${heroMousePos.y * 25}px)` }}
            >
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            {/* Circular luxury brand emblem floating behind */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 border border-[#D4AF37]/15 rounded-full flex items-center justify-center -z-10">
              <div className="w-60 h-60 sm:w-72 sm:h-72 border border-dashed border-[#F8BFCF]/40 rounded-full"></div>
            </div>

            {/* Main Centerpiece Product - Luxury Rose Gold Elixir Bottle */}
            <div 
              className="relative w-64 h-64 sm:w-80 sm:h-80 transition-transform duration-300 ease-out z-20 hover:scale-105"
              style={{ transform: `translate(${heroMousePos.x * 15}px, ${heroMousePos.y * 15}px)` }}
            >
              <img 
                src="https://images.pexels.com/photos/13516790/pexels-photo-13516790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Rose Gold Radiance Elixir Bottle" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/60 ring-1 ring-[#D4AF37]/20 object-center animate-float-slow"
              />
              
              {/* Gold flake particle overlay indicator */}
              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-[#D4AF37]/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-[#2B2B2B] uppercase shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
                24k Gold Flakes
              </span>
            </div>

            {/* Floating Secondary Product - Nectar Cream Jar */}
            <div 
              className="absolute -top-6 -right-4 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-300 ease-out z-30"
              style={{ transform: `translate(${heroMousePos.x * -25}px, ${heroMousePos.y * -25}px)` }}
            >
              <img 
                src="https://images.pexels.com/photos/7670737/pexels-photo-7670737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Nectar Infusion Cream Jar" 
                className="w-full h-full object-cover rounded-2xl shadow-xl border border-white/60 ring-1 ring-[#F8BFCF]/20 object-center animate-float-medium"
              />
              <span className="absolute -top-2 -right-2 bg-[#F8BFCF] text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                72h Hydration
              </span>
            </div>

            {/* Floating Terceary Product - Velvet Lip Soufflé */}
            <div 
              className="absolute -bottom-8 -left-4 sm:-left-8 w-28 h-28 sm:w-36 sm:h-36 transition-transform duration-300 ease-out z-30"
              style={{ transform: `translate(${heroMousePos.x * 35}px, ${heroMousePos.y * -15}px)` }}
            >
              <img 
                src="https://images.pexels.com/photos/16378446/pexels-photo-16378446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Velvet Lip Soufflé Lip Color" 
                className="w-full h-full object-cover rounded-2xl shadow-xl border border-white/60 ring-1 ring-[#F5E6DA]/30 object-center animate-float-fast"
              />
              <span className="absolute -bottom-2 -left-2 bg-[#2B2B2B] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm">
                Matte Velvet
              </span>
            </div>

            {/* Floating Scientific Data Bubble */}
            <div 
              className="absolute top-1/2 -right-16 sm:-right-24 bg-white/85 backdrop-blur-md border border-[#F8BFCF]/40 p-4 rounded-xl shadow-lg z-30 max-w-[150px] transition-transform duration-300"
              style={{ transform: `translate(${heroMousePos.x * -10}px, ${heroMousePos.y * 25}px)` }}
            >
              <p className="text-xl font-bold font-serif text-[#D4AF37] leading-none">+98%</p>
              <p className="text-[10px] font-semibold text-[#2B2B2B] uppercase tracking-wider mt-1">Natural Origin</p>
              <p className="text-[8px] text-gray-400 leading-tight mt-0.5">Bio-fermented active compounds</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BEAUTY CATEGORIES SECTION */}
      <section className="py-20 bg-white border-t border-[#F5E6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Curated Collections</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">Shop By Beauty Ritual</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Explore our highly targeted, luxury formulations designed to treat specific skin goals. From daily moisture locks to high-pigment velvet cosmetics.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Serums',
                tagline: 'Active Concentrates',
                image: 'https://images.pexels.com/photos/13516790/pexels-photo-13516790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                desc: '24k gold, retinols & peptides.'
              },
              {
                title: 'Skincare',
                tagline: 'Daily Moisture Locks',
                image: 'https://images.pexels.com/photos/7670737/pexels-photo-7670737.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                desc: 'Whipped creams & lipid barriers.'
              },
              {
                title: 'Cosmetics',
                tagline: 'Luxury Velvet Finish',
                image: 'https://images.pexels.com/photos/16378446/pexels-photo-16378446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                desc: 'Glow highlighters & lip soufflés.'
              },
              {
                title: 'Self-Care',
                tagline: 'Botanical Detox',
                image: 'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                desc: 'French pink clays & mineral masks.'
              }
            ].map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx * 150} className="group relative h-96 rounded-2xl overflow-hidden shadow-md cursor-pointer">
                {/* Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Luxury Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-[#F8BFCF] uppercase leading-none">{cat.tagline}</span>
                  <h3 className="font-serif text-2xl font-light text-white mt-1.5 tracking-wide">{cat.title}</h3>
                  <p className="text-xs text-gray-300 mt-1 font-light opacity-90">{cat.desc}</p>
                  
                  {/* Action Link */}
                  <button 
                    onClick={() => {
                      setSelectedCategory(cat.title);
                      scrollToSection('shop');
                      showToast(`Filtered by ${cat.title}!`);
                    }}
                    className="mt-4 flex items-center gap-1 text-xs font-semibold tracking-widest text-white hover:text-[#D4AF37] uppercase transition-colors group-hover:translate-x-1 duration-300 text-left"
                  >
                    <span>Discover Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (WITH FILTER) & QUICK VIEW */}
      <section id="shop" className="py-20 bg-[#FAF5F0]/60 border-t border-[#F5E6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">E-Commerce Excellence</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">Featured Formulations</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
          </ScrollReveal>

          {/* Luxury Category Filter Pills */}
          <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-12">
            {['All', 'Skincare', 'Cosmetics', 'Serums', 'Self-Care'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2B2B2B] text-white shadow-md'
                    : 'bg-white text-[#2B2B2B] border border-[#F5E6DA] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod, idx) => (
              <ScrollReveal 
                key={prod.id} 
                delay={idx * 100}
                className="group luxury-glass rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col relative border border-[#F5E6DA]/60"
              >
                {/* Wishlist Heart Button */}
                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#2B2B2B] hover:text-[#F8BFCF] shadow-sm hover:scale-105 transition-all cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart 
                    className={`w-4.5 h-4.5 transition-colors ${
                      wishlist[prod.id] ? 'fill-[#F8BFCF] text-[#F8BFCF]' : ''
                    }`} 
                  />
                </button>

                {/* Product Tag Badge */}
                {prod.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-[#FAF5F0] border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {prod.tag}
                  </span>
                )}

                {/* Product Image Container (Zoom on Hover) */}
                <div className="relative h-72 w-full overflow-hidden bg-[#FAF5F0]">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button 
                      onClick={(e) => openQuickView(prod, e)}
                      className="px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest text-[#2B2B2B] uppercase hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(prod.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-semibold ml-1">{prod.rating}</span>
                      <span className="text-gray-400 font-light text-[11px]">({prod.reviewsCount})</span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors leading-tight">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F5E6DA]/50 flex items-center justify-between">
                    <div>
                      {prod.originalPrice ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#2B2B2B]">${prod.price.toFixed(2)}</span>
                          <span className="text-xs text-gray-400 line-through">${prod.originalPrice.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-[#2B2B2B]">${prod.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="px-4 py-2.5 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-[10px] rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE ZUZI STORE */}
      <section id="why-zuzi" className="py-20 bg-[#FAF5F0] border-t border-[#F5E6DA]/40 relative overflow-hidden">
        {/* Soft background petal */}
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#F8BFCF]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Ethical Luxury Standards</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">The Zuzi Standard</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
            <p className="text-sm text-gray-500">
              We merge the purity of nature with cutting-edge skincare science to create results you can see, and formulations you can trust.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="w-6 h-6 text-[#D4AF37]" />,
                title: 'Clean Botanical Actives',
                desc: 'Free of parabens, sulfates, silicones, and synthetic fillers. We harvest raw, organic nutrients.'
              },
              {
                icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
                title: '24k Gold Infusions',
                desc: 'Real micro-fine 24k gold flakes stimulate cellular repair and reflect micro-light for instant dewy glow.'
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
                title: 'Dermatologist Certified',
                desc: 'Clinically verified, hypoallergenic, and formulated to nourish even the most reactive skin types.'
              },
              {
                icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
                title: 'Ethical & Sustainable',
                desc: '100% Cruelty-free and vegan formulations housed in recyclable, premium ultraviolet glass bottles.'
              }
            ].map((pillar, idx) => (
              <ScrollReveal 
                key={pillar.title} 
                delay={idx * 150} 
                className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF5F0] flex items-center justify-center mb-6 border border-[#F5E6DA]/60 shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-medium text-[#2B2B2B] mb-3 leading-tight">{pillar.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{pillar.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS & PRODUCT OF THE MONTH EDITORIAL */}
      <section id="best-sellers" className="py-20 bg-white border-t border-[#F5E6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Prestige Picks</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">Best Sellers List</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
          </ScrollReveal>

          {/* Editorial Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Product Spotlight Callout */}
            <ScrollReveal className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Product Spotlight
              </div>
              
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#2B2B2B] leading-tight">
                The Rose Gold <br />
                <span className="italic font-normal gold-text-gradient">Radiance Ritual</span>
              </h3>
              
              <blockquote className="border-l-2 border-[#F8BFCF] pl-4 italic text-sm text-gray-500 font-light leading-relaxed">
                "This elixir is like liquid gold. It absorbs immediately, leaving an incredible, dewy glass-skin finish without being heavy. My skin looks ten years younger."
                <cite className="block text-xs font-semibold text-[#2B2B2B] not-italic mt-2">— Marie C., Verified Buyer</cite>
              </blockquote>

              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Our bestselling Rose Gold Radiance Elixir has achieved cult status worldwide. A versatile 3-in-1 hydrating oil, moisturizer booster, and makeup primer, it elevates any beauty routine with pure 24k gold flakes.
              </p>

              <div className="flex items-center gap-6 py-2">
                <div>
                  <p className="text-2xl font-bold text-[#2B2B2B]">$68.00</p>
                  <p className="text-[10px] text-gray-400 font-medium line-through">$85.00</p>
                </div>
                <div className="text-xs font-semibold text-[#D4AF37] bg-[#FFF0F3] px-3 py-1 rounded-full">
                  Save 20% Today
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => addToCart(PRODUCTS[0], 1)}
                  className="px-6 py-3.5 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Collection</span>
                </button>
                <button 
                  onClick={(e) => openQuickView(PRODUCTS[0], e)}
                  className="px-6 py-3.5 bg-white border border-[#F5E6DA] hover:border-[#D4AF37] text-[#2B2B2B] font-semibold tracking-widest uppercase text-xs rounded-full transition-all cursor-pointer"
                >
                  <span>Read Ingredients</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Right Column: Bestsellers Carousel / Grid Showcase */}
            <ScrollReveal className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PRODUCTS.slice(0, 4).map((prod) => (
                <div 
                  key={`best-${prod.id}`}
                  className="bg-[#FAF5F0]/60 border border-[#F5E6DA]/50 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    {/* Image */}
                    <div className="h-44 rounded-xl overflow-hidden bg-white border border-[#F5E6DA]/20">
                      <img 
                        src={prod.image} 
                        alt={prod.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Star & Title */}
                    <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="font-semibold">{prod.rating}</span>
                      <span className="text-gray-400 font-light text-[10px]">({prod.reviewsCount} reviews)</span>
                    </div>

                    <h4 className="font-serif text-base font-medium text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {prod.title}
                    </h4>
                    
                    <p className="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F5E6DA]/40 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#2B2B2B]">${prod.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="text-[10px] font-bold tracking-widest text-[#2B2B2B] hover:text-[#D4AF37] uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <span>Quick Add</span>
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE BEFORE & AFTER SHOWCASE */}
      <section id="before-after" className="py-20 bg-[#FAF5F0]/60 border-t border-[#F5E6DA]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left column: Information & clinical results */}
            <ScrollReveal className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F8BFCF]/40 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Proven Clinical Efficacy
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B] leading-tight">
                Visible Clinical <br />
                <span className="italic font-normal gold-text-gradient">Transformations</span>
              </h2>
              
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Real skin, real science. Swipe or click on the interactive slider to see how our gold-infused formulas transform skin texture, hydration, and glow over a 28-day study period.
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-[#F5E6DA] text-center shadow-sm">
                  <p className="text-3xl font-bold font-serif text-[#D4AF37] leading-none">+94%</p>
                  <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider mt-1">Skin Hydration</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">Locks moisture 72h</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#F5E6DA] text-center shadow-sm">
                  <p className="text-3xl font-bold font-serif text-[#D4AF37] leading-none">+89%</p>
                  <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider mt-1">Cell Radiance</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">Instant glass skin</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#F5E6DA] text-center shadow-sm">
                  <p className="text-3xl font-bold font-serif text-[#D4AF37] leading-none">-30%</p>
                  <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider mt-1">Fine Lines</p>
                  <p className="text-[8px] text-gray-400 mt-0.5">Visibly smoothed</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 italic">
                *Based on a 4-week independent clinical study of 120 women using the Zuzi Radiance Ritual daily. Individual results may vary.
              </p>
            </ScrollReveal>

            {/* Right column: Interactive Slider */}
            <ScrollReveal className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md">
                
                {/* Drag Slider Box */}
                <div 
                  ref={beforeAfterContainerRef}
                  onMouseMove={handleBeforeAfterMouse}
                  onTouchMove={handleBeforeAfterTouch}
                  onClick={handleBeforeAfterMouse}
                  className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
                >
                  
                  {/* Before State (Right side background, slightly duller) */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.pexels.com/photos/3762764/pexels-photo-3762764.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" 
                      alt="Before skincare"
                      className="w-full h-full object-cover object-center filter saturate-[0.80] contrast-[0.93] brightness-[0.92]"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/65 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                      Day 1: Before
                    </div>
                  </div>

                  {/* After State (Left side clipped overlay, highly glowing) */}
                  <div 
                    className="absolute inset-0 transition-all duration-75"
                    style={{ clipPath: `polygon(0 0, ${beforeAfterPos}% 0, ${beforeAfterPos}% 100%, 0 100%)` }}
                  >
                    <img 
                      src="https://images.pexels.com/photos/3762764/pexels-photo-3762764.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" 
                      alt="After skincare"
                      className="w-full h-full object-cover object-center filter saturate-[1.10] brightness-[1.04] contrast-[1.02]"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#D4AF37]/90 border border-white/20 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Day 28: After Zuzi</span>
                    </div>
                  </div>

                  {/* Handle Divider Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
                    style={{ left: `${beforeAfterPos}%` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2B2B2B] border-2 border-white shadow-xl flex items-center justify-center text-[#D4AF37]">
                      <ChevronLeft className="w-3 h-3 text-white -mr-1" />
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                </div>

                <p className="text-center text-xs text-gray-400 font-light mt-4">
                  Drag the center divider handle to compare Day 1 vs Day 28.
                </p>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE BEAUTY QUIZ / FORMULA FINDER */}
      <section id="quiz" className="py-20 bg-white border-t border-[#F5E6DA]/40 relative overflow-hidden">
        
        {/* Floating circles */}
        <div className="absolute top-1/4 right-1/10 w-80 h-80 rounded-full bg-[#FAF5F0] -z-10 animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-[#FFF0F3] -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-glass border border-[#F8BFCF]/50 rounded-3xl p-8 sm:p-12 shadow-xl relative">
            
            {/* Corner sparkle */}
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#D4AF37] border border-[#F8BFCF]/30 shadow-sm animate-bounce">
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Quiz Step 0: Welcome Screen */}
            {quizStep === 0 && (
              <div className="text-center space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Formula Finder
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">
                  Find Your Perfect <br />
                  <span className="italic font-normal gold-text-gradient">Skincare Ritual</span>
                </h2>
                
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed font-light">
                  Answer 3 quick questions about your skin's mood and goals, and our algorithm will build your customized luxury routine with a special 15% discount code!
                </p>

                <button 
                  onClick={() => setQuizStep(1)}
                  className="px-8 py-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-medium tracking-widest uppercase text-xs rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                >
                  Start The Quiz (Takes 30s)
                </button>
              </div>
            )}

            {/* Quiz Step 1: Skin Type */}
            {quizStep === 1 && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-[#F5E6DA] pb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Step 1 of 3</span>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase">Skin Mood</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2B2B2B] text-center">
                  What is your skin's current mood?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'Dry', label: 'Dry & Dehydrated', desc: 'Feels tight, flakey, or looks dull.' },
                    { val: 'Oily', label: 'Oily & Congested', desc: 'Shiny T-zone, enlarged pores, prone to breakouts.' },
                    { val: 'Sensitive', label: 'Sensitive & Reactive', desc: 'Prone to redness, burning, or itching.' },
                    { val: 'Combination', label: 'Combination Skin', desc: 'Oily in T-zone, dry on cheeks.' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer('skinType', opt.val)}
                      className="p-5 rounded-xl border border-[#F5E6DA] bg-white text-left hover:border-[#D4AF37] hover:bg-[#FAF5F0]/30 transition-all cursor-pointer group"
                    >
                      <p className="font-semibold text-sm text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-normal font-light">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2: Primary Concern */}
            {quizStep === 2 && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-[#F5E6DA] pb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Step 2 of 3</span>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase">Primary Goal</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2B2B2B] text-center">
                  What is your primary skincare goal?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'Hydration & Plumping', label: 'Deep Hydration & Plumping', desc: 'Increase moisture, smooth dehydration lines.' },
                    { val: 'Brightening & Anti-Aging', label: 'Brightening & Anti-Aging', desc: 'Fade dark spots, boost radiance, firm skin.' },
                    { val: 'Calming & Reducing Redness', label: 'Calming & Reducing Redness', desc: 'Soothe irritation, cool hot spots, reinforce barrier.' },
                    { val: 'Pore Refining & Detox', label: 'Pore Refining & Detox', desc: 'Minimize pores, draw out impurities, clear pores.' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer('concern', opt.val)}
                      className="p-5 rounded-xl border border-[#F5E6DA] bg-white text-left hover:border-[#D4AF37] hover:bg-[#FAF5F0]/30 transition-all cursor-pointer group"
                    >
                      <p className="font-semibold text-sm text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-normal font-light">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setQuizStep(1)}
                  className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-[#2B2B2B] flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Quiz Step 3: Preferred Texture */}
            {quizStep === 3 && (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-[#F5E6DA] pb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Step 3 of 3</span>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase">Sensory Preference</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2B2B2B] text-center">
                  Which texture pamper matches you?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { val: 'Light & Dewy Serum', label: 'Light & Dewy Serum', desc: 'Fast absorbing, weightless glow.' },
                    { val: 'Rich & Velvety Cream', label: 'Rich & Velvety Cream', desc: 'Buttery, protective nourishment.' },
                    { val: 'Gentle Clay & Botanicals', label: 'Gentle Clay & Botanicals', desc: 'Mineral rich, weekly detox.' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleQuizAnswer('texture', opt.val)}
                      className="p-5 rounded-xl border border-[#F5E6DA] bg-white text-left hover:border-[#D4AF37] hover:bg-[#FAF5F0]/30 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <p className="font-semibold text-sm text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors">{opt.label}</p>
                      <p className="text-xs text-gray-400 mt-2 leading-normal font-light">{opt.desc}</p>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setQuizStep(2)}
                  className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-[#2B2B2B] flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Quiz Step 4: Result Recommendations */}
            {quizStep === 4 && quizResult && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="text-center space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F8BFCF]/40 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Quiz Recommendation
                  </span>
                  <h3 className="font-serif text-3xl font-light text-[#2B2B2B]">
                    Your Skincare Perfect Match
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Based on your answers: {quizAnswers.skinType} skin & {quizAnswers.concern} goals.
                  </p>
                </div>

                {/* Recommendation Card */}
                <div className="bg-white rounded-2xl p-6 border border-[#F5E6DA] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Image */}
                  <div className="md:col-span-4 h-56 rounded-xl overflow-hidden bg-[#FAF5F0]">
                    <img 
                      src={quizResult.image} 
                      alt={quizResult.title} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info & Price */}
                  <div className="md:col-span-8 space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#FAF5F0] px-3 py-1 rounded-full">
                      Quiz Special Deal: 15% Off
                    </span>
                    
                    <h4 className="font-serif text-2xl font-medium text-[#2B2B2B] leading-tight">
                      {quizResult.title}
                    </h4>

                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {quizResult.description}
                    </p>

                    {/* Customized reasons */}
                    <div className="space-y-1 bg-[#FAF5F0] p-3 rounded-lg border border-[#F5E6DA]/50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">Why it works for you:</p>
                      <p className="text-xs text-gray-500 font-light">
                        ✨ Calms and balances {quizAnswers.skinType} skin using customized clinical peptides.
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        ✨ Directly targets {quizAnswers.concern} for cell renewal.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-2xl font-bold text-[#2B2B2B]">${(quizResult.price * 0.85).toFixed(2)}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">${quizResult.price.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          addToCart({ ...quizResult, price: quizResult.price * 0.85 }, 1);
                          showToast(`🎁 Quiz Discount applied to ${quizResult.title}!`);
                        }}
                        className="px-6 py-3 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all cursor-pointer"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>

                </div>

                <div className="flex justify-center gap-4 pt-4 border-t border-[#F5E6DA]">
                  <button 
                    onClick={resetQuiz}
                    className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-[#2B2B2B] flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 9. SPECIAL OFFERS & COUNTDOWN TIMER */}
      <section className="py-20 bg-gradient-to-tr from-[#FFF0F3] via-[#FAF5F0] to-[#F5E6DA]/50 border-t border-[#F5E6DA]/40 relative overflow-hidden">
        {/* Floating background design */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-[#D4AF37]/10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#F8BFCF]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Countdown & Copy Code */}
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Golden Hour Flash Sale
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#2B2B2B] leading-tight">
                Claim Your Extra <br />
                <span className="italic font-normal gold-text-gradient">15% VIP Discount</span>
              </h2>

              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Unlock an additional 15% discount on our bestselling skincare bundles. Use code <span className="font-bold text-[#D4AF37] bg-white border border-[#D4AF37]/35 px-1.5 py-0.5 rounded">GOLDEN15</span> at checkout. Hurry, this exclusive offer expires soon!
              </p>

              {/* Countdown Ticker */}
              <div className="flex gap-4 pt-2">
                {[
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' }
                ].map((timer, idx) => (
                  <div key={idx} className="bg-white border border-[#F5E6DA] p-4 rounded-2xl w-24 text-center shadow-sm">
                    <p className="text-3xl font-bold font-serif text-[#2B2B2B]">
                      {timer.value.toString().padStart(2, '0')}
                    </p>
                    <p className="text-[9px] font-semibold text-[#D4AF37] uppercase tracking-wider mt-1">{timer.label}</p>
                  </div>
                ))}
              </div>

              {/* Copy Code Interactive Button */}
              <div className="pt-4">
                <button
                  onClick={claimPromo}
                  className={`px-8 py-4 ${
                    promoClaimed ? 'bg-[#2B2B2B] text-white' : 'bg-white text-[#2B2B2B] border border-[#D4AF37]'
                  } font-semibold tracking-widest uppercase text-xs rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-102 cursor-pointer`}
                >
                  {promoClaimed ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Code GOLDEN15 Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D4AF37]" />
                      <span>Claim 15% VIP Code</span>
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>

            {/* Right Column: Bundle Product Showcase */}
            <ScrollReveal className="lg:col-span-6 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-xl space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#FAF5F0] px-3 py-1 rounded-full">
                  Best Value Bundle
                </span>
                <span className="text-xs text-[#F8BFCF] font-semibold">★ Free Shipping Eligible</span>
              </div>

              {/* Bundle Details */}
              <div className="flex gap-4 items-center border-b border-[#F5E6DA]/50 pb-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#FAF5F0] border border-[#F5E6DA]/40">
                  <img 
                    src="https://images.pexels.com/photos/13516791/pexels-photo-13516791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                    alt="Radiance Ritual Trio" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-serif text-xl font-medium text-[#2B2B2B]">
                    The Radiance Ritual Trio
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Includes: Rose Gold Elixir (30ml) + Nectar Cream (50ml) + Lip Soufflé
                  </p>
                </div>
              </div>

              {/* Prices & Purchase */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Bundle Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#2B2B2B]">$119.00</span>
                    <span className="text-sm text-gray-400 line-through">$154.00</span>
                  </div>
                  <p className="text-[10px] text-[#D4AF37] font-semibold mt-1">✨ You Save $35.00 (23% Off)</p>
                </div>

                <button
                  onClick={() => {
                    // Create a bundle product object
                    const bundleProduct: Product = {
                      id: 'radiance-trio',
                      title: 'The Radiance Ritual Trio Bundle',
                      category: 'Bundles',
                      price: 119.00,
                      rating: 4.9,
                      reviewsCount: 44,
                      image: 'https://images.pexels.com/photos/13516791/pexels-photo-13516791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                      description: 'The ultimate luxury radiance collection containing our top three formulations.',
                      benefits: ['Complete skincare & cosmetic routine', '24k gold infused', 'Full-size products'],
                      ingredients: ['Multiple clinical ingredients'],
                      howToUse: 'See individual packaging'
                    };
                    addToCart(bundleProduct, 1);
                  }}
                  className="px-6 py-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all duration-300 shadow-md cursor-pointer"
                >
                  Add Bundle to Cart
                </button>
              </div>

            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 10. CUSTOMER REVIEWS & TESTIMONIALS (WITH CAROUSEL) */}
      <section className="py-20 bg-white border-t border-[#F5E6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Love Letters</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">Customer Testimonials</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
          </ScrollReveal>

          {/* Testimonial Slider Carousel */}
          <ScrollReveal className="max-w-5xl mx-auto">
            <div className="bg-[#FAF5F0] border border-[#F5E6DA]/50 rounded-3xl overflow-hidden shadow-sm relative grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch min-h-[380px]">
              
              {/* Left: Customer Photo */}
              <div className="md:col-span-5 relative h-64 md:h-auto overflow-hidden bg-[#FAF5F0]">
                <img 
                  src={TESTIMONIALS[activeTestimonial].image} 
                  alt={TESTIMONIALS[activeTestimonial].name} 
                  className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-75"
                />
              </div>

              {/* Right: Testimonial Quote */}
              <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex text-[#D4AF37]">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-serif text-lg sm:text-xl font-light text-[#2B2B2B] italic leading-relaxed">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex justify-between items-end border-t border-[#F5E6DA] pt-6">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#2B2B2B]">{TESTIMONIALS[activeTestimonial].name}</h4>
                    <p className="text-xs text-gray-400 font-light">{TESTIMONIALS[activeTestimonial].location}</p>
                  </div>
                  
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] bg-white border border-[#D4AF37]/20 px-3 py-1 rounded-full">
                    Verified Purchase: {TESTIMONIALS[activeTestimonial].productTag}
                  </span>
                </div>

              </div>

              {/* Slider Arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF5F0] border border-[#F5E6DA] flex items-center justify-center text-[#2B2B2B] hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF5F0] border border-[#F5E6DA] flex items-center justify-center text-[#2B2B2B] hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2.5 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx ? 'bg-[#D4AF37] w-6' : 'bg-gray-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 11. FAQ SECTION (WITH ACCORDION) */}
      <section id="faq" className="py-20 bg-[#FAF5F0]/60 border-t border-[#F5E6DA]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">Beauty Questions</h2>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2B2B]">Frequently Asked Questions</p>
            <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mt-4"></div>
          </ScrollReveal>

          {/* Accordion list */}
          <ScrollReveal className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-[#F5E6DA] overflow-hidden shadow-sm transition-all duration-300"
                >
                  {/* Question header */}
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-[#FAF5F0] flex items-center justify-center text-[#D4AF37] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#FFF0F3] text-[#F8BFCF]' : ''
                    }`}>
                      <ChevronRight className="w-4 h-4 transform rotate-90" />
                    </span>
                  </button>

                  {/* Accordion body with smooth height transition */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-[#F5E6DA]/50' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="py-5 px-6 text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </ScrollReveal>

        </div>
      </section>

      {/* 12. CONTACT & SOCIAL MEDIA GRID */}
      <section className="py-20 bg-white border-t border-[#F5E6DA]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Newsletter signup & Contact details */}
            <ScrollReveal className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#FFF0F3] border border-[#F8BFCF]/40 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  The Inner Circle
                </div>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2B2B2B] leading-tight">
                  Join The Zuzi <br />
                  <span className="italic font-normal gold-text-gradient">Beauty Newsletter</span>
                </h2>

                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Be the first to hear about luxury product launches, VIP flash sales, and exclusive skincare formulations. Get an instant 10% discount code upon signing up.
                </p>
              </div>

              {/* Newsletter Form */}
              {newsletterSubscribed ? (
                <div className="bg-[#FFF0F3] border border-[#F8BFCF]/40 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mx-auto animate-bounce" />
                  <h4 className="font-serif text-lg font-semibold text-[#2B2B2B]">Welcome to the VIP Club!</h4>
                  <p className="text-xs text-gray-500 font-light">
                    We have sent your 10% welcome discount to your inbox. Enjoy shopping our premium collection!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-[#FAF5F0] border border-[#F5E6DA] rounded-full text-xs placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-all pr-12 text-[#2B2B2B]"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[9px] text-gray-400 italic">
                    By signing up, you consent to receive marketing emails. Unsubscribe at any time.
                  </p>
                </form>
              )}

              {/* Contact and address info */}
              <div className="pt-6 border-t border-[#F5E6DA]/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF5F0] border border-[#F5E6DA]/40 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider">Email Us</p>
                    <p className="text-xs text-gray-400">concierge@zuzi.beauty</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF5F0] border border-[#F5E6DA]/40 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider">Call Luxury Concierge</p>
                    <p className="text-xs text-gray-400">1-800-MY-ZUZI</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:col-span-2">
                  <div className="w-9 h-9 rounded-full bg-[#FAF5F0] border border-[#F5E6DA]/40 flex items-center justify-center text-[#D4AF37]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#2B2B2B] uppercase tracking-wider">Flagship Salon</p>
                    <p className="text-xs text-gray-400">5th Avenue, Suite 1200, Manhattan, New York</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Instagram Luxury grid */}
            <ScrollReveal className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Follow @ZuziStore</span>
                  <h3 className="font-serif text-2xl font-light text-[#2B2B2B] mt-1">Our Beauty Aesthetic</h3>
                </div>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold tracking-widest text-[#2B2B2B] hover:text-[#D4AF37] uppercase flex items-center gap-1 transition-colors border-b border-[#2B2B2B] pb-0.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 4 Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { img: 'https://images.pexels.com/photos/14816260/pexels-photo-14816260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Luminous Cream' },
                  { img: 'https://images.pexels.com/photos/16961217/pexels-photo-16961217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800', label: 'Summer Glow' },
                  { img: 'https://images.pexels.com/photos/13516790/pexels-photo-13516790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Gold Elixir' },
                  { img: 'https://images.pexels.com/photos/28117004/pexels-photo-28117004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', label: 'Velvet Texture' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="relative rounded-xl overflow-hidden aspect-square shadow-sm group cursor-pointer border border-[#F5E6DA]/20"
                  >
                    <img 
                      src={item.img} 
                      alt={item.label} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Dark glass cover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-[10px] tracking-widest uppercase font-semibold border-b border-white pb-1">
                        View Post
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-gray-400 text-center sm:text-right">
                Join our 250k+ community of self-care lovers and beauty experts. Tag #ZuziRadiance to be featured.
              </p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 13. PREMIUM FOOTER */}
      <footer className="bg-[#FAF5F0] border-t border-[#F5E6DA] pt-16 pb-8 text-[#2B2B2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F8BFCF] to-[#F5E6DA] flex items-center justify-center shadow-sm">
                <span className="font-serif text-xl font-bold tracking-widest text-[#2B2B2B]">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold tracking-widest text-[#2B2B2B] leading-none uppercase">Zuzi</span>
                <span className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase leading-tight font-semibold mt-0.5">Luxury Beauty</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Zuzi Store is a premium, clean cosmetics and skincare house. Formulating dermatologically certified serums, moisturizers, and cosmetics infused with active botanical extracts and pure 24k gold. We inspire daily rituals that elevate confidence and reveal your natural radiance.
            </p>

            {/* Guarantees */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">30-Day Happiness Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">100% Secure SSL Checkout</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Shop Beauty</h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-light">
              <li><button onClick={() => { setSelectedCategory('Serums'); scrollToSection('shop'); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">24k Gold Serums</button></li>
              <li><button onClick={() => { setSelectedCategory('Skincare'); scrollToSection('shop'); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">Daily Moisturizers</button></li>
              <li><button onClick={() => { setSelectedCategory('Cosmetics'); scrollToSection('shop'); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">Highlighters & Lips</button></li>
              <li><button onClick={() => { setSelectedCategory('Self-Care'); scrollToSection('shop'); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">Pink Clay Detox Masks</button></li>
              <li><button onClick={() => { setSelectedCategory('All'); scrollToSection('shop'); }} className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left">Best Selling Bundles</button></li>
            </ul>
          </div>

          {/* Column 3: About Zuzi */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Our Science</h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Our Botanical Story</a></li>
              <li><button onClick={() => scrollToSection('before-after')} className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer">Clinical Efficacy Studies</button></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Sustainability & Vegan Guarantee</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Find a Flagship Salon</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Press & Media Enquiries</a></li>
            </ul>
          </div>

          {/* Column 4: Help & Support */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Concierge Desk</h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-light">
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer">Shipping & Returns Policy</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer">Frequently Asked Questions</button></li>
              <li><button onClick={() => scrollToSection('quiz')} className="hover:text-[#D4AF37] transition-colors text-left cursor-pointer">Take the Skincare Quiz</button></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Affiliate & Partner program</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact Concierge</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom (Copyright, payment badges) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#F5E6DA] flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Zuzi Store. All rights reserved. Designed with luxury and skin health in mind.
          </p>

          {/* Payment Badges */}
          <div className="flex gap-3.5 items-center opacity-80">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mr-2">Secure Payments:</span>
            
            {/* Visa */}
            <svg className="h-4.5 w-auto" viewBox="0 0 48 30" fill="none"><rect width="48" height="30" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/><path d="M16.5 10l-1.8 7.5h-2.1L10.8 10h2.4l1.1 4.8 1-4.8h1.2zm11.2 2.7h-3.8l-.5 2h3.8c.4 0 .7-.1.8-.4l.2-.7c0-.5-.3-.9-.5-.9zm2.4-2.7l-1.5 6h2.1l1.5-6h-2.1zm-15.6 6c.3 0 .6-.1.8-.4l2.8-5.6h-2.3l-1.6 3.6-.8-3.6H12l2.5 6z" fill="#1A1F71"/></svg>
            
            {/* Mastercard */}
            <svg className="h-4.5 w-auto" viewBox="0 0 48 30" fill="none"><rect width="48" height="30" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/><circle cx="21" cy="15" r="7" fill="#EB001B"/><circle cx="27" cy="15" r="7" fill="#F79E1B" fillOpacity="0.8"/></svg>
            
            {/* Amex */}
            <svg className="h-4.5 w-auto" viewBox="0 0 48 30" fill="none"><rect width="48" height="30" rx="4" fill="#016FD0"/><path d="M12 11h2.5l.8 2 2.5-2h2.5l-3.5 3.5L20.5 19H18l-2.5-2.5-.8 2.5H12l2.8-5L12 11zm11.2 0H27v8h-3.8v-8zm2.4 2.5H27V16h-1.4v-2.5z" fill="white"/></svg>
            
            {/* Apple Pay */}
            <svg className="h-4.5 w-auto" viewBox="0 0 48 30" fill="none"><rect width="48" height="30" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/><path d="M18 19h1.5v-3.5h2.2c1.2 0 2-.7 2-2 0-1.3-.8-2-2-2H18v7.5zm1.5-5v-1.8h2c.5 0 .8.2.8.8 0 .5-.3.7-.8.7h-2zm12-1v-.8c0-1-.8-1.5-2-1.5s-2.1.6-2.1 1.5v.8h4.1zm-4.1.8h4.1v2.5c0 1-.8 1.5-2 1.5s-2.1-.6-2.1-1.5v-2.5z" fill="black"/></svg>
          </div>
        </div>
      </footer>

      {/* SHOPPING CART DRAWER (SLIDE-IN OVERLAY) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F5E6DA]">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#F5E6DA] flex items-center justify-between bg-[#FAF5F0]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-xl font-semibold text-[#2B2B2B]">Your Skincare Collection</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-white text-gray-400 hover:text-[#2B2B2B] transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="p-4 bg-[#FFF0F3] border-b border-[#F8BFCF]/30 text-center space-y-2">
                {cartSubtotal >= freeShippingThreshold ? (
                  <p className="text-xs font-semibold text-[#D4AF37] flex items-center justify-center gap-1">
                    🎉 Congratulations! You have unlocked Free Premium Shipping!
                  </p>
                ) : (
                  <>
                    <p className="text-xs text-[#2B2B2B] font-light">
                      Add <span className="font-bold text-[#D4AF37]">${remainingForFreeShipping.toFixed(2)}</span> more to unlock <span className="font-bold">Free Premium Shipping</span>!
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#F8BFCF] to-[#D4AF37] transition-all duration-500"
                        style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Body - Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <BagIcon className="w-16 h-16 text-gray-200 mx-auto stroke-1" />
                    <h4 className="font-serif text-lg font-medium text-gray-400">Your collection is empty</h4>
                    <p className="text-xs text-gray-400 font-light max-w-xs mx-auto">
                      Discover our premium 24k gold serums and dewy skin creams to start your beauty ritual.
                    </p>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('shop'); }}
                      className="px-6 py-3 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all cursor-pointer"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="flex gap-4 p-3 rounded-xl border border-[#F5E6DA]/60 hover:shadow-sm transition-all"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAF5F0] shrink-0 border border-[#F5E6DA]/30">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-medium text-[#2B2B2B] leading-snug line-clamp-1">
                            {item.product.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{item.product.category}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-[#F5E6DA] rounded-full bg-white">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1 px-2.5 text-gray-400 hover:text-[#2B2B2B] transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold text-[#2B2B2B] px-1">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1 px-2.5 text-gray-400 hover:text-[#2B2B2B] transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-[#2B2B2B]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-300 hover:text-[#EB001B] p-1 self-start transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Coupon Field & Totals */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#F5E6DA] bg-[#FAF5F0] space-y-4">
                  
                  {/* Coupon Code Entry */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]">Promo / VIP Coupon Code</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="WELCOME10 or GOLDEN15"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow bg-white border border-[#F5E6DA] px-3.5 py-2.5 rounded-full text-xs placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] text-[#2B2B2B] uppercase"
                      />
                      <button 
                        onClick={applyCoupon}
                        className="px-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-[10px] rounded-full transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-[#EB001B] font-medium">{couponError}</p>}
                    {appliedDiscount && (
                      <div className="flex justify-between items-center bg-white border border-[#F8BFCF]/40 px-3 py-1.5 rounded-lg">
                        <span className="text-[10px] font-semibold text-[#D4AF37]">
                          🎉 Code {appliedDiscount.code} applied ({appliedDiscount.percent}% off)
                        </span>
                        <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Subtotal & Totals */}
                  <div className="space-y-2 border-t border-[#F5E6DA]/60 pt-3 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-[#D4AF37] font-semibold">
                        <span>VIP Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>
                      <span>{cartSubtotal >= freeShippingThreshold ? 'FREE' : '$9.99'}</span>
                    </div>
                    
                    <div className="flex justify-between text-[#2B2B2B] font-bold text-base border-t border-[#F5E6DA] pt-2">
                      <span>Total Collection</span>
                      <span>${(cartTotal + (cartSubtotal >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Proceed to VIP Checkout
                  </button>

                  <p className="text-[9px] text-gray-400 text-center font-light">
                    Includes premium silk-wrapped luxury gift packaging.
                  </p>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Modal Container */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F5E6DA] max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 animate-fade-in-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF5F0] hover:bg-[#FFF0F3] border border-[#F5E6DA] flex items-center justify-center text-gray-400 hover:text-[#2B2B2B] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image */}
            <div className="md:col-span-5 h-64 md:h-full min-h-[280px] rounded-2xl overflow-hidden bg-[#FAF5F0] border border-[#F5E6DA]/30">
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right Column: Content details */}
            <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#FAF5F0] px-3 py-1 rounded-full">
                      {quickViewProduct.category}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#2B2B2B] mt-2 leading-tight">
                      {quickViewProduct.title}
                    </h3>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-[#D4AF37] text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(quickViewProduct.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-bold ml-1">{quickViewProduct.rating}</span>
                  <span className="text-gray-400 font-light text-xs">({quickViewProduct.reviewsCount} verified reviews)</span>
                </div>

                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">Key Skin Benefits:</p>
                  <ul className="space-y-1 text-xs text-gray-500 font-light">
                    {quickViewProduct.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients List */}
                <div className="space-y-1 pt-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">Active Ingredients:</p>
                  <p className="text-xs text-gray-400 font-light">
                    {quickViewProduct.ingredients.join(', ')}
                  </p>
                </div>

                {/* How To Use */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">Ritual Direction:</p>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {quickViewProduct.howToUse}
                  </p>
                </div>

              </div>

              {/* Price & Add to Cart */}
              <div className="pt-4 border-t border-[#F5E6DA]/50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Price</span>
                  <span className="text-2xl font-bold text-[#2B2B2B]">${quickViewProduct.price.toFixed(2)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toggleWishlist(quickViewProduct.id);
                    }}
                    className="p-3 bg-[#FAF5F0] hover:bg-[#FFF0F3] text-[#2B2B2B] hover:text-[#F8BFCF] border border-[#F5E6DA] rounded-full transition-colors cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-4.5 h-4.5 ${wishlist[quickViewProduct.id] ? 'fill-[#F8BFCF] text-[#F8BFCF]' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="px-6 py-3 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Collection</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 sm:pt-32">
          {/* Backdrop overlay */}
          <div 
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Search Box Container */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#F5E6DA] max-w-lg w-full relative z-10 p-5 space-y-4 animate-fade-in-up">
            
            {/* Input and icons */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search premium products (e.g. Elixir, Cream...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#FAF5F0] border border-[#F5E6DA] rounded-full text-sm focus:outline-none focus:border-[#D4AF37] text-[#2B2B2B]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-[#2B2B2B]"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Results list */}
            <div className="max-h-64 overflow-y-auto space-y-3 pt-2">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Search Results</p>
              
              {filteredProducts.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-6 font-light">No luxurious products match "{searchQuery}"</p>
              ) : (
                filteredProducts.map((prod) => (
                  <div 
                    key={prod.id}
                    onClick={(e) => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      openQuickView(prod, e);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF5F0] transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF5F0] border border-[#F5E6DA]/30 shrink-0">
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-semibold text-[#2B2B2B] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {prod.title}
                      </h4>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">{prod.category}</p>
                    </div>
                    <span className="text-xs font-bold text-[#2B2B2B]">${prod.price.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center border-t border-[#F5E6DA]/60 pt-3 text-[10px] text-gray-400">
              <span>Press ESC to close</span>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="hover:text-[#2B2B2B] underline cursor-pointer"
              >
                Close Search
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CHECKOUT SUCCESS MODAL */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsCheckoutSuccess(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#F8BFCF] max-w-md w-full relative z-10 p-8 text-center space-y-6 animate-fade-in-up">
            
            {/* Elegant Sparkly Check Circle */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 animate-spin-slow"></div>
              <div className="absolute w-16 h-16 rounded-full bg-[#FFF0F3] border border-[#F8BFCF]/40 flex items-center justify-center text-[#D4AF37] shadow-inner">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FAF5F0] border border-[#D4AF37]/20 text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Order Confirmed
              </span>
              <h3 className="font-serif text-3xl font-light text-[#2B2B2B]">
                Thank You For Your Purchase!
              </h3>
              <p className="text-xs text-gray-400 font-light max-w-xs mx-auto leading-relaxed">
                Your luxury beauty collection has been reserved. A confirmation email and tracking number are being prepared by our concierge.
              </p>
            </div>

            {/* Estimated delivery details */}
            <div className="bg-[#FAF5F0] p-4 rounded-xl border border-[#F5E6DA]/80 text-left space-y-2.5 text-xs text-gray-500">
              <div className="flex justify-between border-b border-[#F5E6DA]/50 pb-1.5">
                <span className="font-semibold text-[#2B2B2B]">Estimated Delivery:</span>
                <span>3 - 5 Business Days</span>
              </div>
              <div className="flex justify-between border-b border-[#F5E6DA]/50 pb-1.5">
                <span className="font-semibold text-[#2B2B2B]">Carrier:</span>
                <span>Zuzi White-Glove Express 🚚</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#2B2B2B]">Packaging:</span>
                <span>VIP Recyclable Silk Wrap Gift Box 🎁</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full py-4 bg-[#2B2B2B] hover:bg-[#D4AF37] text-white font-semibold tracking-widest uppercase text-xs rounded-full transition-all duration-300 shadow-md cursor-pointer"
            >
              Continue Radiating Beauty
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
