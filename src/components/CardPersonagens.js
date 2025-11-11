import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardPersonagens({ character, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.meta}>
          {character.status} • {character.species}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { marginTop: 4, fontSize: 13, color: '#555' },
});
