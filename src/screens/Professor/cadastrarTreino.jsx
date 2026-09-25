import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cadastrarTreino } from '../../database/db';

export default function cadastrarTreinoAluno({ navigation, route }) {
  const { aluno, id_professor } = route.params || {};
  const id_aluno = aluno?.id_aluno;

  const [nomeTreino, setNomeTreino] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [duracao, setDuracao] = useState('');

  const handleCadastrar = async () => {
    if (!nomeTreino || !objetivo || !duracao) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!id_aluno) {
      Alert.alert('Erro', 'ID do aluno não identificado.');
      return;
    }

    try {
      const professorFinal = id_professor || 1;

      await cadastrarTreino(
        id_aluno,
        professorFinal,
        nomeTreino,
        objetivo,
        duracao,
      );

      console.log('Cadastro com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.log('ERRO NO BANCO:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Treino</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        {aluno && (
          <View style={styles.alunoDestaqueCard}>
            <Text style={styles.alunoNomeDestaque}>Aluno: {aluno.nome}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Nome do Treino (ex: Treino A - Superiores)"
          placeholderTextColor="#888"
          value={nomeTreino}
          onChangeText={setNomeTreino}
        />

        <TextInput
          style={styles.input}
          placeholder="Objetivo (ex: Hipertrofia / Emagrecimento)"
          placeholderTextColor="#888"
          value={objetivo}
          onChangeText={setObjetivo}
        />

        <TextInput
          style={styles.input}
          placeholder="Duração (ex: 60 min)"
          placeholderTextColor="#888"
          value={duracao}
          onChangeText={setDuracao}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
          <Text style={styles.textoBotao}>Salvar Treino</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },

  // Estilo do card centralizado
  alunoDestaqueCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1F0FF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#CCE4FF',
  },
  alunoNomeDestaque: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#003D82',
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 15,
    color: '#1C1C1E',
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
