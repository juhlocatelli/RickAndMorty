import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { fetchCharacters } from '../api/ApiRick';
import CharacterCard from '../components/CardPersonagem';

export default function ListaPersonagem({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 estado de carregamento
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data.results);
      } catch (err) {
        setError('Erro ao carregar personagens.');
      } finally {
        setLoading(false); // 👈 desativa o loading
      }
    };
    carregarDados();
  }, []);

  if (loading) {
    // 👇 enquanto estiver carregando, mostra o indicador
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text style={{ marginTop: 10 }}>Carregando personagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CharacterDetails', {
                id: item.id,
                name: item.name,
              })
            }
          >
            <CharacterCard character={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
