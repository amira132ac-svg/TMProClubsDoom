import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Play,
  Pause,
  Disc,
  ChevronDown,
  ChevronUp,
  SkipForward,
} from 'lucide-react';

export interface RadioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  tag: string;
}

const RADIO_TRACKS: RadioTrack[] = [
  {
    id: 'track-1',
    title: 'What You Saying',
    artist: 'Lil Uzi Vert',
    url: 'https://dl.tiktokmusics.ir/music/What%20You%20Saying%20By%20Lil%20Uzi%20Vert.mp3',
    tag: 'Hip-Hop / Trap',
  },
  {
    id: 'track-2',
    title: 'Heartbeat',
    artist: 'Childish Gambino',
    url: 'https://dl.tiktokmusics.ir/music/Heartbeat%20By%20Childish%20Gambino.mp3',
    tag: 'Electropop / Rap',
  },
  {
    id: 'track-3',
    title: 'Loser',
    artist: 'Tame Impala',
    url: 'https://dl.tiktokmusics.ir/music/Loser%20By%20Tame%20Impala.mp3',
    tag: 'Psychedelic / Indie',
  },
  {
    id: 'track-4',
    title: 'Addiction',
    artist: 'LONOWN',
    url: 'https://dl.tiktokmusics.ir/music/addiction%20By%20LONOWN.mp3',
    tag: 'Phonk / Bass',
  },
  {
    id: 'track-5',
    title: 'Zelda Great Fairy Fountain',
    artist: 'Orchestra Club',
    url: 'https://dl.tiktokmusics.ir/music/Zelda%20Great%20Fairy%20Fountain%20By%20Orchestra%20Club.mp3',
    tag: 'Orchestral / Ambient',
  },
  {
    id: 'track-6',
    title: 'BLOCKKIDS x Argent Sale (Remix)',
    artist: 'German Goat',
    url: 'https://dl.tiktokmusics.ir/music/Remix%20BLOCKKIDS%20x%20Argent%20Sale%20By%20German%20Goat.mp3',
    tag: 'Hip-Hop / Remix',
  },
  {
    id: 'track-7',
    title: 'August 10',
    artist: 'Julie Doiron',
    url: 'https://dl.tiktokmusics.ir/music/August%2010%20By%C2%A0Julie%20Doiron.mp3',
    tag: 'Indie / Acoustic',
  },
  {
    id: 'track-8',
    title: 'Mr. Saxobeat',
    artist: 'Alexandra Stan',
    url: 'https://dl.emusicfa.ir/Alexandra%20Stan/Mr.%20Saxobeat.mp3',
    tag: 'Dance / Club Pop',
  },
  {
    id: 'track-9',
    title: 'Rytm Zendegy - Track 01',
    artist: 'Rytm Zendegy',
    url: 'https://rytmzendegy.ir/4cd6e343-4078-48b1-afac-554edfd72aae',
    tag: 'Electronic / Beat',
  },
  {
    id: 'track-10',
    title: 'Rytm Zendegy - Track 02',
    artist: 'Rytm Zendegy',
    url: 'https://rytmzendegy.ir/ed7c4edd-86ca-444d-b126-44c119186de4',
    tag: 'Electronic / Beat',
  },
];

// Fixed gentle background gain (~20% perceptual, sounds soft and comfortable)
const DEFAULT_BACKGROUND_GAIN = 0.035; // gentle, non-intrusive background level

