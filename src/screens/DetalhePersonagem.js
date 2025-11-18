import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { fetchpersonagemById } from '../api/ApiRick';

export default function DetalhePersonagem({ route }) {
  const { id } = route.params;
  const [personagem, setpersonagem] = useState(null);
  const [carregando, setcarregando] = useState(true);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchpersonagemById(id);
        if (mounted) setpersonagem(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setcarregando(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff9d" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!personagem) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Não foi possível carregar o personagem.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: personagem.image }} style={styles.imagem} />
      <Text style={styles.nome}>{personagem.name}</Text>
      <Text style={styles.info}>Status: <Text style={styles.valor}>{personagem.status}</Text></Text>
      <Text style={styles.info}>Espécie: <Text style={styles.valor}>{personagem.species}</Text></Text>
      <Text style={styles.info}>Gênero: <Text style={styles.valor}>{personagem.gender}</Text></Text>
      <Text style={styles.info}>Origem: <Text style={styles.valor}>{personagem.origin?.name}</Text></Text>
      <Text style={styles.info}>Localização: <Text style={styles.valor}>{personagem.location?.name}</Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0a0a0f',
    flexGrow: 1
  },
  imagem: { 
    width: 220, 
    height: 220,
    borderRadius: 16, 
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#00ff9d'
  },
  nome: { 
    fontSize: 26, 
    fontWeight: '700',
    color: '#00ff9d', 
    marginBottom: 12,
    textShadowColor: '#00ff9d',
    textShadowRadius: 10
  },
  info: { 
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8
  },
  valor: {
    color: '#00ff9d',
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f'
  },
  loadingText: {
    marginTop: 10,
    color: '#00ff9d'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0f'
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 18
  }
});
