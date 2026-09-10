
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import {SafeAreaView, TouchableOpacity, View, StyleSheet,Text} from 'react-native';
import React, { useState, useEffect } from 'react';
import {listarAlunos} from '../../database/db'

export default function ListaAlunos({navigation}){
    const [alunos, setAlunos] = useState([]);
useEffect(() => {
    carregarAlunos();
  }, []);
    const carregarAlunos = async () => {
        try{
            const dados = await listarAlunos();
            setAlunos(dados);
        }catch (error){
            console.log(error)
        }
    }

    const cardAluno = ({item}) => (
        <TouchableOpacity style={styles.alunoCard} onPress={() => navigation.navigate('cadastrarTreinoAluno')}>
            <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color={"#007AFF"} />
            </View>

            <view style={styles.infoContainer}>
                <Text style={styles.nomeAluno}>{item.nome}</Text>
                <Text style={styles.detalhesAluno}>Idade: {item.idade} - KG:{item.peso} </Text>
            </view>
            <Ionicons name="chevron-forward" size={24} color={"#C7C7CC"}/>
        </TouchableOpacity>
    );

    return(
        <SafeAreaView style={styles.SafeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTexto}>Alunos</Text>
            </View>

            <FlatList 
            data={alunos} 
            keyExtractor={(item) =>item.id_aluno.toString()}
             renderItem={cardAluno}
              style={styles.listContainer}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeArea:{
        flex:1,
        backgroundColor: '#F8F9FA'
    },
    header:{
        alignItems: 'center',
        marginTop: 10
        
    },
    headerTexto:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#070707'
    },
    
  
  
  listContainer: { padding: 20 },
  alunoCard: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 14, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  avatarContainer: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#E1F0FF', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 14 
  },
  infoContainer: { flex: 1, flexDirection: 'column' },
  nomeAluno: { fontSize: 16, fontWeight: 'bold', color: '#1C1C1E', marginInlineEnd: 10 },
  detalhesAluno: { fontSize: 13, color: '#8E8E93', marginTop: 3 }
})