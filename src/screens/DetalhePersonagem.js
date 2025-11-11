import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { fetchCharacterById } from '../api/ApiRick';

export default function DetalhePersonagem({ route }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCharacterById(id);
        if (mounted) setCharacter(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Não foi possível carregar o personagem.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Status: {character.status}</Text>
      <Text style={styles.info}>Espécie: {character.species}</Text>
      <Text style={styles.info}>Gênero: {character.gender}</Text>
      <Text style={styles.info}>Origem: {character.origin?.name}</Text>
      <Text style={styles.info}>Localização: {character.location?.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16 },
  image: { width: 200, height: 200, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 6 },
});
