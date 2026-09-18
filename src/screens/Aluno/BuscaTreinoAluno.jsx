import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { buscarTreinoTelefone } from '../../database/db';

export default function BuscaTreinoAluno() {
  const [telefoneBusca, setTelefoneBusca] = useState('');
  const [treinos, setTreinos] = useState([]);

  const handleBuscarTreinos = async () => {
    if (!telefoneBusca.trim()) {
      Alert.alert('Atenção', 'Por favor, digite seu telefone para buscar.');
      return;
    }

    try {
      const resultado = await buscarTreinoTelefone(telefoneBusca.trim());
      setTreinos(resultado);

      if (resultado.length === 0) {
        Alert.alert('Aviso', 'Nenhum treino encontrado para este telefone.');
      }
    } catch (error) {
      console.error('Erro ao buscar treinos por telefone:', error);
      Alert.alert('Erro', 'Não foi possível realizar a busca.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Meus Treinos</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone (ex: 999999999)"
          keyboardType="phone-pad"
          value={telefoneBusca}
          onChangeText={setTelefoneBusca}
        />
        <TouchableOpacity style={styles.botao} onPress={handleBuscarTreinos}>
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={treinos}
        keyExtractor={(item, index) =>
          item.id_treino
            ? item.id_treino.toString()
            : `aluno-${item.id_aluno}-${index}`
        }
        renderItem={({ item }) => (
          <View style={styles.cardTreino}>
            <Text style={styles.textoCard}>
              <Text style={styles.bold}>Aluno:</Text> {item.nome_aluno}
            </Text>
            <Text style={styles.textoCard}>
              <Text style={styles.bold}>Telefone:</Text> {item.telefone_aluno}
            </Text>

            {item.nome_treino ? (
              <>
                <Text style={styles.nomeTreino}>{item.nome_treino}</Text>
                <Text style={styles.textoCard}>
                  <Text style={styles.bold}>Objetivo:</Text> {item.objetivo}
                </Text>
                <Text style={styles.textoCard}>
                  <Text style={styles.bold}>Duração:</Text> {item.duracao}
                </Text>
                <Text style={styles.textoCard}>
                  <Text style={styles.bold}>Professor:</Text>{' '}
                  {item.nome_professor}
                </Text>
              </>
            ) : (
              <Text style={styles.vazio}>
                Este aluno ainda não possui treinos cadastrados.
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum registro encontrado para este telefone.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  botao: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    height: 50,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardTreino: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nomeTreino: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  textoCard: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
});
