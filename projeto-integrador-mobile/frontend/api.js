// Troque pelo IP da sua máquina se testar no celular físico
// Para emulador Android use: http://10.0.2.2:3001
// Para celular físico use: http://SEU_IP:3001 (ex: http://192.168.1.10:3001)
// Para web use: http://localhost:3001

import { Platform } from 'react-native';

const getBaseURL = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  if (Platform.OS === 'android') return 'http://10.0.2.2:3001';
  return 'http://localhost:3001';
};

export const BASE_URL = getBaseURL();

export const api = {
  async listarFavoritos() {
    const res = await fetch(`${BASE_URL}/favoritos`);
    return res.json();
  },

  async adicionarFavorito(card) {
    const res = await fetch(`${BASE_URL}/favoritos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
    return res.json();
  },

  async editarNota(id, nota) {
    const res = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota }),
    });
    return res.json();
  },

  async removerFavorito(id) {
    const res = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};
