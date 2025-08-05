
import ColorPalette from '@/components/organisms/event/venueedit/palette/ColorPalette';
import { Color } from 'react-color';
import ColorSingleSelector from '@/components/organisms/event/venueedit/palette/ColorSingleSelector';
import { useSubToolSelection } from '@/hooks/event/venueedit/useSubToolSelection';

interface VenueToolSubMenuProps {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
  selectedColorBackGround: Color;
  setSelectedColorBackGround: (color: Color) => void;
  colorPalette: Color[];
  onAddColor: (color: Color) => void;
  onDeleteColor: (color: Color) => void;
}

export default function VenueToolSubMenu({
  selectedColor,
  setSelectedColor,
  selectedColorBackGround,
  setSelectedColorBackGround,
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
              onColorSelect={setSelectedColor}
              selectedColor={selectedColor}
              colors={colorPalette}
              onAddColor={onAddColor}
              onDeleteColor={onDeleteColor}
            />
          )}
          {isTextTool && (
            <ColorSingleSelector
              selectedColor={selectedColor}
              selectedColorBackGround={selectedColorBackGround}
              setSelectedColor={setSelectedColor}
              setSelectedColorBackGround={setSelectedColorBackGround}
            />
          )}
        </div>
      </div>
    </div>
  );
} 