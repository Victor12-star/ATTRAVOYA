/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - LANGUAGES AND COMMUNICATIONS SEGMENT
 * ==============================================================================
 * Displays regional official languages, and lists useful traveler phrases
 * with phonetic translations and interactive audio-mock click triggers.
 */

import React, { useState } from "react";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";

export const LanguageSection = ({ destination }) => {
  const languages = destination.languages;
  const phrases = destination.phrases;
  const [playingId, setPlayingId] = useState(null);

  // Mock audio trigger effect (simulates playing pronunciation tracks)
  const handlePlayAudio = (phraseId, text) => {
    setPlayingId(phraseId);
    
    // In a full implementation, you would trigger the HTML5 Audio API: new Audio(url).play();
    console.log(`🔊 Playing audio pronunciation for phrase: ${text}`);

    setTimeout(() => {
      setPlayingId(null);
    }, 1200); // Reset visual state after 1.2 seconds
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* SECTION 1: REGIONAL SPOKEN LANGUAGES */}
      {languages && languages.length > 0 && (
        <article className="flex flex-col gap-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Spoken Languages in {destination.name}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {languages.map((lang, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-slate-900 dark:text-white">
                    {lang.languageName}
                  </span>
                  <Badge variant={lang.type === "OFFICIAL" ? "success" : "info"}>
                    {lang.type}
                  </Badge>
                </div>
                {lang.proficiencyInfo && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang.proficiencyInfo}
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>
      )}

      {/* SECTION 2: BASIC TRAVELER PHRASEBOOK */}
      {phrases && phrases.length > 0 && (
        <section className="flex flex-col gap-6" aria-label="Traveler basic phrasebook">
          <div className="border-b pb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Basic Traveler Phrasebook
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Useful greetings and requests translated into the local language, complete with phonetic pronunciation cards!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phrases.map((phr, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm text-slate-400 font-semibold uppercase tracking-wider">
                    {phr.englishPhrase}
                  </span>
                  
                  {/* Local Translation */}
                  <span className="text-xl font-extrabold text-primary">
                    {phr.translation}
                  </span>
                  
                  {/* Phonetic Pronunciation Cards */}
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded w-fit">
                    Pronunciation: "{phr.pronunciation}"
                  </span>
                </div>

                {/* Speak Audio Button */}
                <Button
                  variant="ghost"
                  onClick={() => handlePlayAudio(idx, phr.translation)}
                  ariaLabel={`Hear audio pronunciation for: ${phr.translation}`}
                  className="rounded-full p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary flex-shrink-0"
                >
                  {playingId === idx ? (
                    // Waves playing icon
                    <svg className="h-5 w-5 animate-pulse text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    // Standard speaker icon
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};