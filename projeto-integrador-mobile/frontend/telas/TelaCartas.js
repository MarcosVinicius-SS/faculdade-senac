import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image,
  ScrollView, ActivityIndicator, Alert, StyleSheet,
} from 'react-native';
import { api } from '../api';

export default function TelaCartas() {
  const [carta, setCarta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoritando, setFavoritando] = useState(false);

  async function puxarCarta() {
    try {
      setLoading(true);
      const offset = Math.floor(Math.random() * 5000);
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=${offset}`;
      const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        Alert.alert('Tente de novo', 'Nenhuma carta encontrada.');
        return;
      }
      setCarta(data.data[0]);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível puxar a carta.');
    } finally {
      setLoading(false);
    }
  }

  async function favoritar() {
    if (!carta) return;
    try {
      setFavoritando(true);
      const resultado = await api.adicionarFavorito({
        cardId: String(carta.id),
        nome: carta.name,
        tipo: carta.type,
        atributo: carta.attribute || '',
        nivel: carta.level || null,
        atk: carta.atk ?? null,
        def: carta.def ?? null,
        imagem: carta.card_images[0].image_url,
        nota: '',
      });

      if (resultado.erro) {
        Alert.alert('Aviso', resultado.erro);
      } else {
        Alert.alert(' Favoritado!', `${carta.name} foi adicionada ao seu baralho!`);
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível favoritar. Backend rodando?');
    } finally {
      setFavoritando(false);
    }
  }

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo}>
      <Text style={s.titulo}>Meu Baralho</Text>
      <Text style={s.subtitulo}>YU-GI-OH!</Text>

      <TouchableOpacity style={s.btnPuxar} onPress={puxarCarta} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#111" />
          : <Text style={s.btnPuxarTexto}> Puxar Carta</Text>
        }
      </TouchableOpacity>

      {carta ? (
        <View style={s.card}>
          <Image
            source={{ uri: carta.card_images[0].image_url }}
            style={s.imagem}
            resizeMode="contain"
          />

          <Text style={s.nome}>{carta.name}</Text>

          <View style={s.badges}>
            <Text style={s.badge}>{carta.type}</Text>
            {carta.attribute && <Text style={s.badge}>{carta.attribute}</Text>}
            {carta.level && <Text style={s.badge}>Nível {carta.level}</Text>}
          </View>

          {(carta.atk !== undefined || carta.def !== undefined) && (
            <View style={s.statsRow}>
              <View style={s.stat}>
                <Text style={s.statLabel}>ATK</Text>
                <Text style={s.statValor}>{carta.atk ?? '?'}</Text>
              </View>
              <View style={s.divisor} />
              <View style={s.stat}>
                <Text style={s.statLabel}>DEF</Text>
                <Text style={s.statValor}>{carta.def ?? '?'}</Text>
              </View>
            </View>
          )}

          <Text style={s.desc} numberOfLines={4}>{carta.desc}</Text>

          <TouchableOpacity style={s.btnFavoritar} onPress={favoritar} disabled={favoritando}>
            {favoritando
              ? <ActivityIndicator color="#111" />
              : <Text style={s.btnFavoritarTexto}> Adicionar ao Baralho</Text>
            }
          </TouchableOpacity>
        </View>
      ) : (
        <View style={s.vazio}>
          <Text style={s.vazioTexto}>Puxe uma carta para começar</Text>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  conteudo: { alignItems: 'center', padding: 20, paddingBottom: 50 },
  titulo: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 10 },
  subtitulo: { color: '#f0c040', fontSize: 13, letterSpacing: 3, marginBottom: 24 },
  btnPuxar: {
    backgroundColor: '#f0c040',
    paddingHorizontal: 36, paddingVertical: 14,
    borderRadius: 8, marginBottom: 24,
    minWidth: 200, alignItems: 'center',
  },
  btnPuxarTexto: { color: '#111', fontWeight: 'bold', fontSize: 15 },
  card: {
    backgroundColor: '#1a1a1a', borderRadius: 12,
    padding: 18, width: '100%', alignItems: 'center',
    borderWidth: 1, borderColor: '#2a2a2a',
  },
  imagem: { width: 200, height: 290, borderRadius: 8, marginBottom: 16 },
  nome: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 14 },
  badge: {
    backgroundColor: '#222', color: '#999', fontSize: 11,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 4, margin: 3, borderWidth: 1, borderColor: '#333',
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row', backgroundColor: '#222',
    borderRadius: 8, paddingVertical: 14, paddingHorizontal: 20,
    marginBottom: 14, alignItems: 'center', width: '100%',
    justifyContent: 'center', borderWidth: 1, borderColor: '#2a2a2a',
  },
  stat: { alignItems: 'center', paddingHorizontal: 24 },
  statLabel: { color: '#666', fontSize: 11, marginBottom: 4, letterSpacing: 1 },
  statValor: { color: '#f0c040', fontSize: 22, fontWeight: 'bold' },
  divisor: { width: 1, height: 30, backgroundColor: '#333' },
  desc: { color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 18, lineHeight: 18 },
  btnFavoritar: {
    backgroundColor: '#f0c040', paddingHorizontal: 30,
    paddingVertical: 12, borderRadius: 8, width: '100%', alignItems: 'center',
  },
  btnFavoritarTexto: { color: '#111', fontWeight: 'bold', fontSize: 14 },
  vazio: { marginTop: 80 },
  vazioTexto: { color: '#444', fontSize: 14 },
});
