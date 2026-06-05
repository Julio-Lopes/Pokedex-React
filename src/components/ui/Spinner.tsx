import React from "react";
export const Spinner: React.FC = () => (
  <div style={{ width:28, height:28, border:"3px solid var(--screen-dim)",
    borderTop:"3px solid var(--screen-text)", borderRadius:"50%",
    animation:"spin 0.8s linear infinite", margin:"0 auto" }} />
);