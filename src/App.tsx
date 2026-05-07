/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  useNavigate, 
  useSearchParams,
  Link
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Gamepad2, 
  Trophy, 
  Flame, 
  Play, 
  X, 
  Maximize2, 
  Star, 
  ChevronLeft, 
  Info, 
  Menu,
  Car,
  Swords,
  Puzzle,
  Ghost,
  Users,
  Target,
  Rocket,
  Zap,
  LayoutGrid,
  Loader2,
  ExternalLink,
  Heart,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Crown
} from 'lucide-react';

// --- Types ---

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Membership' | 'Currency' | 'Items';
}

interface UserStats {
  coins: number;
  isPremium: boolean;
}

interface GDGame {
  id: string;
  title: string;
  asset: string[];
  category: string;
  description: string;
  url: string;
  width: number;
  height: number;
  source?: 'gd' | 'htmlgames';
}

const FEATURED_GAMES: GDGame[] = [
  {
    id: 'ClassicWordSearch',
    title: 'Classic Word Search',
    asset: ['https://www.htmlgames.com/uploaded/game/thumb/classicwordsearch300200.webp'],
    category: 'Word',
    description: 'A classic word search experience with thousands of words to find.',
    url: 'https://cdn.htmlgames.com/ClassicWordSearch/',
    width: 800,
    height: 600,
    source: 'htmlgames'
  },
  {
    id: 'DailyWordSearch',
    title: 'Daily Word Search',
    asset: ['https://www.htmlgames.com/uploaded/game/thumb/dailywordsearch300200.webp'],
    category: 'Word',
    description: 'Test your vocabulary with a new set of words every single day.',
    url: 'https://cdn.htmlgames.com/DailyWordSearch/',
    width: 800,
    height: 600,
    source: 'htmlgames'
  },
  {
    id: 'bece97115f26426491fa08e409e545aa',
    title: 'Epic Tower Battle',
    asset: ['https://img.gamedistribution.com/bece97115f26426491fa08e409e545aa-512x512.jpeg'],
    category: 'Action',
    description: 'An intense action game provided by our premium partners.',
    url: 'https://html5.gamedistribution.com/bece97115f26426491fa08e409e545aa/',
    width: 800,
    height: 600,
    source: 'gd'
  },
  {
    id: 'ee798269399449d0b1acb60f81dff1fc',
    title: 'Cyber Arena DX',
    asset: ['https://img.gamedistribution.com/ee798269399449d0b1acb60f81dff1fc-512x512.jpeg'],
    category: 'Action',
    description: 'Experience high-octane combat in this premium action title.',
    url: 'https://html5.gamedistribution.com/ee798269399449d0b1acb60f81dff1fc/',
    width: 800,
    height: 600,
    source: 'gd'
  }
];

const SHOP_PRODUCTS: Product[] = [
  {
    id: 'premium-pass',
    name: 'ELITE SEASON PASS',
    price: 9.99,
    description: 'Unlock all premium games and remove all ads for 30 days.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
    category: 'Membership'
  },
  {
    id: 'gold-pack',
    name: '5,000 HUB COINS',
    price: 4.99,
    description: 'Premium currency to use across all supported HTML5 games.',
    image: 'https://images.unsplash.com/photo-1640341719935-b606da0d22ba?q=80&w=800&auto=format&fit=crop',
    category: 'Currency'
  },
  {
    id: 'vip-status',
    name: 'LIFETIME VIP',
    price: 49.99,
    description: 'Permanent VIP status, exclusive badges, and early access to new releases.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    category: 'Membership'
  },
  {
    id: 'arcade-bundle',
    name: 'RETRO BUNDLE',
    price: 2.99,
    description: 'A collection of 10 classic arcade games unlocked for offline play.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    category: 'Items'
  }
];

// --- Home Component ---

