import { useQuery } from "@tanstack/react-query";
import { fetchPokemonsByType } from "@/services/pokeapi";

export function usePokemonsByType(typeName: string) {
  return useQuery({
    queryKey: ["pokemon-by-type", typeName],
    queryFn: () => fetchPokemonsByType(typeName),
    enabled: typeName !== "all",
    staleTime: Infinity,
    gcTime: Infinity,
  });
}