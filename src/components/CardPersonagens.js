import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardPersonagens({ personagem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: personagem.image }} style={styles.imagem} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{personagem.name}</Text>
        <Text style={styles.info}>Status: <Text style={styles.valor}>{personagem.status}</Text></Text>
        <Text style={styles.info}>Espécie: <Text style={styles.valor}>{personagem.species}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0f1529',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#39ff14', 
    shadowColor: '#39ff14',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#39ff14',
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#39ff14',
    marginBottom: 4,
    textShadowColor: '#39ff14',
    textShadowRadius: 6,
  },
  info: {
    fontSize: 14,
    color: '#d0d0d0'
  },
  valor: {
    color: '#39ff14',
    fontWeight: '600'
  }
});
