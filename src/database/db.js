import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('academia.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS professor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      senha TEXT NOT NULL,
      especialidade TEXT NOT NULL,
      contato TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS aluno (
      id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      idade INTEGER NOT NULL,
      peso REAL NOT NULL,
      altura REAL NOT NULL,
      telefone TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS treino (
      id_treino INTEGER PRIMARY KEY AUTOINCREMENT,
      id_aluno INTEGER REFERENCES aluno(id_aluno),
      id_professor INTEGER REFERENCES professor(id),
      nome_treino TEXT NOT NULL,
      objetivo TEXT,
      duracao TEXT
    );
  `);
  return db;
}

//Cadastro Professor
export async function cadastrarProfessor(
  nome,
  email,
  senha,
  especialidade,
  contato,
) {
  const db = await openDatabase();

  await db.runAsync(
    'INSERT INTO professor (nome, email, senha, especialidade, contato) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senha, especialidade, contato],
  );
}
//Listagem Professor
export async function listarProfessor() {
  const db = await openDatabase();

  const professores = await db.getAllAsync('SELECT * FROM professor');

  console.log('Professores:', professores);

  return professores;
}
//Fazer Login
export async function fazerLogin(email, senha) {
  const db = await openDatabase();

  const professor = await db.getFirstAsync(
    'SELECT * FROM professor WHERE email = ? AND senha = ?',
    email,
    senha,
  );
  return professor;
}

//Cadastro Aluno
export async function cadastrarAluno(nome, idade, peso, altura, telefone) {
  const db = await openDatabase();

  await db.runAsync(
    'INSERT INTO aluno (nome, idade, peso, altura, telefone) VALUES (?, ?, ?, ?, ?)',
    [nome, idade, peso, altura, telefone],
  );
}
//Listagem de Alunos
export async function listarAlunos() {
  const db = await openDatabase();

  const alunos = await db.getAllAsync('SELECT * FROM aluno');

  return alunos;
}

//Cadastro Treino
export async function cadastrarTreino(
  id_aluno,
  id_professor,
  nome_treino,
  objetivo,
  duracao,
) {
  const db = await openDatabase();

  await db.runAsync(
    'INSERT INTO treino (id_aluno, id_professor, nome_treino, objetivo, duracao) VALUES (?, ?, ?, ?, ?)',
    [id_aluno, id_professor, nome_treino, objetivo, duracao],
  );
}

//Atualizar Aluno
export async function atualizarAluno(
  id_aluno,
  nome,
  idade,
  peso,
  altura,
  telefone,
) {
  const db = await openDatabase();
  await db.runAsync(
    'UPDATE aluno SET nome = ?, idade = ?, peso = ?, altura = ?, telefone = ? WHERE id_aluno = ?',
    nome,
    idade,
    peso,
    altura,
    telefone,
    id_aluno,
  );
  console.log('Aluno atualizado ID:', id_aluno);
}

//Deletar Aluno
export async function deletarAluno(id_aluno) {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM aluno WHERE id_aluno = ?', [id_aluno]);
    await db.runAsync('DELETE FROM treino WHERE id_aluno = ?', [id_aluno]);
    console.log('Aluno atualizado ID:', id_aluno);
  } catch (error) {
    console.log('Erro:', error);
  }
}

export async function buscarTreinoTelefone(telefoneAluno) {
  const db = await openDatabase();

  const treinos = await db.getAllAsync(
    'Select treino.*, aluno.nome AS nome_aluno, aluno.telefone AS telefone_aluno, professor.nome AS nome_professor FROM aluno LEFT JOIN treino ON aluno.id_aluno = treino.id_aluno LEFT JOIN professor ON treino.id_professor = professor.id WHERE aluno.telefone LIKE?',
    [`%${telefoneAluno}%`],
  );

  return treinos;
}

// Listar Treinos por Aluno
export async function listarTreinosPorAluno(id_aluno) {
  const db = await openDatabase();
  const treinos = await db.getAllAsync(
    'SELECT * FROM treino WHERE id_aluno = ?',
    [id_aluno],
  );
  return treinos;
}
