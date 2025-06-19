import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { WheelEvent, MouseEvent as ReactMouseEvent } from "react";

export default function ZoomPanContainer({
  scale,
  setScale,
  children,
}: Readonly<{
  scale: number,
  setScale: Dispatch<SetStateAction<number>>,
  children: React.ReactNode,
}>) {

  const [translate, setTranslate] = useState([0, 0]);
  const [isDragging, setDragging] = useState(false);

  const lastX = useRef(0);
  const lastY = useRef(0);

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const deltaX = e.pageX - lastX.current;
    const deltaY = e.pageY - lastY.current;

    lastX.current = e.pageX;
    lastY.current = e.pageY;
    setTranslate(prev => [prev[0] + deltaX, prev[1] + deltaY]);
  }

  function onMouseDown(e: ReactMouseEvent) {
    if (e.button !== 0) return;

    lastX.current = e.pageX;
    lastY.current = e.pageY;
    setDragging(true);
  }

  function onMouseUp() {
    setDragging(false);
  };

  function onScroll(e: WheelEvent) {
    const delta = e.deltaY * -0.001;
    const newScale = scale! + delta;

    if (newScale >= 0.5 && newScale <= 2) {
      setScale!(newScale);
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="size-full overflow-hidden select-none"
      onWheel={onScroll}
      onMouseDown={onMouseDown}
    >
      <div
        className="size-full flex justify-center items-center"
        style={{transform: `translate(${translate[0]}px, ${translate[1]}px) scale(${scale})`}}
      >
        {children}
      </div>
    </div>
  )
}
