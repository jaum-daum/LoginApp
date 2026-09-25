import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { listarTreinosPorAluno } from '../../database/db';

export default function TreinosAluno({ route, navigation }) {
  const { aluno } = route.params;
  const [treinos, setTreinos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarTreinos();
    }, [aluno.id_aluno]),
  );

  const carregarTreinos = async () => {
    try {
      const dados = await listarTreinosPorAluno(aluno.id_aluno);
      setTreinos(dados);
    } catch (error) {
      console.log('Erro ao carregar treinos:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Treinos de {aluno.nome}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('cadastrarTreinoAluno', { aluno })}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id_treino.toString()}
        renderItem={({ item }) => (
          <View style={styles.treinoCard}>
            <Ionicons
              name="barbell"
              size={22}
              color="#007AFF"
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.treinoNome}>{item.nome_treino}</Text>
              {item.objetivo ? (
                <Text style={styles.treinoDetalhe}>
                  Objetivo: {item.objetivo}
                </Text>
              ) : null}
              {item.duracao ? (
                <Text style={styles.treinoDetalhe}>
                  Duração: {item.duracao}
                </Text>
              ) : null}
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum treino cadastrado para este aluno.
            </Text>
          </View>
        }
      />
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
    marginBottom: 15,
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1C1C1E',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  addButton: {
    padding: 4,
    backgroundColor: '#E1F0FF',
    borderRadius: 8,
  },
  listContainer: { padding: 20 },
  treinoCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
  },
  treinoNome: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E' },
  treinoDetalhe: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 14, color: '#8E8E93' },
});
