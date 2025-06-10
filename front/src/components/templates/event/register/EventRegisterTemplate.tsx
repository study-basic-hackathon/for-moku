'use client';

import CommonRegisterTemplate from '@/components/templates/common/CommonRegisterTemplate';
import { EVENT_REGISTER_FORM_FIELDS } from '@/lib/event/register/constants';
import { registerEvent } from '@/actions/event/registerEvent';
import { useState } from 'react';
import type { EventRegisterFormField, EventRegisterForm } from '@/types/event/form';
import { FormState } from '@/types/common/form';

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

  // オプションの値を代入する
  const [formFields] = useState<EventRegisterFormField[]>(
    EVENT_REGISTER_FORM_FIELDS.map((field) => 
      field?.name === 'userGroupId'
        ? {
            ...field,
            options: userGroups.map(group => ({
              value: group.id.toString(),
              label: group.name
            }))
          }
        : field
    ).map((field) => 
      field?.name === 'name' 
        ? {
            ...field,
            defaultValue: 'イベント名' //デフォルト値を代入する、これにより更新処理でもCommonRegisterTemplateが使える
          }
        : field
    )
  );

  // サブミット時に送信する関数を定義します
  // ラップしているだけに見えるかもしれませんが、
  // IDなどinput要素として入れておきたくないものを事前に渡せるようにしています。
  const onSubmit = (state: FormState, formData: FormData) => {
    return registerEvent(state, formData);
    // return registerEventOfId(state, formData, 3);
  }

  return (
    <CommonRegisterTemplate<EventRegisterForm>
      title="新規イベント登録"
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
}
