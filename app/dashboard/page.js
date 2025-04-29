import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ProjectList from '@/components/ProjectList';
export default async function DashboardPage(){
  const session = await getServerSession(authOptions);
  if(!session) return <p>Accès refusé</p>;
  return <ProjectList userEmail={session.user.email} />;
}
