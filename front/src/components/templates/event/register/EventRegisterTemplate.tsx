'use client';

import CommonRegisterTemplate from '@/components/templates/common/CommonRegisterTemplate';
import { EVENT_REGISTER_FORM_FIELDS } from '@/lib/event/register/constants';
import { registerEvent } from '@/actions/event/registerEvent';
import { useState } from 'react';
import type { EventRegisterFormField } from '@/types/event/form';

interface EventRegisterTemplateProps {
  userGroups: { id: number; name: string; }[];
}

/**
 * イベント登録テンプレート
 * 
 * @param userGroups ユーザーグループ
 * @returns イベント登録テンプレート
 */
export default function EventRegisterTemplate({ userGroups }: Readonly<EventRegisterTemplateProps>) {
  const [formFields] = useState<EventRegisterFormField[]>(() => 
    EVENT_REGISTER_FORM_FIELDS.map(field => 
      field.name === 'userGroupId'
        ? {
            ...field,
            options: userGroups.map(group => ({
              value: group.id.toString(),
              label: group.name
            }))
          }
        : field
    )
  );

  return (
    <CommonRegisterTemplate
      title="新規イベント登録"
      fields={formFields}
      onSubmit={registerEvent}
    />
  );
}
