import React from "react";
import { UpperScreen } from "./UpperScreen";
import { LowerScreen } from "./LowerScreen";

const DPad: React.FC = () => (
  <div style={{ width:72, height:72, position:"relative", flexShrink:0 }}>
    <div style={{
      position:"absolute",
      width:72,
      height:24,
      top:24,
      left:0,
      background:"var(--device-red-deeper)",
      borderRadius:3,
      boxShadow:"0 3px 0 rgba(0,0,0,.4)"
    }} />

    <div style={{
      position:"absolute",
      width:24,
      height:72,
      top:0,
      left:24,
      background:"var(--device-red-deeper)",
      borderRadius:3,
      boxShadow:"0 3px 0 rgba(0,0,0,.4)"
    }} />

    <div style={{
      position:"absolute",
      width:24,
      height:24,
      top:24,
      left:24,
      background:"#1a1a1a",
      borderRadius:2
    }} />

    {(["▲","▼","◄","►"] as const).map((a, i) => {
      const pos = [
        { top:2,  left:24 },
        { top:48, left:24 }, 
        { top:24, left:2  },
        { top:24, left:48 }  
      ][i];

      return (
        <div
          key={a}
          style={{
            position:"absolute",
            width:20,
            height:20,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"#fff",
            fontSize:10,
            lineHeight:1,
            fontFamily:"Arial, sans-serif",
            userSelect:"none",
            ...pos
          }}
        >
          {a}
        </div>
      );
    })}
  </div>
);

const ActionButtons: React.FC = () => (
  <div style={{ display:"grid", gridTemplateColumns:"repeat(2,32px)",
    gridTemplateRows:"repeat(2,32px)", gap:4, flexShrink:0 }}>
    {[{ l:"A",bg:"#e74c3c",c:1,r:1 },{ l:"X",bg:"#9b59b6",c:2,r:1 },
      { l:"B",bg:"#f1c40f",c:1,r:2 },{ l:"Y",bg:"#27ae60",c:2,r:2 }].map(({ l, bg, c, r }) => (
      <button key={l} style={{ width:32, height:32, borderRadius:"50%", background:bg,
        border:"none", cursor:"pointer", fontFamily:"var(--font-pixel)", fontSize:8,
        color:"rgba(0,0,0,.7)", boxShadow:"0 4px 0 rgba(0,0,0,.4)",
        gridColumn:c, gridRow:r, transition:"all .1s" }}>{l}</button>
    ))}
  </div>
);

export const DeviceShell: React.FC = () => (
  <div style={{ width:"min(540px, 100%)", background:"var(--device-red)",
    borderRadius:"18px 18px 60px 18px",
    boxShadow:"0 0 0 3px var(--device-red-dark), 0 8px 40px rgba(0,0,0,.7), inset 0 2px 4px rgba(255,255,255,.15)",
    padding:"20px 20px 30px", position:"relative" }}>
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
      <div style={{ width:18, height:18, borderRadius:"50%",
        background:"radial-gradient(circle at 35% 35%, #6ae4ff, #2980b9)",
        boxShadow:"0 0 6px #2980b9", border:"2px solid rgba(0,0,0,.3)" }} />
      <div style={{ display:"flex", gap:6 }}>
        {["#e74c3c","#f39c12","#2ecc71"].map((bg) => (
          <div key={bg} style={{ width:14, height:14, borderRadius:"50%",
            background:bg, border:"2px solid rgba(0,0,0,.25)" }} />
        ))}
      </div>
    </div>
    <UpperScreen />
    <div style={{ background:"var(--device-red-dark)", height:20,
      display:"flex", alignItems:"center", justifyContent:"center", gap:40 }}>
      {[0,1].map((i) => (
        <div key={i} style={{ width:50, height:8, background:"var(--device-red-deeper)",
          borderRadius:4, boxShadow:"inset 0 2px 4px rgba(0,0,0,.5)" }} />
      ))}
    </div>
    <LowerScreen />
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
      marginTop:18, padding:"0 8px" }}>
      <DPad />
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
        {["START","SELECT"].map((label) => (
          <button key={label} style={{ fontFamily:"var(--font-pixel)", fontSize:6,
            letterSpacing:1, background:"var(--device-red-deeper)",
            color:"rgba(255,255,255,.7)", border:"none", borderRadius:4,
            padding:"6px 14px", cursor:"pointer", boxShadow:"0 3px 0 rgba(0,0,0,.5)" }}>
            {label}
          </button>
        ))}
      </div>
      <ActionButtons />
    </div>
  </div>
);