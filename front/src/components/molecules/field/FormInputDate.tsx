import { DatePicker } from "@/components/molecules/input/DatePicker"
import { useState } from "react";
import { cn } from "@/lib/shadcn/utils";
import { formatDateTimeYYYYMMDD_HYPHEN, getDateTimeRemovedTimezone } from "@/lib/util/date";

interface FormInputDateProps {
  name: string;
  placeholder?: string;
  hasError?: boolean;
  defaultValue?: string;
}

/**
 * フォームの入力フィールドコンポーネント
 * 
 * @param name - 入力フィールドの名前（必須）
 * @param placeholder - プレースホルダーテキスト
 * @param hasError - エラー状態かどうか
 * @param defaultValue - デフォルト値
 * 
 * @example
 * ```tsx
 * <FormInputDate
 *   name="date"
 *   placeholder="日付を入力"
 *   hasError={errors.date}
 *   defaultValue={formData.date}
 * />
 * ```
 */
export default function FormInputDate({ name, placeholder, hasError, defaultValue }: Readonly<FormInputDateProps>) {
  // 日付を管理するstate(デフォルト値があればそれを使用し、なければ今日の日付を使用)
  const [date, setDate] = useState<Date>(defaultValue ? 
          getDateTimeRemovedTimezone(new Date(defaultValue)) : getDateTimeRemovedTimezone(new Date()))
  
  return (
    <> 
      <DatePicker
        className={cn('w-full p-2 rounded-md text-md', hasError ? 'border-red-500' : 'border-gray-300')}
        value={date}
        onChange={(date) => {
          if (date) {
            setDate(getDateTimeRemovedTimezone(date))
          }
        }}
        placeholder={placeholder}
      />
      <input
        type="hidden"
        name={name}
        
        value={formatDateTimeYYYYMMDD_HYPHEN(date)}
      />
    </>
  );
} 