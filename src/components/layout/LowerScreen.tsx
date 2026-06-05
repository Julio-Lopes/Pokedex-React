import React from "react";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { usePokemonStore } from "@/store/usePokemonStore";
import { ScreenTabs }    from "@/components/ui/ScreenTabs";
import { Spinner }       from "@/components/ui/Spinner";
import { StatusPanel }   from "@/components/pokedex/panels/StatusPanel";
import { EvolutionPanel} from "@/components/pokedex/panels/EvolutionPanel";
import { MovesPanel }    from "@/components/pokedex/panels/MovesPanel";
import { WeaknessPanel } from "@/components/pokedex/panels/WeaknessPanel";

const shell: React.CSSProperties = {
  background: "#0d1a0d",
  border: "3px solid #1a1a1a",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
  height: "280px",          
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 14,
  boxShadow: "inset 0 0 20px rgba(0,0,0,.8)",
  overflow: "hidden",        
};

export const LowerScreen: React.FC = () => {
  const { selectedId, activeTab, showShiny, toggleShiny, setSelectedId } = usePokemonStore();
  const { data: detail, isLoading, isError } = usePokemonDetail(selectedId);

  if (!selectedId) return (
    <div style={shell}>
      <div style={{ textAlign:"center", color:"var(--screen-muted)",
        fontFamily:"var(--font-pixel)", fontSize:"7px", lineHeight:2.2 }}>
        SELECIONE UM<br/>POKÉMON NA<br/>TELA SUPERIOR
      </div>
    </div>
  );

  if (isLoading) return (
    <div style={{ ...shell, flexDirection:"column", gap:12 }}>
      <Spinner />
      <span style={{ fontFamily:"var(--font-pixel)", fontSize:"6px",
        color:"var(--screen-muted)" }}>CARREGANDO...</span>
    </div>
  );

  if (isError || !detail) return (
    <div style={shell}>
      <div style={{ textAlign:"center", color:"#e74c3c",
        fontFamily:"var(--font-pixel)", fontSize:"6px", lineHeight:2 }}>
        ERRO AO<br/>CARREGAR
      </div>
    </div>
  );

  const sprite = showShiny
    ? (detail.shinyArtwork ?? detail.shinySprite)
    : (detail.artwork ?? detail.sprite);

  return (
    <div style={{ ...shell, alignItems:"flex-start", flexDirection:"column" }}>
      {/* Hero row */}
      <div style={{ display:"flex", gap:10, width:"100%", marginBottom:10, alignItems:"flex-start" }}>
        <div style={{ position:"relative", flexShrink:0 }}>
          <img src={sprite ?? ""} alt={detail.name}
            style={{ width:80, height:80, imageRendering:"pixelated",
              filter:"drop-shadow(0 0 8px var(--screen-muted))" }} />
          {detail.shinySprite && (
            <button onClick={toggleShiny}
              title={showShiny ? "Ver Normal" : "Ver Shiny"}
              style={{
                position:"absolute", bottom:0, right:0,
                background: showShiny ? "#f39c12" : "var(--screen-dim)",
                border:"1px solid var(--screen-muted)", borderRadius:3,
                fontFamily:"var(--font-pixel)", fontSize:"5px",
                color: showShiny ? "#000" : "var(--screen-muted)",
                padding:"2px 3px", cursor:"pointer",
              }}>✦</button>
          )}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"var(--font-pixel)", fontSize:"9px",
            color:"var(--screen-text)", letterSpacing:"1px",
            textTransform:"uppercase", wordBreak:"break-word" }}>
            {detail.name}
          </div>
          <div style={{ fontFamily:"var(--font-pixel)", fontSize:"6px",
            color:"var(--screen-muted)", marginTop:3 }}>
            Nº{String(detail.id).padStart(3,"0")}
            {showShiny && <span style={{ marginLeft:6, color:"#f39c12" }}>✦ SHINY</span>}
          </div>
        </div>
      </div>
      <ScreenTabs />
      <div style={{ width:"100%", overflowY:"auto", maxHeight:130 }}>
        {activeTab === "status"    && <StatusPanel    detail={detail} />}
        {activeTab === "evolucao"  && <EvolutionPanel detail={detail} onSelect={setSelectedId} />}
        {activeTab === "golpes"    && <MovesPanel     detail={detail} />}
        {activeTab === "fraquezas" && <WeaknessPanel  detail={detail} />}
      </div>
    </div>
  );
};