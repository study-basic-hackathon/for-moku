import { auth } from '@/lib/auth/auth';
import { selectUserByEmail } from '@/lib/db/user';
import UserGroupRegisterTemplate from '@/components/templates/user_group/UserGroupRegisterTemplate';
import RegisterShortcutTemplate from '@/components/templates/common/RegisterShortcutTemplate';

export default async function UserGroupPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <div>ログインしていません</div>;
  }

  const user = await selectUserByEmail(session.user.email);

  if (!user) {
    return (
      <RegisterShortcutTemplate
        title="ユーザー登録が必要です"
        linkHref="/user/register"
        linkLabel="ユーザー登録へ進む"
      />
    );
  }

  return <UserGroupRegisterTemplate />;
}
