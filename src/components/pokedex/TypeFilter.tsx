import React from "react";
import { usePokemonStore } from "@/store/usePokemonStore";

const FILTERS = [
  { key:"all", label:"TODOS" }, { key:"normal", label:"NORM" },
  { key:"fire", label:"FOGO" }, { key:"water", label:"ÁGUA" },
  { key:"electric", label:"ELÉT" }, { key:"grass", label:"PLAN" },
  { key:"ice", label:"GELO" }, { key:"fighting", label:"LUTA" },
  { key:"poison", label:"VENE" }, { key:"ground", label:"TERR" },
];

export const TypeFilter: React.FC = () => {
  const { activeType, setActiveType } = usePokemonStore();
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:"0 10px 10px" }}>
      {FILTERS.map(({ key, label }) => (
        <button key={key} onClick={() => setActiveType(key)} style={{
          fontFamily:"var(--font-pixel)", fontSize:"6px", padding:"5px 8px",
          borderRadius:3,
          border:`1px solid ${activeType===key ? "var(--screen-text)" : "var(--screen-muted)"}`,
          background: activeType===key ? "var(--screen-text)" : "transparent",
          color: activeType===key ? "#000" : "var(--screen-text)",
          cursor:"pointer", letterSpacing:"1px", transition:"all 0.15s",
        }}>{label}</button>
      ))}
    </div>
  );
};