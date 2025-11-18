import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchPersonagens } from '../api/ApiRick';
import CardPersonagens from '../components/CardPersonagens';

export default function ListaPersonagem({ navigation }) {
  const [personagens, setPersonagens] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState(null);
  const [temMais, setTemMais] = useState(true);
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const data = await fetchPersonagens(pagina);
      setPersonagens((prev) => [...prev, ...data.results]);
      if (!data.info.next) {
        setTemMais(false); 
      }
      setPagina((prev) => prev + 1);
    } catch (erro) {
      setErro('Erro ao carregar personagens.');
    } finally {
      setCarregando(false);
      setCarregandoMais(false);
    }
  };

  const carregarMais = () => {
    if (!temMais || carregandoMais) return;
    setCarregandoMais(true);
    carregarDados();
  };

  if (carregando) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="#39ff14" />
        <Text style={styles.loadText}>Carregando personagens...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.loadContainer}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={personagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetalhePersonagem', {
                id: item.id,
                name: item.name,
              })
            }
          >
            <CardPersonagens personagem={item} />
          </TouchableOpacity>
        )}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          carregandoMais ? (
            <ActivityIndicator size="large" color="#39ff14" style={{ marginVertical: 20 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1f',
    paddingTop: 10,
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0f1f',
  },
  loadText: {
    marginTop: 10,
    color: '#39ff14', 
    fontSize: 16,
  },
  errorText: {
    color: '#ff5555',
    fontSize: 16,
  }
});
