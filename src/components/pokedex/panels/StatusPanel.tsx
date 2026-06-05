import React from "react";
import { StatBar } from "@/components/ui/StatBar";
import { TypeBadge } from "@/components/ui/TypeBadge";
import type { PokemonDetail, StatName } from "@/types/pokemon";

interface Props { detail: PokemonDetail; }

export const StatusPanel: React.FC<Props> = ({ detail }) => (
  <div style={{ width:"100%", animation:"fadeIn 0.2s ease" }}>
    <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
      {detail.types.map((t) => <TypeBadge key={t} type={t} size="md" />)}
    </div>
    {detail.flavorText && (
      <p style={{ fontFamily:"var(--font-lcd)", fontSize:"13px",
        color:"var(--screen-muted)", lineHeight:1.4, marginBottom:8 }}>
        {detail.flavorText}
      </p>
    )}
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      {detail.stats.map((s) => (
        <StatBar key={s.name} name={s.name as StatName} value={s.value} />
      ))}
    </div>
  </div>
);