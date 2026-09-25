import React from 'react';
import Login from '../screens/Login';
import CadastroProfessor from '../screens/Cadastro';
import CadastroAluno from '../screens/Professor/cadastrarAluno';
import dashboardProfessor from '../screens/Professor/DashboardProfessor';
import ListaAlunos from '../screens/Professor/ListarAlunos';
import cadastrarTreinoAluno from '../screens/Professor/cadastrarTreino';
import EditarAluno from '../screens/Professor/EditarAluno';
import TreinosAluno from '../screens/Professor/TreinosAluno';
import buscaTreinoAluno from '../screens/Aluno/BuscaTreinoAluno';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroProfessor"
          component={CadastroProfessor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboardProfessor"
          component={dashboardProfessor}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CadastroAluno" component={CadastroAluno} />
        <Stack.Screen name="ListaAlunos" component={ListaAlunos} />
        <Stack.Screen
          name="EditarAluno"
          component={EditarAluno}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreinosAluno"
          component={TreinosAluno}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cadastrarTreinoAluno"
          component={cadastrarTreinoAluno}
        />
        <Stack.Screen
          name="buscaTreinoAluno"
          component={buscaTreinoAluno}
          options={{ headerShown: true, title: 'Buscar Treinos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
