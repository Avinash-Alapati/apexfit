/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Globe, Music, Flame, Award, Heart, ExternalLink } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  genre: string;
  duration: string;
  language: string;
  url: string; // Simulated or royalty-free audio path if available
}

// Premium playlist list for official Spotify embeds
const spotifyPlaylists = {
  hiit: {
    title: "Hardcore HIIT Workout",
    desc: "Fast-tempo tracks to spike up cardiac rates (140-160 BPM)",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX76t63uN1Y7p"
  },
  beast: {
    title: "Beast Mode Lifting",
    desc: "Heavy weightlifting motivations spanning metal, hip-hop and electronic and rock",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX70gQrN8is7Y"
  },
  cyber: {
    title: "Cyberpunk Pacing Stride",
    desc: "Neon synthesizers and immersive driving beats for laser focus runs",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX84S2XorIHN0"
  },
  recovery: {
    title: "Yoga Stretch & Recovery",
    desc: "Harmonious lo-fi acoustic and serene stretch frequency sessions",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9uKNf5j9j6g"
  }
};

export default function ChallengesPanel() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [progress, setProgress] = useState<number>(35); // simulated starting position %
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('hiit');

  // Custom Spotify play list dynamic imports
  const [customPlaylistUrl, setCustomPlaylistUrl] = useState<string>(() => {
    return localStorage.getItem('apex_custom_spotify_url') || '';
  });
  const [customInputTemp, setCustomInputTemp] = useState<string>('');
  const [importFeedback, setImportFeedback] = useState<string>('');

  const handleSaveCustomPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    const input = customInputTemp.trim();
    if (!input) {
      setImportFeedback('Please provide a valid Spotify playlist Link, URI or ID');
      return;
    }

    let resolvedEmbed = '';
    if (input.includes('/embed/')) {
      resolvedEmbed = input;
    } else if (input.includes('spotify.com/')) {
      try {
        const url = new URL(input);
        const parts = url.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
          resolvedEmbed = `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`;
        }
      } catch (_) {
        resolvedEmbed = '';
      }
    } else if (input.length >= 15 && !input.includes(' ')) {
      resolvedEmbed = `https://open.spotify.com/embed/playlist/${input}`;
    }

    if (!resolvedEmbed) {
      setImportFeedback('Error parsing link. Format should be: https://open.spotify.com/playlist/...');
      return;
    }

    localStorage.setItem('apex_custom_spotify_url', input);
    setCustomPlaylistUrl(input);
    setImportFeedback('Successfully imported your custom Spotify Playlist!');
    setCustomInputTemp('');
    setTimeout(() => setImportFeedback(''), 4000);
  };

  const getEmbedUrl = (key: string) => {
    if (key !== 'custom') {
      return spotifyPlaylists[key as keyof typeof spotifyPlaylists]?.embedUrl || '';
    }
    
    if (!customPlaylistUrl) return '';
    if (customPlaylistUrl.includes('/embed/')) return customPlaylistUrl;
    
    try {
      const url = new URL(customPlaylistUrl);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return `https://open.spotify.com/embed/${parts[0]}/${parts[1]}`;
      }
    } catch (_) {}
    
    if (customPlaylistUrl.length >= 15 && !customPlaylistUrl.includes(' ')) {
      return `https://open.spotify.com/embed/playlist/${customPlaylistUrl}`;
    }
    return '';
  };

  const getSpotifyDirectUrl = (key: string) => {
    if (key === 'hiit') return 'https://open.spotify.com/playlist/37i9dQZF1DX76t63uN1Y7p';
    if (key === 'beast') return 'https://open.spotify.com/playlist/37i9dQZF1DX70gQrN8is7Y';
    if (key === 'cyber') return 'https://open.spotify.com/playlist/37i9dQZF1DX84S2XorIHN0';
    if (key === 'recovery') return 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5j9j6g';
    if (key === 'custom') {
      return customPlaylistUrl || '';
    }
    return '';
  };

  // Interactive interval to simulate progress bar sliding when track is "playing"
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying]);

  // Curated list of energy workout hits with language preference tag
  const WORKOUT_SONGS: Track[] = [
    // English
    { id: 'en1', title: 'Till I Collapse', artist: 'Eminem', bpm: 171, genre: 'Hip Hop / Motivation', duration: '4:57', language: 'English', url: '' },
    { id: 'en2', title: 'Remember the Name', artist: 'Fort Minor', bpm: 110, genre: 'Workout Metal Rap', duration: '3:50', language: 'English', url: '' },
    { id: 'en3', title: 'Unstoppable', artist: 'Sia', bpm: 145, genre: 'Pop Anthem', duration: '3:38', language: 'English', url: '' },
    // Hindi
    { id: 'hi1', title: 'Zinda (Bhaag Milkha Bhaag)', artist: 'Siddharth Mahadevan', bpm: 150, genre: 'Inspiring Rock', duration: '3:31', language: 'Hindi', url: '' },
    { id: 'hi2', title: 'Kar Har Maidaan Fateh', artist: 'Sukhwinder Singh', bpm: 125, genre: 'Epic Uplift', duration: '5:11', language: 'Hindi', url: '' },
    { id: 'hi3', title: 'Chak De India Title', artist: 'Sukhwinder Singh', bpm: 130, genre: 'Stadium Cheer', duration: '4:43', language: 'Hindi', url: '' },
    // Punjabi
    { id: 'pb1', title: 'Moosewala Workout Drive', artist: 'Sidhu Moose Wala (Remix)', bpm: 142, genre: 'Punjabi Hard Beat', duration: '4:12', language: 'Punjabi', url: '' },
    { id: 'pb2', title: 'Aarambh Hai Prachand Mix', artist: 'DJ Performance Beat', bpm: 115, genre: 'Aggressive Folk', duration: '3:50', language: 'Punjabi', url: '' },
    { id: 'pb3', title: 'The G.O.A.T.', artist: 'Diljit Dosanjh', bpm: 128, genre: 'Folk Trap', duration: '3:43', language: 'Punjabi', url: '' },
    // Telugu
    { id: 'te1', title: 'Dookudu Title Track', artist: 'Shankar Mahadevan', bpm: 135, genre: 'Heroic Energy', duration: '4:20', language: 'Telugu', url: '' },
    { id: 'te2', title: 'Saahore Baahubali', artist: 'Daler Mehndi', bpm: 112, genre: 'Epic Power Lift', duration: '3:22', language: 'Telugu', url: '' },
    { id: 'te3', title: 'Bheemla Nayak Title', artist: 'Thaman S', bpm: 140, genre: 'Massive Folk Beat', duration: '3:15', language: 'Telugu', url: '' },
    // Spanish
    { id: 'es1', title: 'Gasolina Track Strike', artist: 'Daddy Yankee', bpm: 136, genre: 'Reggaeton Cardio', duration: '3:12', language: 'Spanish', url: '' },
    { id: 'es2', title: 'Danza Kuduro', artist: 'Don Omar', bpm: 130, genre: 'Upbeat Latin', duration: '3:19', language: 'Spanish', url: '' },
    { id: 'es3', title: 'Mi Gente', artist: 'J Balvin', bpm: 125, genre: 'Samba Electronic', duration: '3:05', language: 'Spanish', url: '' }
  ];

  // Filter songs by selected language
  const filteredSongs = selectedLanguage === 'All' 
    ? WORKOUT_SONGS
    : WORKOUT_SONGS.filter(s => s.language === selectedLanguage);

  const currentTrack = filteredSongs[currentTrackIndex] || filteredSongs[0] || WORKOUT_SONGS[0];

  const handleNextTrack = () => {
    setCurrentTrackIndex(p => (p + 1) % filteredSongs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(p => (p - 1 + filteredSongs.length) % filteredSongs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentTrackIndex(0);
    setProgress(0);
  };

  return (
    <div className="space-y-8" id="music-hub-tab-page">
      {/* Introduction Banner header */}
      <section className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-orange text-[10px] font-mono font-bold uppercase tracking-widest bg-orange/10 px-2.5 py-1 rounded-full inline-block">
              INTEGRATED WORKOUT PLAYER
            </span>
            <h3 className="font-display text-2xl font-black text-white mt-2">Athlete Workout Music Hub</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Power up your cardio pacing and training focus. Load official high-energy Spotify lists or listen to in-app high-tempo songs sorted by language preferences.
            </p>
          </div>
          <Music className="w-12 h-12 text-orange animate-pulse" />
        </div>
      </section>

      {/* Main Grid: Spotify Interactive Box & Local Media Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Spotify Playlist Stream Embed Container (Lines: lg-colspan-7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange" />
                  Spotify Athlete Playlists
                </h4>
                <p className="text-xs text-zinc-450">Listen directly on your official Spotify account</p>
              </div>
            </div>

            {/* Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {Object.entries(spotifyPlaylists).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlaylist(key)}
                  className={`p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all line-clamp-1 cursor-pointer ${
                    selectedPlaylist === key
                      ? 'bg-orange text-white font-bold shadow-md shadow-orange/30'
                      : 'bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {key === 'hiit' && '⚡ HIIT Cardio'}
                  {key === 'beast' && '🏋️‍♂️ Heavy Lift'}
                  {key === 'cyber' && '🏃 Synthesizer'}
                  {key === 'recovery' && '🧘 Recovery'}
                </button>
              ))}
              <button
                onClick={() => setSelectedPlaylist('custom')}
                className={`p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all line-clamp-1 cursor-pointer ${
                  selectedPlaylist === 'custom'
                    ? 'bg-orange text-white font-bold shadow-md shadow-orange/30'
                    : 'bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 hover:text-white'
                }`}
              >
                📥 Custom Import
              </button>
            </div>

            {/* Description and Spotify Embed Iframe player */}
            <div className="space-y-3">
              {selectedPlaylist === 'custom' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-950/80 rounded-2xl border border-white/5 space-y-3">
                    <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>📥 Import Spotify Athlete Playlists</span>
                    </p>
                    <p className="text-[10px]/relaxed text-zinc-400">
                      Want to train with your own workout tracks? Paste any public Spotify Playlist link, Album, or Track URL below. We will parse and load the responsive player embed inside your dashboard.
                    </p>
                    
                    <form onSubmit={handleSaveCustomPlaylist} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://open.spotify.com/playlist/..."
                        value={customInputTemp}
                        onChange={(e) => setCustomInputTemp(e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 flex-1 focus:outline-none focus:border-orange transition-all font-mono"
                      />
                      <button
                        type="submit"
                        className="bg-orange hover:bg-orange/90 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl transition-all cursor-pointer"
                      >
                        Import
                      </button>
                    </form>

                    {importFeedback && (
                      <p className={`text-[10px] font-bold ${importFeedback.includes('Error') || importFeedback.includes('Please') ? 'text-rose-405' : 'text-emerald-450'}`}>
                        {importFeedback}
                      </p>
                    )}

                    {customPlaylistUrl && (
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">✔ Active Custom Deck:</span>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.removeItem('apex_custom_spotify_url');
                            setCustomPlaylistUrl('');
                            setImportFeedback('Cleared custom playlist successfully.');
                            setTimeout(() => setImportFeedback(''), 3000);
                          }}
                          className="text-[9px] text-zinc-500 hover:text-rose-400 font-mono underline"
                        >
                          Clear Playlist
                        </button>
                      </div>
                    )}
                  </div>

                  {customPlaylistUrl ? (
                    <div className="w-full bg-zinc-950 rounded-2xl overflow-hidden aspect-video border border-white/5 shadow-inner">
                      <iframe
                        src={getEmbedUrl('custom')}
                        width="100%"
                        height="100%"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Player"
                        className="rounded-2xl border-0"
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-zinc-950/40 border border-zinc-800 rounded-2xl space-y-2">
                      <p className="text-xs text-zinc-400 font-semibold">No custom playlist link imported yet.</p>
                      <p className="text-[10px] text-zinc-500">Paste your favorite premium or public high-tempo list to stream it in-app.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-950/60 rounded-xl border border-white/5">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      {spotifyPlaylists[selectedPlaylist as keyof typeof spotifyPlaylists].title}
                    </p>
                    <p className="text-[10px] text-zinc-450 mt-0.5">
                      {spotifyPlaylists[selectedPlaylist as keyof typeof spotifyPlaylists].desc}
                    </p>
                  </div>

                  {/* Real high fidelity responsive Spotify Embed iframe player */}
                  <div className="w-full bg-zinc-950 rounded-2xl overflow-hidden aspect-video border border-white/5 shadow-inner">
                    <iframe
                      src={getEmbedUrl(selectedPlaylist)}
                      width="100%"
                      height="100%"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="Spotify Player"
                      className="rounded-2xl border-0"
                    />
                  </div>
                </div>
              )}

              {/* Direct Player Launch Support Option to handle Iframe sandbox cookie filters ("Page Not Found") */}
              {getSpotifyDirectUrl(selectedPlaylist) && (
                <div className="p-3 bg-zinc-950/40 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3">
                  <div className="space-y-0.5">
                    <p className="text-[10.5px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                      Experiencing Frame Connection Errors?
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Standard iframes require cookie authorization. Seamlessly open this live list directly:
                    </p>
                  </div>
                  <a
                    href={getSpotifyDirectUrl(selectedPlaylist)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-mono tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all text-center shrink-0 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open live on Spotify
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: In-App Sound Station with Language Preference filters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-6 flex flex-col justify-between h-full">
            
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h4 className="font-display text-md font-bold text-white flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-orange" /> In-Website Sound Station
                  </h4>
                  <p className="text-[10px] text-zinc-500">Curated high-BPM motivational sounds</p>
                </div>
                
                {/* Visualizer when isPlaying */}
                <div className="flex items-end gap-0.5 h-6 w-9 pr-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-orange rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${Math.floor(Math.random() * 20) + 4}px` : '4px',
                        animationName: isPlaying ? 'bounce' : 'none',
                        animationDuration: '0.8s',
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                        animationDelay: `${i * 0.12}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Language Preferences Bar */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  Language Preference
                </span>
                <div className="flex flex-wrap gap-1 bg-zinc-950 p-1.5 rounded-xl border border-white/5">
                  {['All', 'English', 'Hindi', 'Punjabi', 'Telugu', 'Spanish'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-orange/25 border border-orange text-orange font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playlist songs list */}
              <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1 no-scrollbar">
                {filteredSongs.map((song, idx) => {
                  const isCurrent = currentTrack.id === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setProgress(0);
                        setIsPlaying(true);
                      }}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-orange/10 border-orange/40 text-orange'
                          : 'bg-zinc-900/60 border-transparent hover:border-white/5 hover:bg-zinc-800/40 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono text-zinc-500">{(idx + 1).toString().padStart(2, '0')}</span>
                        <div>
                          <p className={`font-semibold text-xs leading-none ${isCurrent ? 'text-orange font-bold' : 'text-zinc-200'}`}>{song.title}</p>
                          <span className="text-[10px] text-zinc-550 mt-1 block">{song.artist} &bull; {song.genre}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-[8px] font-mono font-bold bg-zinc-950/60 text-zinc-400 px-1.5 py-0.5 rounded">
                          {song.bpm} BPM
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">{song.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Interactive Player Deck with Control Interfaces */}
            <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl space-y-3.5 mt-auto">
              
              {/* Spinning record avatar info display */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-zinc-90 w-12 h-12 rounded-full border-2 border-orange/60 flex items-center justify-center relative overflow-hidden flex-shrink-0 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                  <div className="absolute inset-0 bg-radial from-orange/20 to-zinc-950" />
                  <Music className="w-5 h-5 text-orange" />
                  <div className="w-2.5 h-2.5 bg-zinc-950 rounded-full border border-orange shadow z-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate leading-none uppercase">{currentTrack.title}</p>
                  <span className="text-[10px] text-zinc-400 mt-1 block uppercase truncate font-semibold">{currentTrack.artist} &bull; {currentTrack.bpm} BPM</span>
                </div>
              </div>

              {/* Progress Bar slider */}
              <div className="space-y-1">
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress(Math.round((clickX / rect.width) * 100));
                }}>
                  <div className="h-full bg-orange rounded-full relative transition-all" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-orange" />
                  </div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-zinc-550 select-none">
                  <span>
                    {Math.floor((Number(currentTrack.duration.split(':')[0]) * 60 + Number(currentTrack.duration.split(':')[1])) * (progress / 100) / 60)}:
                    {Math.floor((Number(currentTrack.duration.split(':')[0]) * 60 + Number(currentTrack.duration.split(':')[1])) * (progress / 100) % 60).toString().padStart(2, '0')}
                  </span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Control panels button line */}
              <div className="flex justify-between items-center px-2">
                
                {/* Language pill overlay */}
                <span className="text-[8px] font-mono bg-orange/10 border border-orange/15 text-orange font-bold uppercase px-2 py-0.5 rounded-full">
                  {currentTrack.language}
                </span>

                {/* Core control keys */}
                <div className="flex items-center gap-4">
                  <button onClick={handlePrevTrack} className="text-zinc-400 hover:text-white cursor-pointer hover:scale-105 transition-all outline-none">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-orange hover:bg-orange/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer outline-none"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                  </button>
                  <button onClick={handleNextTrack} className="text-zinc-400 hover:text-white cursor-pointer hover:scale-105 transition-all outline-none">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Simulated Volume Slider status tooltip */}
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 select-none">
                  <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{volume}%</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
