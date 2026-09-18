import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { listarAlunos } from '../../database/db';

export default function ListaAlunos({ navigation }) {
  const [alunos, setAlunos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarAlunos();
    }, []),
  );

  const carregarAlunos = async () => {
    try {
      const dados = await listarAlunos();
      setAlunos(dados);
    } catch (error) {
      console.log(error);
    }
  };

  const cardAluno = ({ item }) => (
    <TouchableOpacity
      style={styles.alunoCard}
      onPress={() => navigation.navigate('EditarAluno', { aluno: item })}
    >
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={24} color={'#007AFF'} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nomeAluno}>{item.nome}</Text>
        <Text style={styles.detalhesAluno}>
          Idade: {item.idade} {item.peso ? `- KG: ${item.peso}` : ''}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={'#C7C7CC'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Alunos</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id_aluno.toString()}
        renderItem={cardAluno}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum aluno cadastrado ainda.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  headerContainer: { paddingHorizontal: 20, paddingTop: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#070707',
  },
  listContainer: { padding: 20, paddingBottom: 90 },
  alunoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E1F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContainer: { flex: 1, flexDirection: 'column' },
  nomeAluno: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  detalhesAluno: { fontSize: 13, color: '#8E8E93', marginTop: 3 },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
