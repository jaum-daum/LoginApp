import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { cadastrarTreino } from '../../database/db'

export default function cadastrarTreinoAluno({navigation, route}){
    const {id_professor, id_aluno} = route.params || {};

    const [ nomeTreino, setNomeTreino] = useState('');
    const [ objetivo, setObjetivo] = useState('');
    const [ duracao, setDuracao] = useState('');

    const handleCadastrar = async () => {
    
        if (!nomeTreino || !objetivo || !duracao) {
          Alert.alert('Atenção', 'Preencha todos os campos.');
          return;
        }
    
        try {
         
          await cadastrarTreino(id_aluno, id_professor, nomeTreino, objetivo, duracao);
    
          console.log("Cadastro com sucesso.");
          navigation.goBack();
    
        } catch (error) {
          console.log("ERRO NO BANCO:", error);
          Alert.alert('Erro', 'Não foi possível cadastrar.');
        }
      };
    return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Treino</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Treino (ex: Treino A)"
        placeholderTextColor="#888"
        value={nomeTreino}
        onChangeText={setNomeTreino}
      />

      <TextInput
        style={styles.input}
        placeholder="Objetivo (ex: Hipertrofia)"
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  botao: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
