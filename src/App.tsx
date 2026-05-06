/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, Trophy, Flame, Clock, Play, X, Maximize2, Star, ChevronLeft, Info, HelpCircle } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  thumbnail: string;
  category: 'action' | 'puzzle' | 'arcade' | 'sports';
  rating: number;
  players: string;
  descriptions?: Record<string, string>;
  swf?: string;
  htmlUrl?: string;
}

const RufflePlayer = ({ swfUrl, title }: { swfUrl: string; title: string }) => {
  const containerRef = useMemo(() => ({ current: null as HTMLDivElement | null }), []);

  useEffect(() => {
    const initRuffle = async () => {
      if (!containerRef.current) return;
      
      // @ts-ignore
      const ruffle = window.RufflePlayer?.newest() || null;
      if (!ruffle) {
        console.error("Ruffle not found");
        return;
      }

      const player = ruffle.createPlayer();
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(player);
      
      try {
        await player.load(swfUrl);
        player.style.width = '100%';
        player.style.height = '100%';
      } catch (err) {
        console.error("Failed to load SWF:", err);
      }
    };

    initRuffle();
  }, [swfUrl]);

  return <div ref={(el) => containerRef.current = el} className="w-full h-full" id={`ruffle-container-${title.replace(/\s+/g, '-')}`} />;
};

enum LoadingState {
  INITIAL = 'initial',
  LOADING = 'loading',
  READY = 'ready',
  PLAYING = 'playing'
}

