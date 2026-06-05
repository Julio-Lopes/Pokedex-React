import React from "react";
import { usePokemonStore } from "@/store/usePokemonStore";
import type { PokemonListItem } from "@/types/pokemon";

interface Props { pokemon: PokemonListItem; }

export const PokemonItem: React.FC<Props> = ({ pokemon }) => {
  const { selectedId, setSelectedId } = usePokemonStore();
  const isSelected = selectedId === pokemon.id;
  return (
    <div role="button" tabIndex={0}
      onClick={() => setSelectedId(pokemon.id)}
      onKeyDown={(e) => e.key === "Enter" && setSelectedId(pokemon.id)}
      aria-pressed={isSelected}
      style={{
        display:"flex", alignItems:"center", gap:8,
        padding:"5px 6px", borderRadius:3, cursor:"pointer",
        background: isSelected ? "var(--screen-dim)" : "transparent",
        borderLeft: isSelected ? "2px solid var(--screen-text)" : "2px solid transparent",
        transition:"all 0.1s", userSelect:"none",
      }}>
      <span style={{ fontFamily:"var(--font-pixel)", fontSize:"6px",
        color:"var(--screen-muted)", width:28, flexShrink:0 }}>
        #{String(pokemon.id).padStart(3,"0")}
      </span>
      <span style={{ fontFamily:"var(--font-lcd)", fontSize:"17px",
        color:"var(--screen-text)", textTransform:"uppercase", letterSpacing:"1px" }}>
        {pokemon.name}
      </span>
    </div>
  );
};