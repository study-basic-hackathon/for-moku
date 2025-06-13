import { auth } from '@/lib/auth/auth';
import { selectUserByEmail } from '@/lib/db/user';
import UserEditTemplate from '@/components/templates/user/UserEditTemplate';
import RegisterShortcutTemplate from '@/components/templates/common/RegisterShortcutTemplate';

export default async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    return <div>ログインしていません</div>;
  }

  const user = await selectUserByEmail(session.user.email);

  if (!user) {
    return (
      <RegisterShortcutTemplate
        title="ユーザー情報が未登録です"
        linkHref="/user/register"
        linkLabel="ユーザー登録へ進む"
      />
    );
  }

  return <UserEditTemplate />;
}
