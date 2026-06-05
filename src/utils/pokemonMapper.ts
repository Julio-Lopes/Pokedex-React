import type {
  RawPokemon, RawSpecies, RawEvolutionChain, RawTypeResponse,
  PokemonDetail, PokemonStat, PokemonMove, EvolutionStep,
  TypeWeakness, StatName, ChainLink, SpecialForm,
} from "@/types/pokemon";

const STAT_ORDER: StatName[] = [
  "hp","attack","defense","special-attack","special-defense","speed",
];

function mapStats(raw: RawPokemon): PokemonStat[] {
  return STAT_ORDER.map((name) => {
    const found = raw.stats.find((s) => s.stat.name === name);
    return { name, value: found?.base_stat ?? 0 };
  });
}

function mapMoves(raw: RawPokemon): PokemonMove[] {
  const levelUp: PokemonMove[] = [];
  const others: PokemonMove[] = [];
  for (const m of raw.moves) {
    const detail = m.version_group_details.at(-1);
    if (!detail) continue;
    const move: PokemonMove = {
      name: m.move.name,
      learnMethod: detail.move_learn_method.name,
      level: detail.level_learned_at > 0 ? detail.level_learned_at : null,
    };
    if (detail.move_learn_method.name === "level-up") levelUp.push(move);
    else others.push(move);
  }
  levelUp.sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  return [...levelUp.slice(0, 8), ...others.slice(0, 4)];
}

function extractId(url: string): number {
  return Number(url.replace(/\/$/, "").split("/").at(-1));
}

function mapSpecialForms(species: RawSpecies, basePokemonId: number): SpecialForm[] {
  return species.varieties
    .map((variant) => ({
      name: variant.pokemon.name,
      id: extractId(variant.pokemon.url),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractId(variant.pokemon.url)}.png`,
      isDefault: variant.is_default,
    }))
    .filter((form) => Number.isFinite(form.id) && form.id !== basePokemonId);
}

function flattenChain(chain: ChainLink): EvolutionStep[][] {
  const stages: EvolutionStep[][] = [];
  function walk(link: ChainLink, depth: number) {
    const id = extractId(link.species.url);
    if (!stages[depth]) stages[depth] = [];
    stages[depth].push({
      name: link.species.name, id,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      minLevel: link.evolution_details[0]?.min_level ?? null,
      trigger: link.evolution_details[0]?.trigger?.name ?? null,
      item: link.evolution_details[0]?.item?.name ?? null,
    });
    for (const next of link.evolves_to) walk(next, depth + 1);
  }
  walk(chain, 0);
  return stages;
}

export function calculateWeaknesses(typesData: RawTypeResponse[]): TypeWeakness[] {
  const m: Record<string, number> = {};
  for (const td of typesData) {
    for (const t of td.damage_relations.double_damage_from) m[t.name] = (m[t.name] ?? 1) * 2;
    for (const t of td.damage_relations.half_damage_from)   m[t.name] = (m[t.name] ?? 1) * 0.5;
    for (const t of td.damage_relations.no_damage_from)     m[t.name] = 0;
  }
  return Object.entries(m)
    .map(([type, multiplier]) => ({ type, multiplier }))
    .filter((w) => w.multiplier !== 1)
    .sort((a, b) => b.multiplier - a.multiplier);
}

function getFlavorText(species: RawSpecies): string {
  const pt = species.flavor_text_entries.find((e) => e.language.name === "pt-br");
  const en = species.flavor_text_entries.find((e) => e.language.name === "en");
  return (pt?.flavor_text ?? en?.flavor_text ?? "").replace(/\f|\n/g, " ").trim();
}

export function mapPokemonDetail(
  pokemon: RawPokemon, species: RawSpecies,
  evolution: RawEvolutionChain | null, typesData: RawTypeResponse[]
): PokemonDetail {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
    shinySprite: pokemon.sprites.front_shiny,
    artwork: pokemon.sprites.other["official-artwork"].front_default,
    shinyArtwork: pokemon.sprites.other["official-artwork"].front_shiny,
    types: pokemon.types.map((t) => t.type.name),
    stats: mapStats(pokemon),
    moves: mapMoves(pokemon),
    evolutionChain: evolution ? flattenChain(evolution.chain) : [],
    specialForms: mapSpecialForms(species, pokemon.id),
    weaknesses: calculateWeaknesses(typesData),
    flavorText: getFlavorText(species),
  };
}