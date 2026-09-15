import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList,
  Alert, StyleSheet, Modal, TextInput, ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api';

export default function TelaFavoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartaSelecionada, setCartaSelecionada] = useState(null);
  const [nota, setNota] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Recarrega sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  async function carregarFavoritos() {
    try {
      setLoading(true);
      const data = await api.listarFavoritos();
      setFavoritos(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar. Backend rodando?');
    } finally {
      setLoading(false);
    }
  }

  function abrirEdicao(carta) {
    setCartaSelecionada(carta);
    setNota(carta.nota || '');
    setModalVisible(true);
  }

  async function salvarNota() {
    if (!cartaSelecionada) return;
    try {
      setSalvando(true);
      await api.editarNota(cartaSelecionada.id, nota);
      setModalVisible(false);
      carregarFavoritos();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    } finally {
      setSalvando(false);
    }
  }

  function confirmarRemocao(carta) {
    const confirmado = window.confirm(`Remover "${carta.nome}" dos favoritos?`);
    if (confirmado) remover(carta.id);
  }

  async function remover(id) {
    try {
      await api.removerFavorito(id);
      carregarFavoritos();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível remover.');
    }
  }

  function renderItem({ item }) {
    return (
      <View style={s.item}>
        <Image source={{ uri: item.imagem }} style={s.imagem} resizeMode="contain" />

        <View style={s.info}>
          <Text style={s.nome} numberOfLines={2}>{item.nome}</Text>

          <View style={s.badges}>
            {item.tipo ? <Text style={s.badge}>{item.tipo}</Text> : null}
            {item.atributo ? <Text style={s.badge}>{item.atributo}</Text> : null}
            {item.nivel ? <Text style={s.badge}>Nv {item.nivel}</Text> : null}
          </View>

          {(item.atk !== null || item.def !== null) && (
            <Text style={s.stats}>
              ATK: <Text style={s.destaque}>{item.atk ?? '?'}</Text>
              {'  '}DEF: <Text style={s.destaque}>{item.def ?? '?'}</Text>
            </Text>
          )}

          {item.nota ? (
            <Text style={s.nota}> {item.nota}</Text>
          ) : null}

          <View style={s.botoes}>
            <TouchableOpacity style={s.btnEditar} onPress={() => abrirEdicao(item)}>
              <Text style={s.btnEditarTexto}>Nota</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnRemover} onPress={() => confirmarRemocao(item)}>
              <Text style={s.btnRemoverTexto}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={s.centro}>
        <ActivityIndicator color="#f0c040" size="large" />
      </View>
    );
  }

  return (
    <View style={s.tela}>
      <Text style={s.titulo}> Meu Baralho</Text>
      <Text style={s.subtitulo}>{favoritos.length} carta(s) salva(s)</Text>

      {favoritos.length === 0 ? (
        <View style={s.vazio}>
          <Text style={s.vazioTexto}>Nenhuma carta favoritada ainda.</Text>
          <Text style={s.vazioSub}>Vá para a aba Cartas e adicione!</Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        />
      )}

      {/* Modal editar nota */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalTitulo}> Editar Nota</Text>
            <Text style={s.modalCarta}>{cartaSelecionada?.nome}</Text>

            <TextInput
              style={s.input}
              placeholder="Digite uma nota sobre a carta..."
              placeholderTextColor="#555"
              value={nota}
              onChangeText={setNota}
              multiline
              numberOfLines={4}
            />

            <View style={s.modalBotoes}>
              <TouchableOpacity style={s.btnCancelar} onPress={() => setModalVisible(false)}>
                <Text style={s.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.btnSalvar} onPress={salvarNota} disabled={salvando}>
                {salvando
                  ? <ActivityIndicator color="#111" />
                  : <Text style={s.btnSalvarTexto}>Salvar</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  centro: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  titulo: { color: '#f0c040', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  subtitulo: { color: '#555', fontSize: 12, textAlign: 'center', marginBottom: 10 },
  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  vazioTexto: { color: '#444', fontSize: 16, marginBottom: 6 },
  vazioSub: { color: '#333', fontSize: 13 },
  item: {
    flexDirection: 'row', backgroundColor: '#1a1a1a',
    borderRadius: 10, marginBottom: 12,
    borderWidth: 1, borderColor: '#2a2a2a', overflow: 'hidden',
  },
  imagem: { width: 90, height: 130 },
  info: { flex: 1, padding: 12 },
  nome: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  badge: {
    backgroundColor: '#222', color: '#888', fontSize: 10,
    paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: 4, marginRight: 4, marginBottom: 4,
    borderWidth: 1, borderColor: '#333', overflow: 'hidden',
  },
  stats: { color: '#666', fontSize: 12, marginBottom: 6 },
  destaque: { color: '#f0c040', fontWeight: 'bold' },
  nota: { color: '#888', fontSize: 11, fontStyle: 'italic', marginBottom: 8 },
  botoes: { flexDirection: 'row', gap: 8 },
  btnEditar: {
    backgroundColor: '#1e3a5f', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 6,
  },
  btnEditarTexto: { color: '#4da6ff', fontSize: 12, fontWeight: 'bold' },
  btnRemover: {
    backgroundColor: '#3a1e1e', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 6,
  },
  btnRemoverTexto: { color: '#ff6b6b', fontSize: 12, fontWeight: 'bold' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1a1a1a', borderRadius: 12,
    padding: 20, width: '88%',
    borderWidth: 1, borderColor: '#2a2a2a',
  },
  modalTitulo: { color: '#f0c040', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  modalCarta: { color: '#666', fontSize: 13, marginBottom: 16 },
  input: {
    backgroundColor: '#111', color: '#fff',
    borderWidth: 1, borderColor: '#333',
    borderRadius: 8, padding: 12,
    fontSize: 14, minHeight: 100,
    textAlignVertical: 'top', marginBottom: 16,
  },
  modalBotoes: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  btnCancelar: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 8, borderWidth: 1, borderColor: '#333',
  },
  btnCancelarTexto: { color: '#666', fontWeight: 'bold' },
  btnSalvar: {
    backgroundColor: '#f0c040', paddingHorizontal: 18,
    paddingVertical: 10, borderRadius: 8, minWidth: 80, alignItems: 'center',
  },
  btnSalvarTexto: { color: '#111', fontWeight: 'bold' },
});
