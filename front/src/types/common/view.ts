
/**
 * 共通のビュー用フィールド
 * 
 * @returns フィールド（詳細は下記）
 */
export type CommonViewIconUnit = {
    name: string;
    iconName?: string;
    description?: string;
    href?: string;
    onClick?: () => Promise<void>;
    iconClassName?: string;
    descriptionClassName?: string;
    divClassName?: string;
}