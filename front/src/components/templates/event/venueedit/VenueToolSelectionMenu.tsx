import React from 'react';
import ToolButtonGroup from '@/components/organisms/event/venueedit/tools/ToolButtonGroup';

/**
 * ツール選択メニュー
 *
 * @returns ツール選択メニュー
 */
export default function VenueToolSelectionMenu() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <ToolButtonGroup />
        </div>
      </div>
    </div>
  );
} 