'use server';

import {getDbConnection} from '@/lib/db';

export async function createProject(formData){
  const name = formData.get('name');
  const description = formData.get('description');
  const type = formData.get('type');
  const email = formData.get('email');

  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT id FROM users WHERE email = ?', [email]);
  const userId = rows[0]?.id;
  if(userId){
    await conn.execute('INSERT INTO projects (name, description, type, user_id) VALUES (?, ?, ?, ?)', [name, description, type, userId]);
  }
}

export async function getProjectsByEmail(email){
    const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT id FROM projects WHERE user_id = (SELECT id FROM users WHERE email = ?) ORDER BY created_at DESC', [email]);
  return rows;
}

export async function addTask(formData){
  const title = formData.get('title');
  const projectId = formData.get('projectId');
   const conn = await getDbConnection();
  await conn.execute('INSERT INTO tasks (title, status, project_id) VALUES (?, ?, ?)', [title, 'À faire', projectId]);
}

export async function getTasks(projectId){
   const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM tasks WHERE project_id = ?', [projectId]);
  return rows;
}
