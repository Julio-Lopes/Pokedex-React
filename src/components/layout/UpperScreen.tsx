import React from "react";
import { usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonStore } from "@/store/usePokemonStore";
import { PokemonList } from "@/components/pokedex/PokemonList";
import { TypeFilter } from "@/components/pokedex/TypeFilter";

export const UpperScreen: React.FC = () => {
  const { data } = usePokemonList();
  const { searchQuery, setSearchQuery, selectedId } = usePokemonStore();

  const total = data?.length ?? 0;
  const current = selectedId ?? 0;

  return (
    <div style={{ background:"#111", border:"3px solid #1a1a1a",
      borderRadius:"8px 8px 0 0", boxShadow:"inset 0 0 20px rgba(0,0,0,.8)", overflow:"hidden" }}>

      <div style={{ background:"var(--screen-dim)", padding:"6px 12px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:"1px solid var(--screen-muted)" }}>
        <span style={{ fontFamily:"var(--font-pixel)", fontSize:"7px",
          color:"var(--screen-text)", letterSpacing:"1px" }}>POKÉDEX</span>

        {/* CONTADOR CORRIGIDO */}
        <span style={{ fontFamily:"var(--font-pixel)", fontSize:"7px", color:"var(--screen-muted)" }}>
          {current > 0
            ? `${String(current).padStart(3,"0")} / ${total}`
            : `--- / ${total}`}
        </span>
      </div>

      <div style={{ margin:"10px 10px 8px", position:"relative" }}>
        <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)",
          color:"var(--screen-muted)", fontSize:10, fontFamily:"var(--font-pixel)" }}>▶</span>
        <input type="text" value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="BUSCAR..." aria-label="Buscar Pokémon"
          style={{ width:"100%", background:"var(--screen-dim)",
            border:"1px solid var(--screen-muted)", borderRadius:4,
            color:"var(--screen-text)", fontFamily:"var(--font-lcd)",
            fontSize:18, padding:"7px 12px 7px 30px", outline:"none", letterSpacing:"1px" }} />
      </div>

      <TypeFilter />
      <PokemonList />
    </div>
  );
};