export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: Array<{ name: string; url: string }>;
}

export interface RawPokemon {
  id: number;
  name: string;
  species: { name: string; url: string };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  moves: Array<{
    move: { name: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string };
    }>;
  }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
}

export interface RawSpecies {
  id: number;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
  }>;
  varieties: Array<{
    is_default: boolean;
    pokemon: { name: string; url: string };
  }>;
  evolution_chain: { url: string } | null;
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: { name: string };
  item: { name: string } | null;
}

export interface ChainLink {
  species: { name: string; url: string };
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface RawEvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface RawTypeResponse {
  name: string;
  damage_relations: {
    double_damage_from: Array<{ name: string }>;
    half_damage_from: Array<{ name: string }>;
    no_damage_from: Array<{ name: string }>;
  };
}

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export interface PokemonStat { name: StatName; value: number; }
export interface PokemonMove { name: string; learnMethod: string; level: number | null; }

export interface EvolutionStep {
  name: string;
  id: number;
  sprite: string;
  minLevel: number | null;
  trigger: string | null;
  item: string | null;
}

export interface SpecialForm {
  name: string;
  id: number;
  sprite: string;
  isDefault: boolean;
}

export interface TypeWeakness { type: string; multiplier: number; }

export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string | null;
  shinySprite: string | null;
  artwork: string | null;
  shinyArtwork: string | null;
  types: string[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  evolutionChain: EvolutionStep[][];
  specialForms: SpecialForm[];
  weaknesses: TypeWeakness[];
  flavorText: string;
}

export type PokemonTab = "status" | "evolucao" | "golpes" | "fraquezas";