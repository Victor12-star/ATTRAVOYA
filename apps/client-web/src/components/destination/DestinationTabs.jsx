/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - DESTINATION GUIDE SECTION TABS
 * ==============================================================================
 * Multi-tab selection panel.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Employs "role=tablist" and "role=tab" attributes.
 * 2. Manages "aria-selected" parameters, allowing screen readers to inform
 *    assistive commuters which page segment is currently displayed.
 */

import React from "react";

export const DestinationTabs = ({ activeTab, setActiveTab }) => {
  // Configured available segments
  const tabsList = [
    { id: "overview", label: "Overview", icon: "🏙️" },
    { id: "history", label: "History & Timeline", icon: "📜" },
    { id: "languages", label: "Languages", icon: "🗣️" },
    { id: "weather", label: "Weather Climate", icon: "🌦️" }
  ];

  return (
    <div 
      role="tablist" // Defines tab list context
      aria-label="Destination guide sections"
      className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-2 pb-1"
    >
      {tabsList.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab" // Defines individual tab selection row
            aria-selected={isSelected} // Announces current selection
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-base font-bold rounded-t-xl transition-all focus:outline-none ${
              isSelected
                ? "bg-white dark:bg-slate-900 border-t-4 border-primary text-primary shadow-sm"
                : "text-slate-500 hover:text-primary hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default DestinationTabs;