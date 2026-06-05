import React from "react";
import type { PokemonTab } from "@/types/pokemon";
import { usePokemonStore } from "@/store/usePokemonStore";

const TABS: { key: PokemonTab; label: string }[] = [
  { key: "status",    label: "STATUS" },
  { key: "evolucao",  label: "EVOL" },
  { key: "golpes",    label: "GOLPES" },
  { key: "fraquezas", label: "FRAQ" },
];

export const ScreenTabs: React.FC = () => {
  const { activeTab, setActiveTab } = usePokemonStore();
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 10, width: "100%" }}>
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          style={{
            flex: 1,
            fontFamily: "var(--font-pixel)",
            fontSize: "8px",         
            padding: "7px 2px",       
            border: `1px solid ${activeTab === key ? "var(--screen-text)" : "var(--screen-muted)"}`,
            borderRadius: 3,
            background: activeTab === key ? "var(--screen-text)" : "var(--screen-dim)",
            color: activeTab === key ? "#000" : "var(--screen-muted)",
            cursor: "pointer",
            transition: "all 0.15s",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};