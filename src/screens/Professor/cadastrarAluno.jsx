import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './style';
import ComponenteBotao from '../../components/ComponenteBotao';
import { cadastrarAluno} from '../../database/db';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export default function CadastroAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState(''); 
  const [telefone, setTelefone] = useState('');

  const handleCadastrar = async () => {

    if (!nome || !idade || !peso || !altura || !telefone) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
     
      await cadastrarAluno(nome, idade, peso, altura, telefone);
       navigation.goBack();

      console.log("Cadastro com sucesso.");

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
            style={styles.input}
            placeholder="Idade"
            placeholderTextColor="#A1A1A6"
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />

      <TextInput
                style={styles.input}
                placeholder="Peso"
                placeholderTextColor="#A1A1A6"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
              />

      <TextInput
                style={styles.input}
                placeholder="Altura"
                placeholderTextColor="#A1A1A6"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
              />

               <TextInput
            style={styles.input}
            placeholder="Ex: (11) 98765-4321"
            placeholderTextColor="#A1A1A6"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
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