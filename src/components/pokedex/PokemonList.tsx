import React, { useEffect, useRef } from "react";
import { usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonsByType } from "@/hooks/usePokemonsByType";
import { usePokemonStore } from "@/store/usePokemonStore";
import { useDebounce } from "@/hooks/useDebounce";
import { PokemonItem } from "./PokemonItem";
import { Spinner } from "@/components/ui/Spinner";

export const PokemonList: React.FC = () => {
  const { data, isLoading, isError } = usePokemonList();
  const { searchQuery, activeType, selectedId, setSelectedId } = usePokemonStore();
  const debounced = useDebounce(searchQuery, 250);
  const listRef = useRef<HTMLDivElement>(null);

  // IDs do tipo selecionado (só busca quando tipo != "all")
  const { data: typeIds, isLoading: typeLoading } = usePokemonsByType(activeType);

  const filtered = (data ?? []).filter((p) => {
    const nameMatch = p.name.includes(debounced.toLowerCase());
    const typeMatch = activeType === "all" || (typeIds ?? []).includes(p.id);
    return nameMatch && typeMatch;
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!filtered.length) return;
      const idx = filtered.findIndex((p) => p.id === selectedId);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedId(filtered[Math.min(idx + 1, filtered.length - 1)].id);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedId(filtered[Math.max(idx - 1, 0)].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, selectedId, setSelectedId]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-pressed="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  const loading = isLoading || (activeType !== "all" && typeLoading);

  if (loading) return (
    <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
      <Spinner />
    </div>
  );
  if (isError) return (
    <div style={{ padding: 12, textAlign: "center", color: "#e74c3c",
      fontFamily: "var(--font-pixel)", fontSize: "8px" }}>
      ERRO AO CARREGAR
    </div>
  );
  if (!filtered.length) return (
    <div style={{ padding: 12, textAlign: "center", color: "var(--screen-muted)",
      fontFamily: "var(--font-pixel)", fontSize: "8px", lineHeight: 2 }}>
      NENHUM<br />POKÉMON
    </div>
  );

  return (
    <div ref={listRef} style={{ maxHeight: 140, overflowY: "auto", padding: "4px 10px 8px" }}>
      {filtered.map((p) => <PokemonItem key={p.id} pokemon={p} />)}
    </div>
  );
};