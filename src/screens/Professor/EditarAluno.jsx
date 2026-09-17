import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { atualizarAluno, deletarAluno } from '../../database/db';

export default function EditarAluno({route, navigation}){
    const {aluno} = route.params || {};
    const id_aluno = aluno.id_aluno;

    const [nome, setNome] = useState(aluno.nome);
    const [idade, setIdade] = useState(aluno.idade);
    const [peso, setPeso] = useState(aluno.peso);
    const [altura, setAltura] = useState(aluno.altura); 
    const [telefone, setTelefone] = useState(aluno.telefone);

    const handleAtualizarAluno = async () => {
        if (!nome || !idade || !peso || !altura || !telefone) {
            Alert.alert('Atenção', 'Preencha todos os campos.');
            return;
        }
        try{
            await atualizarAluno(id_aluno, nome, idade, peso, altura, telefone)
            navigation.goBack();
        }catch(error){
            console.log('Error: ', error)
        }
    }

    const handleExcluirAluno = async () => {
        try{
        await deletarAluno(id_aluno)
         navigation.goBack();

        }catch(error){
            console.log('Error: ', error)
        }
    }
return(
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Aluno</Text>
          <TouchableOpacity onPress={handleExcluirAluno} style={styles.deleteIconButton}>
            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Idade *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />

          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />
            </View>
          </View>

          <Text style={styles.label}>Telefone / WhatsApp</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <TouchableOpacity 
            style={[styles.button]} 
            onPress={handleAtualizarAluno}
            
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleExcluirAluno}
          >
            <Text style={styles.deleteButtonText}>Excluir Aluno</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
);

}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25, marginTop: 10 },
  backButton: { padding: 4 },
  deleteIconButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
  formContainer: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#3A3A3C', marginBottom: 4 },
  input: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, fontSize: 16, color: '#1C1C1E', borderWidth: 1, borderColor: '#E5E5EA' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInputContainer: { width: '48%' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, elevation: 2 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FF3B30', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  deleteButtonText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' },
});