// Fisher-Yates shuffle helper for true random radio sequence
const shuffleIndices = (count: number, avoidIndex = -1): number[] => {
  const arr = Array.from({ length: count }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure the first item isn't immediately repeated if avoidIndex is given
  if (arr.length > 1 && arr[0] === avoidIndex) {
    const temp = arr[0];
    arr[0] = arr[arr.length - 1];
    arr[arr.length - 1] = temp;
  }
  return arr;
};

export const TournamentRadio: React.FC = () => {
  // Shuffled playlist queue to feel 100% like a random radio broadcast
  const [queue, setQueue] = useState<number[]>(() => shuffleIndices(RADIO_TRACKS.length));
  const [queuePos, setQueuePos] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  // Popup card expanded or compact pill
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Current track index in the randomized queue
  const currentTrackIndex = queue[queuePos] ?? 0;
  const currentTrack = RADIO_TRACKS[currentTrackIndex];

  // Apply fixed gentle background volume permanently
  const enforceGentleVolume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted = false;
      audio.volume = DEFAULT_BACKGROUND_GAIN;
    } catch (err) {
      console.warn('Volume set error:', err);
    }
  }, []);

  // Jump to next random track
  const playNextRandomTrack = useCallback(() => {
    setQueuePos((prevPos) => {
      const nextPos = prevPos + 1;
      if (nextPos >= queue.length) {
        // Reshuffle queue seamlessly when cycle completes
        const newQueue = shuffleIndices(RADIO_TRACKS.length, queue[queue.length - 1]);
        setQueue(newQueue);
        return 0;
      }
      return nextPos;
    });
  }, [queue]);

  // Handle track changing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.url;
    audio.load();
    enforceGentleVolume();

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      setIsLoading(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            enforceGentleVolume();
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn('Playback blocked or failed, auto-advancing:', err);
            setIsLoading(false);
            if (isPlaying) {
              setTimeout(() => {
                playNextRandomTrack();
              }, 400);
            }
          });
      }
    }
  }, [currentTrack.url, enforceGentleVolume, isPlaying, playNextRandomTrack]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      if (!audio.src || audio.src === '' || audio.src === window.location.href) {
        audio.src = currentTrack.url;
      }
      enforceGentleVolume();
      audio
        .play()
        .then(() => {
          enforceGentleVolume();
          setIsLoading(false);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play notice:', err);
          setIsLoading(false);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      {/* Background Audio Node */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          handleTimeUpdate();
          enforceGentleVolume();
        }}
        onLoadedData={enforceGentleVolume}
        onCanPlay={enforceGentleVolume}
        onPlay={enforceGentleVolume}
        onPlaying={() => {
          setIsLoading(false);
          enforceGentleVolume();
        }}
        onEnded={playNextRandomTrack}
        onError={() => {
          console.warn('Track stream error, auto-advancing to next track...');
          setIsLoading(false);
          if (isPlaying) {
            setTimeout(() => {
              playNextRandomTrack();
            }, 400);
          }
        }}
        onWaiting={() => setIsLoading(true)}
      />

      {/* FLOATING BOTTOM-RIGHT CONTAINER */}
      <div
        id="radio-tm-widget"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
      >
        {/* EXPANDED POPUP CARD ("بالا بیان") WITH ANIMATE PRESENCE */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="radio-tm-popup-card"
              initial={{ opacity: 0, scale: 0.88, y: 24, originX: 1, originY: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.86,
                y: 18,
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="w-[290px] sm:w-[320px] mb-3 bg-[#06100a]/95 border border-[#00ff66]/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,255,102,0.18)] backdrop-blur-2xl text-white origin-bottom-right"
            >
              {/* Header: Radio TM Live + Minimize */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-[#00ff66]' : 'bg-slate-500'}`} />
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying ? 'bg-[#00ff66]' : 'bg-slate-600'}`} />
                  </span>
                  <span className="font-esports font-black text-sm tracking-wider text-white">
                    Radio Tm
                  </span>
                  <span className="text-[10px] font-tech text-[#00ff66] px-1.5 py-0.2 rounded bg-[#00ff66]/10 border border-[#00ff66]/30 uppercase tracking-wider font-bold">
                    LIVE
                  </span>
                  <span className="text-[10px] font-tech text-slate-400 px-1.5 py-0.2 rounded bg-white/5 border border-white/10 font-mono">
                    {RADIO_TRACKS.length} TRACKS
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.15, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
                  title="بستن و کوچک‌نمایی"
                >
                  <ChevronDown className="w-4 h-4 text-[#00ff66]" />
                </motion.button>
              </div>

              {/* Current Random Track Broadcast Info */}
              <div className="py-3 flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a2315] to-[#040a06] border border-[#00ff66]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-shadow duration-300 ${
                    isPlaying ? 'shadow-[0_0_20px_rgba(0,255,102,0.4)]' : ''
                  }`}
                >
                  <Disc
                    className={`w-7 h-7 text-[#00ff66] transition-transform ${
                      isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '4s' }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-esports font-bold text-sm text-white truncate tracking-wide">
                      {currentTrack.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-0.5">
                    <p className="font-condensed text-slate-300 truncate">
                      {currentTrack.artist}
                    </p>
                    <span className="text-[9px] font-tech text-[#00ff66] px-1.5 py-0.2 rounded bg-white/5 border border-white/10 shrink-0 ml-1">
                      {currentTrack.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Radio Equalizer Animation */}
              <div className="py-1 px-2 rounded-lg bg-black/50 border border-white/5 flex items-center justify-between mb-2">
                <span className="text-[10px] font-tech text-slate-400 flex items-center gap-1">
                  <Radio className={`w-3 h-3 ${isPlaying ? 'text-[#00ff66] animate-pulse' : 'text-slate-600'}`} />
                  <span>پخش زنده رادیو</span>
                </span>

                {/* Dynamic Sound Wave Bars */}
                <div className="flex items-center gap-1 h-3">
                  {[1, 2, 3, 4, 5, 6].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={isPlaying ? {
                        height: [
                          `${Math.sin(bar * 1.3) * 6 + 9}px`,
                          `${Math.cos(bar * 1.5) * 5 + 8}px`,
                          `${Math.sin(bar * 2.1) * 7 + 10}px`,
                          `${Math.sin(bar * 1.3) * 6 + 9}px`,
                        ]
                      } : { height: '3px' }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + bar * 0.1,
                        ease: 'easeInOut'
                      }}
                      className="w-1 rounded-full bg-[#00ff66]"
                    />
                  ))}
                </div>
              </div>

              {/* Broadcast Progress Bar (Display-only, no seeking) */}
              <div className="space-y-1">
                <div
                  className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00ff66] to-[#10b981]"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-tech text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 font-mono">ON-AIR</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Live Controls: Play / Pause + Next Track */}
              <div className="pt-3 flex items-center justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                  type="button"
                  onClick={(e) => togglePlay(e)}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer font-tech font-bold text-xs ${
                    isPlaying
                      ? 'bg-[#00ff66] text-black shadow-[0_0_25px_rgba(0,255,102,0.6)]'
                      : 'bg-[#0b2416] text-[#00ff66] border border-[#00ff66]/60 hover:bg-[#0f3420] shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:border-[#00ff66]'
                  }`}
                  title={isPlaying ? 'قطع پخش رادیو' : 'اتصال به رادیو و پخش'}
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>توقف پخش رادیو</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>اتصال و پخش زنده Radio Tm</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 400 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playNextRandomTrack();
                  }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00ff66]/60 text-slate-300 hover:text-[#00ff66] transition-colors cursor-pointer flex items-center justify-center"
                  title="آهنگ بعدی"
                >
                  <SkipForward className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SMALL BOTTOM-RIGHT CAPSULE ("پایین سمت راست کوچیک") */}
        <motion.div
          layout
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', damping: 22, stiffness: 350 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center gap-2.5 px-3 py-2 rounded-full border cursor-pointer backdrop-blur-xl transition-colors duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.85)] ${
            isExpanded
              ? 'bg-[#06150d] border-[#00ff66] text-white shadow-[0_0_20px_rgba(0,255,102,0.3)]'
              : 'bg-[#050c08]/90 hover:bg-[#08180e] border-[#00ff66]/40 hover:border-[#00ff66] text-white'
          }`}
          title={isExpanded ? 'کوچک‌نمایی رادیو' : 'باز کردن Radio Tm'}
        >
          {/* Mini Play / Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={(e) => togglePlay(e)}
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#00ff66] text-black shadow-[0_0_12px_rgba(0,255,102,0.6)]'
                : 'bg-[#0c2918] text-[#00ff66] border border-[#00ff66]/50'
            }`}
            title={isPlaying ? 'توقف' : 'پخش'}
          >
            {isLoading ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current ml-0.5" />
            )}
          </motion.button>

          {/* Radio Signal Icon & Branding */}
          <div className="flex items-center gap-1.5">
            <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#00ff66] animate-pulse' : 'text-slate-400'}`} />
            <span className="font-esports font-black text-xs tracking-wider text-white">
              Radio Tm
            </span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
            )}
          </div>

          {/* Current Song Title snippet */}
          <div className="hidden sm:flex items-center gap-1.5 max-w-[130px] truncate text-xs text-slate-300">
            <span className="text-slate-500">•</span>
            <span className="truncate font-condensed">{currentTrack.title}</span>
          </div>

          {/* Expand / Collapse Indicator */}
          <div className="flex items-center gap-1 pl-1 border-l border-white/10 text-[#00ff66]">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 transition-transform" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};
