import React from "react";

const TYPE_LABELS: Record<string, string> = {
  fire:"FOGO", water:"ÁGUA", grass:"PLANTA", electric:"ELÉT",
  ice:"GELO", fighting:"LUTA", poison:"VENE", ground:"TERR",
  flying:"VÔO", psychic:"PSÍQ", bug:"INSET", rock:"PEDRA",
  ghost:"FANTAS", dragon:"DRAGÃO", dark:"SOMBR", steel:"AÇO",
  normal:"NORM", fairy:"FADA",
};
const LIGHT = ["electric","ice","flying","bug","fairy"];

interface Props { type: string; size?: "sm" | "md"; }

export const TypeBadge: React.FC<Props> = ({ type, size = "sm" }) => (
  <span style={{
    background: `var(--type-${type}, #555)`,
    color: LIGHT.includes(type) ? "#000" : "#fff",
    fontFamily: "var(--font-pixel)",
    fontSize: size === "sm" ? "6px" : "8px",
    padding: size === "sm" ? "4px 7px" : "5px 9px",
    borderRadius: "3px",
    letterSpacing: "0.5px",
    display: "inline-block",
    lineHeight: 1.2,
    textShadow: LIGHT.includes(type) ? "none" : "0 1px 0 rgba(0,0,0,.35)",
  }}>
    {TYPE_LABELS[type] ?? type.toUpperCase()}
  </span>
);