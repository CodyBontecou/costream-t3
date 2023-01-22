import { Rnd } from "react-rnd";
import { useCallback, useState } from "react";
import { DragIcon } from "../components/DragIcon";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
};

const Draggable = () => {
  const [size, setSize] = useState({ height: "100%", width: "100%" });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleIframePointerEvents = useCallback((disable = false) => {
    [...document.getElementsByTagName("iframe")].forEach((iframe) => {
      // eslint-disable-next-line no-param-reassign
      iframe.style.pointerEvents = disable ? "none" : "auto";
    });
  }, []);

  const onDragStartHandler = useCallback(() => {
    toggleIframePointerEvents(true);
  }, [toggleIframePointerEvents]);

  const onDragStopHandler = useCallback(
    (e, d) => {
      setPosition({ x: d.x, y: d.y });
      toggleIframePointerEvents(false);
    },
    [toggleIframePointerEvents]
  );

  const onResizeStartHandler = useCallback(
    (e, direction, ref, delta, pos) => {
      toggleIframePointerEvents(true);
      setSize({ height: ref.offsetHeight, width: ref.offsetWidth });
      setPosition(pos);
    },
    [toggleIframePointerEvents]
  );

  const onResizeStopHandler = useCallback(
    (e, direction, ref, delta, pos) => {
      setSize({ height: ref.offsetHeight, width: ref.offsetWidth });
      setPosition(pos);
      toggleIframePointerEvents(false);
    },
    [toggleIframePointerEvents]
  );
  return (
    <Rnd
      style={style}
      size={size}
      position={position}
      lockAspectRatio={16 / 9}
      onDragStart={onDragStartHandler}
      onDragStop={onDragStopHandler}
      onResize={onResizeStartHandler}
      onResizeStop={onResizeStopHandler}
    >
      <div className="absolute left-0 bottom-0 rounded-full bg-black p-6">
        <DragIcon />
      </div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        width="100%"
        height="100%"
      />
    </Rnd>
  );
};
