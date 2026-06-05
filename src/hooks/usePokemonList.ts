import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "@/services/pokeapi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemonList(), 
    staleTime: Infinity,
    gcTime: Infinity,
  });
}