const GAMES: Game[] = [
  { 
    id: 'bloxorz', 
    title: 'Bloxorz', 
    thumbnail: 'https://www.friv.com/z/games/bloxorz/square-gamethumb-2-bloxorz.png', 
    category: 'puzzle', 
    rating: 5.0, 
    players: '10.5M',
    swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf',
    descriptions: {
      en: "The classic block-rolling puzzle. Navigate the cube to the hole without falling off!",
      id: "Puzzle guling balok klasik. Arahkan kubus ke lubang tanpa terjatuh!",
      es: "El clásico rompecabezas de rodar bloques. ¡Navega el cubo ke el agujero tanpa jatuh!",
    }
  },
  { id: '1', title: 'Neon Runner', thumbnail: 'https://picsum.photos/seed/neon/200/200', category: 'arcade', rating: 4.8, players: '1.2M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '2', title: 'Space Blast', thumbnail: 'https://picsum.photos/seed/space/200/200', category: 'action', rating: 4.5, players: '800K', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '3', title: 'Logic Blocks', thumbnail: 'https://picsum.photos/seed/logic/200/200', category: 'puzzle', rating: 4.7, players: '500K', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '4', title: 'Dunk Master', thumbnail: 'https://picsum.photos/seed/dunk/200/200', category: 'sports', rating: 4.6, players: '2.1M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '5', title: 'Retro Racer', thumbnail: 'https://picsum.photos/seed/race/200/200', category: 'arcade', rating: 4.4, players: '950K', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '101', title: 'Super Mario', thumbnail: 'https://picsum.photos/seed/mario/200/200', category: 'action', rating: 4.9, players: '5.4M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as3.swf' },
  { id: '102', title: 'Pac-Man', thumbnail: 'https://picsum.photos/seed/pacman/200/200', category: 'arcade', rating: 4.7, players: '3.1M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '103', title: 'Tetris 2026', thumbnail: 'https://picsum.photos/seed/tetris/200/200', category: 'puzzle', rating: 4.5, players: '1.5M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '104', title: 'Moto X3M', thumbnail: 'https://picsum.photos/seed/moto/200/200', category: 'sports', rating: 4.8, players: '8.2M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '105', title: 'Fireboy & Watergirl', thumbnail: 'https://picsum.photos/seed/fire/200/200', category: 'puzzle', rating: 5.0, players: '15M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '106', title: 'Slither.io', thumbnail: 'https://picsum.photos/seed/slither/200/200', category: 'arcade', rating: 4.3, players: '20M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '107', title: 'Among Us', thumbnail: 'https://picsum.photos/seed/among/200/200', category: 'action', rating: 4.6, players: '12M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '108', title: 'Billiards', thumbnail: 'https://picsum.photos/seed/pool/200/200', category: 'sports', rating: 4.4, players: '2.5M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '109', title: 'Chess Royale', thumbnail: 'https://picsum.photos/seed/chess/200/200', category: 'puzzle', rating: 4.7, players: '1.2M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '110', title: 'Cookie Clicker', thumbnail: 'https://picsum.photos/seed/cookie/200/200', category: 'arcade', rating: 4.2, players: '7.5M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '111', title: 'Subway Surfers', thumbnail: 'https://picsum.photos/seed/subway/200/200', category: 'action', rating: 4.8, players: '45M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '112', title: '8 Ball Pool', thumbnail: 'https://picsum.photos/seed/pool8/200/200', category: 'sports', rating: 4.9, players: '35M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '113', title: 'Candy Crush', thumbnail: 'https://picsum.photos/seed/candy/200/200', category: 'puzzle', rating: 4.5, players: '60M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { id: '114', title: 'Mine Blocks', thumbnail: 'https://picsum.photos/seed/mine/200/200', category: 'arcade', rating: 4.6, players: '4.2M', swf: 'https://cdn.jsdelivr.net/gh/ruffle-rs/ruffle@master/web/packages/core/test/test_assets/classic_as2.swf' },
  { 
    id: 'medieval-castle-defense', 
    title: 'Medieval Castle Defense', 
    thumbnail: 'https://cdn.htmlgames.com/MedievalCastleDefense/MedievalCastleDefense-300x250.jpg', 
    category: 'action', 
    rating: 4.8, 
    players: '1.2M', 
    htmlUrl: 'https://cdn.htmlgames.com/MedievalCastleDefense/',
    descriptions: {
      en: "Defend your castle from waves of invaders in this medieval strategy game!",
    }
  },
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.INITIAL);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    if (selectedGame && loadingState === LoadingState.LOADING) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoadingState(LoadingState.READY);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [selectedGame, loadingState]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setLoadingState(LoadingState.LOADING);
    setLoadingProgress(0);
  };

  const closeGame = () => {
    setSelectedGame(null);
    setLoadingState(LoadingState.INITIAL);
    setLoadingProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1e293b]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        {/* ... (Header content remains same) */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic uppercase text-indigo-400">
              Play<span className="text-white">Hub</span>
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <button className="hover:text-white transition-colors flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Trending
            </button>
            <button className="hover:text-white transition-colors flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> Top Rated
            </button>
            <button className="hover:text-white transition-colors flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Recent
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 transition-all duration-500">
        {/* Featured Hero Section */}
        <AnimatePresence mode="wait">
          {activeCategory === 'all' && searchQuery === '' && (
            <motion.section
              key="hero-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative rounded-3xl overflow-hidden aspect-[21/9] mb-8 group cursor-pointer border border-white/10"
              onClick={() => handleGameSelect(GAMES[0])}
            >
              <img
                src="https://www.friv.com/z/games/bloxorz/square-gamethumb-2-bloxorz.png"
                alt="Featured Game"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/60 to-transparent flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg shadow-red-500/20">Hot Now</div>
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest">Recommended Game</div>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white mb-4 uppercase italic tracking-tighter leading-none drop-shadow-2xl">
                  {GAMES[0].title}
                </h2>
                <p className="text-slate-300 max-w-md text-sm md:text-lg mb-8 font-medium line-clamp-3">
                  {GAMES[0].descriptions?.en}
                </p>
                <div className="flex gap-4">
                  <button id="hero-play-btn" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center gap-3">
                    <Play className="w-5 h-5 fill-white" /> Play Now
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Categories & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'action', 'puzzle', 'arcade', 'sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 14,291 Online</div>
            <div className="hidden sm:block select-none text-white/5">•</div>
            <div className="hidden sm:block">85 New Games Today</div>
          </div>
        </div>

        {/* Grid Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-400">
            {searchQuery ? `Searching for "${searchQuery}"` : activeCategory === 'all' ? 'Discover New Worlds' : `${activeCategory} Adventures`}
          </h3>
          <div className="text-[10px] font-black bg-slate-800 px-2 py-1 rounded text-slate-500 uppercase tracking-widest border border-white/5">
            {filteredGames.length} Games
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3"
        >
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="group relative cursor-pointer"
                onClick={() => handleGameSelect(game)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-white/5 group-hover:border-indigo-500/50 transition-all duration-300 shadow-2xl">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{game.category}</span>
                    <h3 className="font-bold text-white text-xs line-clamp-1">{game.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <Gamepad2 className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0f172a] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600/20 p-2 rounded-lg">
              <Gamepad2 className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="font-black italic uppercase tracking-tighter text-slate-300">PlayHub</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© 2026 PlayHub Games. All icons and games are property of their respective owners.</p>
          <div className="flex gap-6">
            <button className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy Policy</button>
            <button className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Terms of Use</button>
            <button className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Contact Us</button>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden"
          >
            {/* Friv Styled Header / HUD */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between pointer-events-none z-20">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={closeGame}
                className="pointer-events-auto flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border border-white/10 group shadow-2xl"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
              </motion.button>
              
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <h1 className="text-white font-black italic uppercase tracking-tighter text-2xl drop-shadow-xl">{selectedGame.title}</h1>
                <div className="flex items-center gap-4 mt-1">
                   <div className="text-amber-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" /> {selectedGame.rating} Rating
                   </div>
                   <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">•</div>
                   <div className="text-indigo-400 text-[10px] font-black uppercase tracking-widest underline underline-offset-4">{selectedGame.category} Game</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="pointer-events-auto flex gap-3"
              >
                <button className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-2xl transition-all border border-white/10 shadow-2xl">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={closeGame}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-3 rounded-2xl transition-all border border-red-500/20 shadow-2xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-full md:max-w-6xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 mx-4"
            >
              {/* Game Viewport Container */}
              <div className="w-full h-full bg-[#020617] relative flex items-center justify-center">
                
                {/* Background Decor */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img src={selectedGame.thumbnail} className="w-full h-full object-cover blur-[80px] opacity-20 scale-150" referrerPolicy="no-referrer" />
                </div>

                {/* Loading Overlay */}
                <AnimatePresence>
                  {loadingState !== LoadingState.PLAYING && (
                    <motion.div
                      key="loading-overlay"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#020617]/40 backdrop-blur-sm p-8"
                    >
                      {/* Spinner Box */}
                      <div className="bg-[#1e293b]/80 border border-white/10 p-12 rounded-[2rem] shadow-3xl text-center max-w-md w-full relative overflow-hidden group">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                        
                        <div className="relative mb-10">
                          {loadingState === LoadingState.LOADING ? (
                            <div className="w-24 h-24 relative mx-auto">
                              <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="absolute inset-0 border-4 border-t-indigo-500 rounded-full" 
                              />
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white uppercase tabular-nums">
                                {Math.floor(loadingProgress)}%
                              </div>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setLoadingState(LoadingState.PLAYING)}
                              className="w-28 h-28 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all group/btn"
                            >
                              <Play className="w-12 h-12 text-white fill-white ml-2 drop-shadow-lg group-hover/btn:scale-110 transition-transform" />
                            </motion.button>
                          )}
                        </div>

                        <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white mb-2">{selectedGame.title}</h3>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8 px-4 italic">
                          "{selectedGame.descriptions?.en || "In uncharted time and space, in an existence unimaginably different from our own..."}"
                        </p>

                        {/* Friv Stats Box */}
                        <div className="grid grid-cols-3 gap-2">
                           <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Plays</div>
                              <div className="text-xs font-black text-indigo-400 uppercase">{selectedGame.players}</div>
                           </div>
                           <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Storage</div>
                              <div className="text-xs font-black text-indigo-400 uppercase">~12 MB</div>
                           </div>
                           <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Server</div>
                              <div className="text-xs font-black text-indigo-400 uppercase">ONLINE</div>
                           </div>
                        </div>

                        {/* Progress Bar (Visible during loading) */}
                        <AnimatePresence>
                          {loadingState === LoadingState.LOADING && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800"
                            >
                              <motion.div 
                                className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,1)]"
                                style={{ width: `${loadingProgress}%` }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Language Tip */}
                      <div className="mt-8 flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                         <div className="flex -space-x-2">
                            {['🇺🇸', '🇮🇩', '🇪🇸', '🇫🇷'].map((flag, i) => (
                              <span key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-sm shadow-xl">{flag}</span>
                            ))}
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available in 12 languages</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actual Game Frame */}
                {loadingState === LoadingState.PLAYING && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full"
                  >
                    {selectedGame.swf ? (
                      <RufflePlayer swfUrl={selectedGame.swf} title={selectedGame.title} />
                    ) : selectedGame.htmlUrl ? (
                      <iframe
                        src={selectedGame.htmlUrl}
                        className="w-full h-full border-none"
                        title={selectedGame.title}
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-sm">
                        Game source missing
                      </div>
                    )}
                    
                    {/* Game UI Overlay (HUD) */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                       <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10 pointer-events-auto">
                          <button className="text-white hover:text-indigo-400 transition-colors"><HelpCircle className="w-4 h-4" /></button>
                          <div className="w-px h-3 bg-white/20" />
                          <button className="text-white hover:text-indigo-400 transition-colors"><Info className="w-4 h-4" /></button>
                       </div>
                       
                       <div className="bg-indigo-600 px-6 py-2 rounded-xl flex items-center gap-3 border border-indigo-400/50 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Live Session:</span>
                          <span className="text-xs font-black text-white uppercase tracking-tighter">04:29:11</span>
                       </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Sidebar Controls (Hidden on small screens) */}
            <div className="hidden lg:flex absolute right-12 flex-col gap-6 items-center">
               <button className="group flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-slate-800 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-400/50 transition-all group-hover:scale-110 shadow-2xl">
                     <Star className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:fill-white" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Favorite</span>
               </button>
               <button className="group flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-slate-800 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-400/50 transition-all group-hover:scale-110 shadow-2xl">
                     <Play className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:fill-white translate-x-0.5" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-widest transition-colors">Walkthrough</span>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


