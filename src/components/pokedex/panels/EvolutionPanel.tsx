import React from "react";
import type { PokemonDetail, EvolutionStep } from "@/types/pokemon";

const TRIGGER_LABELS: Record<string, string> = {
  "level-up":"Lvl", "use-item":"Item", trade:"Trade", shed:"Muda",
};

interface Props { detail: PokemonDetail; onSelect: (id: number) => void; }

export const EvolutionPanel: React.FC<Props> = ({ detail, onSelect }) => {
  const hasForms = detail.specialForms.length > 0;

  if (detail.evolutionChain.length <= 1 && !hasForms) return (
    <div style={{ textAlign:"center", color:"var(--screen-muted)",
      fontFamily:"var(--font-pixel)", fontSize:"7px", padding:12, lineHeight:2.2 }}>
      SEM<br/>EVOLUÇÃO
    </div>
  );

  if (detail.evolutionChain.length <= 1 && hasForms) return (
    <div style={{ width:"100%", animation:"fadeIn 0.2s ease", paddingTop:2 }}>
      <div style={{ textAlign:"center", color:"var(--screen-text)",
        fontFamily:"var(--font-pixel)", fontSize:"7px", marginBottom:10,
        background:"rgba(0,0,0,.22)", border:"1px solid rgba(61,255,61,.16)",
        borderRadius:4, padding:"4px 6px" }}>
        MODOS ESPECIAIS
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
        {detail.specialForms.map((form) => (
          <button key={form.name} onClick={() => onSelect(form.id)} style={{
            background: detail.id === form.id ? "var(--screen-dim)" : "transparent",
            border:`1px solid ${detail.id === form.id ? "var(--screen-text)" : "rgba(61,255,61,.28)"}`,
            borderRadius:6, padding:6, cursor:"pointer",
            display:"flex", flexDirection:"column", alignItems:"center", gap:4,
            minWidth:72, width:72, boxSizing:"border-box", overflow:"hidden",
            boxShadow: detail.id === form.id ? "0 0 0 1px rgba(61,255,61,.3) inset" : "none",
          }}>
            <img src={form.sprite} alt={form.name}
              style={{ width:40, height:40, flexShrink:0, imageRendering:"pixelated", filter:"drop-shadow(0 0 6px rgba(0,0,0,.4))" }} />
            <span style={{ display:"block", width:"100%", boxSizing:"border-box",
              fontFamily:"var(--font-pixel)", fontSize:"7px",
              color:"#fff", textTransform:"uppercase", textAlign:"center",
              lineHeight:1.1, minHeight:22, wordBreak:"break-word", overflowWrap:"anywhere", whiteSpace:"normal" }}>
              {form.name.replace(/-/g, " ")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ width:"100%", animation:"fadeIn 0.2s ease", paddingTop:2 }}>
      <div style={{ display:"flex", alignItems:"center",
        justifyContent:"center", gap:6, flexWrap:"wrap" }}>
        {detail.evolutionChain.map((stage, si) => (
          <React.Fragment key={si}>
            {si > 0 && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                padding:"2px 0" }}>
                <span style={{ color:"var(--screen-text)", fontSize:13 }}>▶</span>
                {stage[0]?.minLevel && (
                    <span style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "7px",
                      color: "#fff",
                      background: "rgba(0,0,0,.24)",
                      borderRadius: 3,
                      padding: "2px 3px",
                      maxWidth: 72,
                      boxSizing: "border-box",
                      textAlign: "center",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                    }}>
                      {TRIGGER_LABELS[stage[0].trigger ?? ""] ?? stage[0].trigger ?? ""}
                      {` ${stage[0].minLevel}`}
                    </span>
                )}
                {stage[0]?.item && (
                    <span style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "7px",
                      color: "#fff",
                      textAlign: "center",
                      maxWidth: 72,
                      background: "rgba(0,0,0,.24)",
                      borderRadius: 3,
                      padding: "2px 3px",
                      boxSizing: "border-box",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                    }}>
                      {stage[0].item.replace(/-/g, " ")}
                  </span>
                )}
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {stage.map((step: EvolutionStep) => (
                <button key={step.name} onClick={() => onSelect(step.id)} style={{
                  background: detail.id === step.id ? "var(--screen-dim)" : "transparent",
                  border:`1px solid ${detail.id === step.id ? "var(--screen-text)" : "rgba(61,255,61,.28)"}`,
                  borderRadius:6, padding:6, cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                  minWidth:72, width:72, boxSizing:"border-box", overflow:"hidden",
                  boxShadow: detail.id === step.id ? "0 0 0 1px rgba(61,255,61,.3) inset" : "none",
                }}>
                  <img src={step.sprite} alt={step.name}
                    style={{ width:40, height:40, flexShrink:0, imageRendering:"pixelated", filter:"drop-shadow(0 0 6px rgba(0,0,0,.4))" }} />
                  <span style={{ display:"block", width:"100%", boxSizing:"border-box",
                    fontFamily:"var(--font-pixel)", fontSize:"7px",
                    color:"#fff", textTransform:"uppercase", lineHeight:1.1, textAlign:"center",
                    minHeight:22, wordBreak:"break-word", overflowWrap:"anywhere", whiteSpace:"normal" }}>
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      {hasForms && (
        <div style={{ marginTop:12 }}>
          <div style={{ textAlign:"center", color:"var(--screen-text)",
            fontFamily:"var(--font-pixel)", fontSize:"7px", marginBottom:10,
            background:"rgba(0,0,0,.22)", border:"1px solid rgba(61,255,61,.16)",
            borderRadius:4, padding:"4px 6px" }}>
            MODOS ESPECIAIS
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
            {detail.specialForms.map((form) => (
              <button key={form.name} onClick={() => onSelect(form.id)} style={{
                background: detail.id === form.id ? "var(--screen-dim)" : "transparent",
                border:`1px solid ${detail.id === form.id ? "var(--screen-text)" : "rgba(61,255,61,.28)"}`,
                borderRadius:6, padding:6, cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                minWidth:72, width:72, boxSizing:"border-box", overflow:"hidden",
                boxShadow: detail.id === form.id ? "0 0 0 1px rgba(61,255,61,.3) inset" : "none",
              }}>
                <img src={form.sprite} alt={form.name}
                  style={{ width:40, height:40, flexShrink:0, imageRendering:"pixelated", filter:"drop-shadow(0 0 6px rgba(0,0,0,.4))" }} />
                <span style={{ display:"block", width:"100%", boxSizing:"border-box",
                  fontFamily:"var(--font-pixel)", fontSize:"7px",
                  color:"#fff", textTransform:"uppercase", maxWidth:60, textAlign:"center",
                  lineHeight:1.1, minHeight:22, wordBreak:"break-word", overflowWrap:"anywhere", whiteSpace:"normal" }}>
                  {form.name.replace(/-/g, " ")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};