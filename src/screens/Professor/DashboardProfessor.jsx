import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuCard from '../../components/MenuCard';

export default function dashboardProfessor({ navigation }) {
  const stats = {
    totalAlunos: 12,
    treinosAtivos: 15,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Bem-vindo(a) de volta! 👋</Text>
            <Text style={styles.subWelcomeText}>Painel do Professor</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.replace('Login')}
          >
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={28} color="#007AFF" />
            <Text style={styles.statNumber}>{stats.totalAlunos}</Text>
            <Text style={styles.statLabel}>Alunos</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="barbell" size={28} color="#34C759" />
            <Text style={styles.statNumber}>{stats.treinosAtivos}</Text>
            <Text style={styles.statLabel}>Fichas de Treino</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.menuContainer}>
          <MenuCard
            title="Cadastrar Novo Aluno"
            description="Adicione um aluno ao seu sistema"
            iconName="person-add"
            iconColor="#007AFF"
            iconBgColor="#E1F0FF"
            onPress={() => navigation.navigate('CadastroAluno')}
          />

          <MenuCard
            title="Gerenciar Alunos & Treinos"
            description="Visualize alunos e monte fichas"
            iconName="fitness"
            iconColor="#34C759"
            iconBgColor="#E8F8F0"
            onPress={() => navigation.navigate('ListaAlunos')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContainer: { padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' },
  subWelcomeText: { fontSize: 14, color: '#8E8E93', marginTop: 2 },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 16,
    borderRadius: 14,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: '0.03',
    shadowRadius: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 10,
  },
  statLabel: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  menuContainer: { gap: 12 },
  menuCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#1C1C1E' },
  menuDescription: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
});
