import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from './style';
import ComponenteBotao from '../../components/ComponenteBotao';
import { fazerLogin } from '../../database/db';
import { useState } from 'react';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos!');
    }

    try {
      const professor = await fazerLogin(email, senha);

      if (professor) {
        navigation.replace('dashboardProfessor');
      } else {
        console.log('Usuario não encotrado!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/android-icon-foreground.png')}
        style={styles.logo}
      ></Image>

      <Text style={styles.texto}>Meu App</Text>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      ></TextInput>

      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      ></TextInput>

      <ComponenteBotao title="Entrar" onPress={handleLogin} />

      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('CadastroProfessor')}
      >
        <Text style={{ textAlign: 'center' }}>
          Não tem uma conta?
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>
            {' '}
            Cadastre-se
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('buscaTreinoAluno')}
      >
        <Text
          style={{ textAlign: 'center', color: '#007AFF', fontWeight: 'bold' }}
        >
          Buscar Treino
        </Text>
      </TouchableOpacity>
    </View>
  );
}
