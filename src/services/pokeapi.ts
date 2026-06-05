import axios from "axios";
import type {
  PokemonListResponse, RawPokemon, RawSpecies,
  RawEvolutionChain, RawTypeResponse, PokemonListItem,
} from "@/types/pokemon";

const api = axios.create({
  baseURL: (import.meta as ImportMeta & { env?: { VITE_POKEAPI_BASE_URL?: string } }).env?.VITE_POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2",
});

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const { data: meta } = await api.get<PokemonListResponse>("/pokemon?limit=1");
  const total = meta.count; // ex: 1302

  const { data } = await api.get<PokemonListResponse>(`/pokemon?limit=${total}`);
  return data.results.map((p) => {
    const parts = p.url.replace(/\/$/, "").split("/");
    const id = Number(parts[parts.length - 1]);
    return {
      id,
      name: p.name,
      url: p.url,
    };
  });
}

export async function fetchPokemonsByType(typeName: string): Promise<number[]> {
  const { data } = await api.get<{
    pokemon: Array<{ pokemon: { name: string; url: string } }>;
  }>(`/type/${typeName}`);

  return data.pokemon
    .map((p) => {
      const parts = p.pokemon.url.replace(/\/$/, "").split("/");
      const last = parts[parts.length - 1];
      const id = Number(last);
      return id;
    })
    .filter((id) => !Number.isNaN(id) && id <= 1025); 
}

export async function fetchPokemon(idOrName: string | number): Promise<RawPokemon> {
  const { data } = await api.get<RawPokemon>(`/pokemon/${idOrName}`);
  return data;
}

export async function fetchSpecies(url: string): Promise<RawSpecies> {
  const { data } = await api.get<RawSpecies>(url);
  return data;
}

export async function fetchEvolutionChain(url: string): Promise<RawEvolutionChain> {
  const { data } = await axios.get<RawEvolutionChain>(url);
  return data;
}

export async function fetchType(typeName: string): Promise<RawTypeResponse> {
  const { data } = await api.get<RawTypeResponse>(`/type/${typeName}`);
  return data;
}