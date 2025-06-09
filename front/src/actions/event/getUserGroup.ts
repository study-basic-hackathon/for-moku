'use server';

/**
 * ユーザーグループを取得
 * 
 * @returns ユーザーグループの配列
 */
export async function getMockUserGroups() {
  // 1秒待機
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 適当なデータを返却
  return [
    { id: 1, name: 'グループA' },
    { id: 2, name: 'グループB' },
    { id: 3, name: 'グループC' }
  ];
}