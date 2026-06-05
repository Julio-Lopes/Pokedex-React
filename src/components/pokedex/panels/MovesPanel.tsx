import React from "react";
import type { PokemonDetail } from "@/types/pokemon";

const METHOD_LABELS: Record<string, string> = {
  "level-up":"LVL", machine:"TM", tutor:"TUTOR", egg:"OVO",
};

interface Props { detail: PokemonDetail; }

export const MovesPanel: React.FC<Props> = ({ detail }) => (
  <div style={{ width:"100%", animation:"fadeIn 0.2s ease" }}>
    {detail.moves.map((move) => (
      <div key={move.name} style={{ display:"flex", alignItems:"center", gap:6,
        padding:"3px 4px", borderBottom:"1px solid var(--screen-dim)" }}>
        <span style={{ fontFamily:"var(--font-pixel)", fontSize:"5px",
          color:"var(--screen-muted)", width:28, flexShrink:0 }}>
          {METHOD_LABELS[move.learnMethod] ?? move.learnMethod.toUpperCase().slice(0,4)}
          {move.level ? ` ${move.level}` : ""}
        </span>
        <span style={{ fontFamily:"var(--font-lcd)", fontSize:"14px",
          color:"var(--screen-text)", textTransform:"uppercase", letterSpacing:"0.5px" }}>
          {move.name.replace(/-/g," ")}
        </span>
      </div>
    ))}
  </div>
);