import { getMyAuthedUserGroups } from '@/actions/event/register/getUserGroup';
import EventRegisterTemplate from '@/components/templates/event/register/EventRegisterTemplate';
import RegisterShortcutTemplate from '@/components/templates/common/RegisterShortcutTemplate';

export default async function EventRegisterPage() {
  const result = await getMyAuthedUserGroups();

  if (result instanceof Error) {
    return <div>エラーが発生しました</div>;
  }
  const {userGroups} = result;
  if (userGroups.length === 0) {
    return (
      <RegisterShortcutTemplate
        title="イベントを作る前にユーザグループを作りましょう"
        linkHref="/user_group/register"
        linkLabel="ユーザーグループを作成する"
      />
    );
  }

  return (
    <EventRegisterTemplate userGroups={result.userGroups} />
  );
} 