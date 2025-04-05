import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import { useLazyGetPokemonByNameQuery } from '../pokemon';
import { SafeAreaView } from 'react-native-safe-area-context';

const PokemonScreen = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [trigger, { data: pokemon, isFetching, error }] = useLazyGetPokemonByNameQuery();

  const handleSearch = () => {
    if (pokemonName.trim()) {
      trigger(pokemonName.toLowerCase());
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên Pokemon"
          value={pokemonName}
          onChangeText={setPokemonName}
        />
        <Button title="Tìm kiếm" onPress={handleSearch} />

        {isFetching && <Text>Đang tải...</Text>}
        {error && <Text>Không tìm thấy Pokemon</Text>}

        {pokemon && (
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={styles.pokemonImage}
            />
            <Text>Abilities:</Text>
            {pokemon.abilities.map((ability, index) => (
              <Text key={index}>{ability.ability.name}</Text>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pokemonInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
});

export default PokemonScreen;