import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cadastrarAluno } from '../../database/db';

export default function CadastrarAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSalvarAluno = async () => {
    if (!nome || !idade) {
      Alert.alert('Atenção', 'Preencha pelo menos o Nome e a Idade do aluno.');
      return;
    }

    try {
      await cadastrarAluno(nome, idade, peso, altura, telefone);

      Alert.alert('Sucesso!', 'Aluno cadastrado com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novo Aluno</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Carlos Silva"
            placeholderTextColor="#A1A1A6"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Idade *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 25"
            placeholderTextColor="#A1A1A6"
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />

          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 75.5"
                placeholderTextColor="#A1A1A6"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1.75"
                placeholderTextColor="#A1A1A6"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />
            </View>
          </View>

          <Text style={styles.label}>Telefone / WhatsApp</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: (11) 98765-4321"
            placeholderTextColor="#A1A1A6"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <TouchableOpacity style={styles.button} onPress={handleSalvarAluno}>
            <Text style={styles.buttonText}>Salvar Aluno</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 10,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
  formContainer: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#3A3A3C', marginBottom: 4 },
  input: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInputContainer: { width: '48%' },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
