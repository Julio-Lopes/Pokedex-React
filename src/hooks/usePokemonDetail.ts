import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, fetchSpecies, fetchEvolutionChain, fetchType } from "@/services/pokeapi";
import { mapPokemonDetail } from "@/utils/pokemonMapper";
import type { PokemonDetail } from "@/types/pokemon";

async function loadDetail(id: number): Promise<PokemonDetail> {
  const pokemon = await fetchPokemon(id);
  const species = await fetchSpecies(pokemon.species.url);
  const typeRequests = pokemon.types.map((t) => fetchType(t.type.name));
  const evolutionRequest = species.evolution_chain?.url
    ? fetchEvolutionChain(species.evolution_chain.url)
    : Promise.resolve(null);
  const [evolutionResult, ...typesData] = await Promise.all([
    evolutionRequest,
    ...typeRequests,
  ]);
  const evolution = evolutionResult ?? {
    id: pokemon.id,
    chain: {
      species: { name: pokemon.species.name, url: pokemon.species.url },
      evolution_details: [],
      evolves_to: [],
    },
  };
  return mapPokemonDetail(pokemon, species, evolution, typesData);
}

export function usePokemonDetail(id: number | null) {
  return useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => loadDetail(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 30,
  });
}