const Home = ({ userStats, setUserStats, cart, setCart }: { userStats: UserStats, setUserStats: any, cart: Product[], setCart: any }) => {
  const [games, setGames] = useState<GDGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isStoreOpen, setStoreOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const navigate = useNavigate();

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);

  const addToCart = (product: Product) => {
    setCart((prev: Product[]) => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev: Product[]) => prev.filter((item: Product) => item.id !== id));
  };

  const handlePurchase = async () => {
    if (cart.length === 0) return;
    setIsPurchasing(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update user stats based on items
    let newCoins = userStats.coins;
    let newPremium = userStats.isPremium;
    
    cart.forEach(item => {
      if (item.category === 'Currency') newCoins += 5000;
      if (item.category === 'Membership') newPremium = true;
    });

    setUserStats({ coins: newCoins, isPremium: newPremium });
    setIsPurchasing(false);
    
    // Navigate to success page with order details
    navigate('/success', { 
      state: { 
        total: cartTotal,
        items: cart.length,
        timestamp: new Date().toISOString()
      } 
    });
    
    setCart([]);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://catalog.api.gamedistribution.com/api/v2.0/rss/all/?collection=all&type=all&amount=100&format=json');
        const data = await response.json();
        
        // Merge with manual games while ensuring unique IDs
        const uniqueGamesMap = new Map();
        
        // Add featured games first
        FEATURED_GAMES.forEach(g => {
          if (g.id) uniqueGamesMap.set(g.id, g);
        });
        
        // Add API games, but don't overwrite if ID already exists
        if (Array.isArray(data)) {
          data.forEach((g: any) => {
            if (g.id && !uniqueGamesMap.has(g.id)) {
              uniqueGamesMap.set(g.id, { ...g, source: 'gd' });
            }
          });
        }
          
        setGames(Array.from(uniqueGamesMap.values()));
      } catch (err) {
        console.error("Failed to fetch games:", err);
        setGames(FEATURED_GAMES);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(games.map(g => g.category).filter(c => typeof c === 'string'));
    return ['All', ...Array.from(cats)].sort();
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      if (!game) return false;
      const title = game.title?.toLowerCase() || '';
      const query = searchQuery?.toLowerCase() || '';
      const matchesSearch = title.includes(query);
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, games]);

  const categoryIcons: Record<string, any> = {
    'Action': Swords,
    'Puzzle': Puzzle,
    'Arcade': Ghost,
    'Racing': Car,
    'Shooting': Target,
    'Sports': Trophy,
    'Adventure': Rocket,
    'Driving': Car,
    'Multiplayer': Users,
    'Word': Puzzle
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans">
      {/* Header - Fixed & Blurred */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform shadow-2xl shadow-blue-600/30">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Play<span className="text-blue-500">-Hub</span>
            </h1>
          </Link>
          
          <div className="hidden lg:flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
             <button onClick={() => { setActiveCategory('All'); setStoreOpen(false); }} className={`hover:text-white transition-colors ${!isStoreOpen && activeCategory === 'All' ? 'text-blue-500' : ''}`}>Browse</button>
             <button onClick={() => setStoreOpen(true)} className={`hover:text-white transition-colors ${isStoreOpen ? 'text-blue-500' : ''}`}>Store</button>
             <button className="hover:text-white transition-colors">Popular</button>
          </div>
        </div>

        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search thousands of free games..."
            className="w-full bg-white/5 border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
           {userStats.coins > 0 && (
             <div className="hidden sm:flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500">{userStats.coins.toLocaleString()}</span>
             </div>
           )}
           {userStats.isPremium && (
             <div className="hidden sm:flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
                <Crown className="w-3 h-3 text-blue-500 fill-blue-500" />
                <span className="text-[10px] font-black text-blue-500 tracking-widest uppercase">ELITE</span>
             </div>
           )}
           <button 
             onClick={() => { setCheckoutOpen(true); }}
             className="relative p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
           >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#050505]">
                  {cart.length}
                </span>
              )}
           </button>
           <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
              <Heart className="w-5 h-5" />
           </button>
           <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95">
              Login
           </button>
        </div>
      </nav>

      {/* Main Grid Content */}
      <main className="pt-24 pb-12 px-6 md:px-12 transition-all">
        {isStoreOpen ? (
          <div className="space-y-12 max-w-7xl mx-auto">
             <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 shadow-3xl text-center md:text-left">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                         <Crown className="w-3 h-3" /> Digital Marketplace
                      </div>
                      <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-white">Upgrade Your <br/><span className="text-blue-200">Play-Hub</span> Experience</h1>
                      <p className="text-blue-100 text-lg max-w-xl font-medium">Unlock the full potential of global gaming. Zero ads, unlimited access, and exclusive rewards await.</p>
                   </div>
                   <div className="w-full md:w-auto">
                      <div className="relative p-8 bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl rotate-3">
                         <CreditCard className="w-24 h-24 text-white opacity-20 absolute -top-4 -right-4 -rotate-12" />
                         <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Featured Offer</p>
                            <h3 className="text-3xl font-black italic uppercase tracking-tight text-white line-clamp-1">ELITE SEASON PASS</h3>
                            <div className="text-4xl font-black text-white">$9.99</div>
                            <button 
                              onClick={() => addToCart(SHOP_PRODUCTS[0])}
                              className="w-full bg-white text-blue-600 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all active:scale-95 shadow-2xl"
                            >
                               Get it Now
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {SHOP_PRODUCTS.map(product => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    className="bg-[#0f1016] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-blue-500/50 transition-all flex flex-col shadow-2xl"
                  >
                     <div className="aspect-[4/3] relative overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase border border-white/10">
                           {product.category}
                        </div>
                     </div>
                     <div className="p-8 flex-1 flex flex-col gap-4">
                        <div>
                           <h3 className="text-xl font-black italic uppercase tracking-tight group-hover:text-blue-400 transition-colors">{product.name}</h3>
                           <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">{product.category} Item</p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{product.description}</p>
                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                           <span className="text-2xl font-black text-white">${product.price}</span>
                           <button 
                             onClick={() => addToCart(product)}
                             className="bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 border border-white/5 hover:border-blue-500"
                           >
                              Add
                           </button>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
             <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
             <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Synchronizing Library</p>
          </div>
        ) : (
          <>
            {/* Featured Hero (Optional look) */}
            {activeCategory === 'All' && !searchQuery && games.length > 0 && (
               <div 
                 className="relative w-full aspect-[21/9] md:aspect-[21/6] rounded-[2rem] overflow-hidden mb-12 group cursor-pointer border border-white/5 shadow-3xl"
                 onClick={() => navigate(`/player?id=${games[0].id}`)}
               >
                  <img src={games[0].asset?.[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] brightness-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent p-8 md:p-16 flex flex-col justify-end">
                     <div className="bg-blue-600 self-start px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-4">Trending Now</div>
                     <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">{games[0].title}</h2>
                     <button className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:text-white transition-all w-fit shadow-2xl">
                        <Play className="w-5 h-5 fill-current" /> Play Free
                     </button>
                  </div>
               </div>
            )}

            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black uppercase italic tracking-tighter">
                  {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory === 'All' ? 'Must Play Games' : `${activeCategory} Collection`}
               </h3>
               <div className="flex gap-2">
                  {['Action', 'Puzzle', 'Racing', 'Sports'].slice(0, 4).map(c => (
                     <button 
                       key={c}
                       onClick={() => setActiveCategory(c)}
                       className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === c ? 'bg-blue-600 border-blue-600' : 'border-white/10 hover:border-white/30 text-slate-400'}`}
                     >
                        {c}
                     </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              <AnimatePresence>
                {filteredGames.slice(0, 100).map((game, idx) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                    onClick={() => navigate(`/player?id=${game.id}`)}
                  >
                    <div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 transition-all group-hover:border-blue-500/50 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)]">
                      <img
                        src={game.asset?.[0]}
                        alt={game.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
                        loading="lazy"
                      />
                      
                      {/* Floating Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                            <Play className="w-6 h-6 text-black fill-black ml-1" />
                         </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/20 to-transparent">
                         <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">{game.category}</span>
                         <h4 className="font-bold text-white text-xs line-clamp-1 group-hover:text-blue-100 transition-colors uppercase italic tracking-tight">{game.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
             <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-3xl" onClick={() => setCheckoutOpen(false)} />
             
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-[#0f1016] border border-white/5 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-3xl relative flex flex-col md:flex-row h-[630px]"
             >
                {/* Simplified Modal Interior (Removal of success state as it's now a route) */}
                <div className="flex-1 p-10 flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-black uppercase italic tracking-tighter">Your <span className="text-blue-500">Cart</span></h2>
                      <button onClick={() => setCheckoutOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                         <X className="w-6 h-6" />
                      </button>
                   </div>

                   <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                           <ShoppingCart className="w-16 h-16 mb-4" />
                           <p className="font-bold uppercase tracking-widest text-xs">Cart is empty</p>
                        </div>
                      ) : (cart as Product[]).map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group">
                           <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                           <div className="flex-1">
                              <h4 className="font-bold text-sm uppercase italic">{item.name}</h4>
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{item.category}</p>
                           </div>
                           <div className="text-right">
                              <div className="font-black text-white">${item.price}</div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                              >
                                Remove
                              </button>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-white/5 mt-auto">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                         <span className="text-3xl font-black text-white">${cartTotal.toFixed(2)}</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 bg-blue-600 p-10 flex flex-col justify-between text-white relative">
                   <div className="absolute top-0 right-0 p-12 opacity-10">
                      <CreditCard className="w-64 h-64 rotate-12" />
                   </div>

                   <div className="relative space-y-6">
                      <h4 className="text-2xl font-black uppercase italic tracking-tighter">Secure Checkout</h4>
                      <p className="text-blue-100 text-sm leading-relaxed">Experience safe and synchronized payments across all your devices. All digital assets are delivered instantly.</p>
                      
                      <div className="space-y-4 pt-4">
                         <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-200" />
                            <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encrypted</span>
                         </div>
                         <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-200" />
                            <span className="text-xs font-bold uppercase tracking-widest">Instant Activation</span>
                         </div>
                      </div>
                   </div>

                   <div className="relative space-y-4">
                      <button 
                        onClick={handlePurchase}
                        disabled={cart.length === 0 || isPurchasing}
                        className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                         {isPurchasing ? (
                           <>
                             <Loader2 className="w-5 h-5 animate-spin" /> Processing
                           </>
                         ) : (
                           `Confirm Purchase - $${cartTotal.toFixed(2)}`
                         )}
                      </button>
                      <p className="text-[10px] text-center text-blue-200 font-bold uppercase tracking-[0.2em]">Secured by Play-Hub Systems</p>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Player Component ---

const Player = () => {
  const [params] = useSearchParams();
  const gameId = params.get('id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  if (!gameId) return <div className="text-center p-20 uppercase font-black tracking-widest text-red-500">Invalid Game ID</div>;

  // Determine game source and URL
  const featuredGame = FEATURED_GAMES.find(g => g.id === gameId);
  
  // Construct the base game URL
  let baseGameUrl = featuredGame 
    ? featuredGame.url 
    : `https://html5.gamedistribution.com/${gameId}/`;

  // Append referrer as requested by the user
  // (MASUKIN URL WEB NYA REFFERRER DAN KASIH KE GAMEPATH)
  const currentOrigin = window.location.origin;
  const gamePath = `/games/${gameId}`;
  const referrerUrl = `${currentOrigin}${gamePath}`;
  const gameUrl = baseGameUrl.includes('?') 
    ? `${baseGameUrl}&gd_sdk_referrer_url=${encodeURIComponent(referrerUrl)}`
    : `${baseGameUrl}?gd_sdk_referrer_url=${encodeURIComponent(referrerUrl)}`;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* Floating Controls */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3">
         <button 
           onClick={() => navigate('/')}
           className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all font-black uppercase text-[10px] tracking-widest border border-white/20 active:scale-95 group shadow-2xl"
         >
           <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
         </button>
      </div>

      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
         <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-all shadow-xl active:scale-95 border border-white/20">
           <Maximize2 className="w-4 h-4" />
         </button>
         <button className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all shadow-xl active:scale-95 border border-white/20" onClick={() => navigate('/')}>
           <X className="w-4 h-4" />
         </button>
      </div>

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-10 gap-6">
           <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin shadow-2xl shadow-blue-500/40" />
           <div className="text-center">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Preparing Simulator</h2>
              <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px] animate-pulse">Establishing secure connection...</p>
           </div>
        </div>
      )}

      <iframe
        src={gameUrl}
        className="w-full h-full border-none shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        title="Game Player"
        allowFullScreen
        onLoad={() => setLoading(false)}
      />

      {/* Mini Info Bar */}
      {!loading && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full flex items-center gap-6 z-50 opacity-0 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-black text-white">4.9/5.0</span>
           </div>
           <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              <Users className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black text-white">2.4M ACTIVE</span>
           </div>
           <button className="flex items-center gap-2 border-l border-white/10 pl-6 text-slate-400 hover:text-white transition-colors">
              <ExternalLink className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
           </button>
        </div>
      )}
    </div>
  );
};

// --- Success Component ---

const Success = () => {
  const navigate = useNavigate();
  const { state } = useMemo(() => {
    try {
      // Access storage/state if passed
      return { state: (window as any).history.state?.usr };
    } catch(e) {
      return { state: null };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-[#0f1016] border border-white/5 rounded-[3rem] p-12 text-center shadow-3xl relative"
      >
        <div className="flex justify-center mb-8">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
             className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)]"
           >
              <CheckCircle2 className="w-12 h-12 text-white" />
           </motion.div>
        </div>

        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Payment <span className="text-green-500">Successful</span></h1>
        <p className="text-slate-400 text-lg mb-10 font-medium">Your assets have been processed and added to your hub profile. Welcome to the elite tier of gaming.</p>

        <div className="grid grid-cols-2 gap-4 mb-10">
           <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Items Purchased</p>
              <p className="text-xl font-black italic uppercase">{state?.items || 1} Products</p>
           </div>
           <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Transaction Total</p>
              <p className="text-xl font-black italic uppercase text-green-400">${state?.total?.toFixed(2) || '0.00'}</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           <button 
             onClick={() => navigate('/')}
             className="flex-1 bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
           >
              Back to Home
           </button>
           <button 
             onClick={() => navigate('/')} // In a real app this might go to an inventory page
             className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all border border-white/10 active:scale-95"
           >
              View Inventory
           </button>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center gap-3 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
         <ShieldCheck className="w-4 h-4" /> SSL SECURED TRANSACTION
      </div>
    </div>
  );
};


// --- App Root ---

export default function App() {
  const [userStats, setUserStats] = useState<UserStats>({ coins: 0, isPremium: false });
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userStats={userStats} setUserStats={setUserStats} cart={cart} setCart={setCart} />} />
        <Route path="/player" element={<Player />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </Router>
  );
}
