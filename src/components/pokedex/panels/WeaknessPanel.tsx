import React from "react";
import type { PokemonDetail } from "@/types/pokemon";
import { TypeBadge } from "@/components/ui/TypeBadge";

const MULTI: Record<number, string> = { 4:"4×", 2:"2×", 0.5:"0.5×", 0.25:"0.25×", 0:"0×" };

interface Props { detail: PokemonDetail; }

const Group: React.FC<{ label: string; items: Array<{type:string; multiplier:number}> }> = ({ label, items }) => (
  <div style={{
    marginBottom:8,
    padding:8,
    borderRadius:6,
    background:"rgba(0,0,0,.18)",
    border:"1px solid rgba(61,255,61,.18)",
  }}>
    <div style={{ fontFamily:"var(--font-pixel)", fontSize:"7px",
      color:"var(--screen-text)", marginBottom:6, letterSpacing:"0.5px" }}>{label}</div>
    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
      {items.map((w) => (
        <div key={w.type} style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          gap:4,
          minWidth:34,
        }}>
          <TypeBadge type={w.type} size="md" />
          <span style={{
            fontFamily:"var(--font-pixel)",
            fontSize:"6px",
            color: w.multiplier >= 2 ? "#ff7b72" : "#7dff9a",
            background:"rgba(0,0,0,.22)",
            borderRadius:3,
            padding:"2px 4px",
            lineHeight:1.2,
          }}>
            {MULTI[w.multiplier] ?? `${w.multiplier}×`}
          </span>
        </div>
      ))}
      {!items.length && (
        <span style={{ fontFamily:"var(--font-pixel)", fontSize:"6px",
          color:"var(--screen-muted)" }}>NENHUMA</span>
      )}
    </div>
  </div>
);

export const WeaknessPanel: React.FC<Props> = ({ detail }) => (
  <div style={{ width:"100%", animation:"fadeIn 0.2s ease" }}>
    <Group label="FRAQUEZAS"    items={detail.weaknesses.filter((w) => w.multiplier > 1)} />
    <Group label="RESISTÊNCIAS" items={detail.weaknesses.filter((w) => w.multiplier < 1)} />
  </div>
);