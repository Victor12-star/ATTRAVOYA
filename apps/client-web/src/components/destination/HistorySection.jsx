/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - HISTORY & TIMELINES SEGMENT
 * ==============================================================================
 * Renders expanded history summaries, name origins, and our beautiful,
 * chronological milestones timeline!
 */

import React from "react";

export const HistorySection = ({ destination }) => {
    const history = destination.history;
    const timeline = destination.timeline;

    return (
    <div className="flex flex-col gap-10">
        
      {/* SECTION 1: HISTORY PARAGRAPH INTROS */}
        {history && (
        <article className="flex flex-col gap-5">
            <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Historical Origin of {destination.name}
            </h2>
            <p className="text-sm font-semibold text-primary mt-1">
                Reviewed and approved on: {new Date(history.lastReviewed).toLocaleDateString()}
            </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Origin of the Name
            </h3>
            <p className="text-base text-textLight dark:text-textDark font-medium italic">
                "{history.nameOrigin}"
            </p>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {history.summary}
            </p>

            <div 
            className="text-base text-slate-600 dark:text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: history.extendedHtml }} // Renders formatted rich text safely
            />

            {history.sources && history.sources.length > 0 && (
            <div className="text-xs text-slate-400 mt-2">
                <p className="font-bold">Sources & References:</p>
                <ul className="list-disc list-inside mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {history.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                ))}
                </ul>
            </div>
            )}
        </article>
        )}

      {/* SECTION 2: CHRONOLOGICAL TIME-LINE */}
        {timeline && timeline.length > 0 && (
        <section className="flex flex-col gap-6" aria-label="Chronological milestones timeline">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2">
            Chronological Milestones & Timeline
            </h3>

            <div className="relative border-l-2 border-primary/30 ml-4 flex flex-col gap-8 py-2">
            {timeline.map((mile, i) => (
                <div key={i} className="relative pl-6">
                
                {/* Timeline Node Dot */}
                <div 
                    className="absolute -left-1.5 top-1.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-white dark:border-slate-900" 
                    aria-hidden="true"
                />

                <div className="flex flex-col gap-1">
                    <span className="text-base font-black text-primary font-mono">
                    {mile.year}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {mile.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                    {mile.description}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </section>
        )}

    </div>
    );
};