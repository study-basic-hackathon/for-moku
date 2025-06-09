import { getMockUserGroups } from '@/actions/event/getUserGroup';
import EventRegisterTemplate from '@/components/templates/event/register/EventRegisterTemplate';

export default async function EventRegisterPage() {
  const userGroups = await getMockUserGroups();
  
  return (
    <EventRegisterTemplate userGroups={userGroups} />
  );
} 