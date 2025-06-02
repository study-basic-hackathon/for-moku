'use server';

import { registerUserLogic } from '@/lib/user/register';

export async function registerUser(formData: {
  name: string;
  bio: string;
  interests: string;
}) {
  return await registerUserLogic(formData);
}
