import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface PokemonType {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonType, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useLazyGetPokemonByNameQuery } = pokemonApi;