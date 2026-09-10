import React from 'react';
import Login from '../screens/Login';
import CadastroProfessor from '../screens/Cadastro';
import CadastroAluno from '../screens/Professor/cadastrarAluno';
import dashboardProfessor from '../screens/Professor/DashboardProfessor'
import ListaAlunos from '../screens/Professor/ListarAlunos'
import cadastrarTreinoAluno from '../screens/Professor/cadastrarTreino'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="CadastroProfessor" component={CadastroProfessor}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>

                <Stack.Screen name="dashboardProfessor" component={dashboardProfessor} options={{ headerShown: false}}/>
                <Stack.Screen name="CadastroAluno" component={CadastroAluno}/>
                <Stack.Screen name="ListaAlunos" component={ListaAlunos}/>
                <Stack.Screen name="cadastrarTreinoAluno" component={cadastrarTreinoAluno}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}