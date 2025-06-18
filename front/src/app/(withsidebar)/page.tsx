
import { getDashboardViewModel } from '@/actions/dashboard/viewmodel';
import DashboardTemplate from '@/components/templates/dashboard/DashboardTemplate';

export default async function Dashboard() {
  //　ユーザがいなければ、ユーザ登録に誘導する
  const dashboardViewModel = await getDashboardViewModel();
  return (
    <DashboardTemplate dashboardViewModel={dashboardViewModel} />
  );
}
