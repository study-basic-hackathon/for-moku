
import ColorPalette from '@/components/organisms/event/venueedit/palette/ColorPalette';
import { Color } from 'react-color';
import ColorSingleSelector from '@/components/organisms/event/venueedit/palette/ColorSingleSelector';
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection';

interface VenueToolSubMenuProps {
  colorPalette: Color[];
  onAddColor: (color: Color) => void;
  onDeleteColor: (color: Color) => void;
}

export default function VenueToolSubMenu({
  colorPalette,
  onAddColor,
  onDeleteColor
}: Readonly<VenueToolSubMenuProps>) {
  const { toolType, isPixelTool, isTextTool } = useSubToolSelection();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center border border-gray-900 rounded-lg">
      <div className="h-full w-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-2 bg-gray-100 rounded mb-4">
            <span className="text-sm">現在のツール: {toolType ?? 'なし'}</span>
          </div>
          {isPixelTool && (
            <ColorPalette
              colors={colorPalette}
              onAddColor={onAddColor}
              onDeleteColor={onDeleteColor}
            />
          )}
          {isTextTool && (
            <ColorSingleSelector/>
          )}
        </div>
      </div>
    </div>
  );
} 