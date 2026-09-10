import * as SQLite from 'expo-sqlite';

export async function openDatabase(){
  const db = await SQLite.openDatabaseAsync('academia');

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
export async function cadastrarProfessor(nome, email, senha, especialidade, contato){
    const db = await openDatabase();

    await db.runAsync(
        'INSERT INTO professor (nome, email, senha, especialidade, contato) VALUES (?, ?, ?, ?, ?)',
        [nome, email, senha, especialidade, contato]
    );

}
//Listagem Professor
export async function listarProfessor(){
    const db = await openDatabase();

    const professores = await db.getAllAsync(
        'SELECT * FROM professor'
    );

    console.log('Professores:', professores )

    return professores;
}
//Fazer Login
export async function fazerLogin(email, senha){
  const db = await openDatabase();

  const professor = await db.getFirstAsync(
    'SELECT * FROM professor WHERE email = ? AND senha = ?',
    email, senha
  )
  return professor;
}

//Cadastro Aluno
export async function cadastrarAluno(nome, idade, peso, altura, telefone){
    const db = await openDatabase();

    await db.runAsync(
        'INSERT INTO aluno (nome, idade, peso, altura, telefone) VALUES (?, ?, ?, ?, ?)',
        [nome, idade, peso, altura, telefone]
    );

}
//Listagem de Alunos
export async function listarAlunos(){
    const db = await openDatabase();

    const alunos = await db.getAllAsync(
        'SELECT * FROM aluno'
    );

    return alunos;
}

//Cadastro Treino
export async function cadastrarTreino(id_aluno, id_professor, nome_treino, objetivo, duracao){
    const db = await openDatabase();

    await db.runAsync(
        'INSERT INTO treino (id_aluno, id_professor, nome_treino, objetivo, duracao) VALUES (?, ?, ?, ?, ?)',
        [id_aluno, id_professor, nome_treino, objetivo, duracao]
    );
}