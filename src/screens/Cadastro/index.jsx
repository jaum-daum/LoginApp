import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import ComponenteBotao from '../../components/ComponenteBotao';
import { cadastrarProfessor, listarProfessor } from '../../database/db';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default function CadastroProfessor({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [especialidade, setEspecialidade] = useState(''); 
  const [contato, setContato] = useState('');

  const handleCadastrar = async () => {

    if (!nome || !email || !senha || !especialidade || !contato) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
     
      await cadastrarProfessor(nome, email, senha, especialidade, contato);

      console.log("Cadastro com sucesso.");
      await listarProfessor();

    } catch (error) {
      console.log("ERRO NO BANCO:", error);
      Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  };
  
  return (
    <View style={styles.container}>

      <Image source={require('../../assets/android-icon-foreground.png')} style={styles.logo} />

      <Text style={styles.texto}>Cadastro</Text>

      <TextInput 
        placeholder='Nome' 
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput 
        placeholder='E-mail' 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput 
        placeholder='Contato' 
        style={styles.input}
        value={contato}
        onChangeText={setContato}
      />

      <TextInput 
        placeholder='Senha' 
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Dropdown
        style={styles.dropdown}
        data={[
          { label: 'Hipertrofia', value: 'Hipertrofia' },
          { label: 'Emagrecimento', value: 'Emagrecimento' },
          { label: 'Saude', value: 'Saude' }
        ]}
        labelField="label"
        valueField="value"
        placeholder="Selecione a especialidade..."
        value={especialidade}
        onChange={item => setEspecialidade(item.value)}
      />

      <ComponenteBotao title="Cadastrar" onPress={handleCadastrar} />
         
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
        <Text style={{ textAlign: 'center' }}>
          Já tem uma conta?<Text style={{ color: '#007AFF', fontWeight: 'bold' }}> Faça login</Text>
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}