import { Button } from '@/components/atoms/shadcn/button';
import Link from 'next/link';

interface RegisterShortcutTemplateProps {
  title: string;
  linkHref: string;
  linkLabel: string;
}

/**
 * 登録ページへのショートカットテンプレート
 * 
 * @param title タイトル
 * @param linkHref リンク先
 * @param linkLabel リンクのラベル
 * @returns ショートカットテンプレート
 */
export default function RegisterShortcutTemplate({ title, linkHref, linkLabel }: Readonly<RegisterShortcutTemplateProps>) {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <div className="text-center space-y-4">
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        <Button asChild>
          <Link href={linkHref}>
            {linkLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
} 