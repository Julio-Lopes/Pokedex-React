import React, { useEffect, useState } from "react";
import type { StatName } from "@/types/pokemon";

const LABELS: Record<StatName, string> = {
  hp:"HP", attack:"ATK", defense:"DEF",
  "special-attack":"SATK", "special-defense":"SDEF", speed:"SPD",
};

interface Props { name: StatName; value: number; }

export const StatBar: React.FC<Props> = ({ name, value }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / 255) * 100), 50);
    return () => clearTimeout(t);
  }, [value]);
  const color = value >= 100 ? "#2ecc71" : value >= 60 ? "#3dff3d" : value >= 30 ? "#f39c12" : "#e74c3c";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <span style={{
        fontFamily:"var(--font-pixel)",
        fontSize:"6px",
        color:"var(--screen-text)",
        width:30,
        flexShrink:0,
        background:"rgba(0,0,0,.24)",
        border:"1px solid rgba(61,255,61,.18)",
        borderRadius:3,
        padding:"3px 4px",
        textAlign:"center",
      }}>{LABELS[name]}</span>
      <div style={{
        flex:1,
        height:7,
        background:"rgba(0,0,0,.28)",
        borderRadius:999,
        overflow:"hidden",
        border:"1px solid rgba(61,255,61,.12)",
        boxShadow:"inset 0 0 0 1px rgba(0,0,0,.2)",
      }}>
        <div style={{ height:"100%", width:`${width}%`, background:color,
          borderRadius:999, transition:"width 0.6s cubic-bezier(.4,0,.2,1)" }} />
      </div>
      <span style={{
        fontFamily:"var(--font-pixel)",
        fontSize:"6px",
        color:"#fff",
        width:26,
        textAlign:"right",
        background:"rgba(0,0,0,.24)",
        border:"1px solid rgba(61,255,61,.18)",
        borderRadius:3,
        padding:"3px 4px",
      }}>{value}</span>
    </div>
  );
};