import { useRef } from "react";
import { useAnimate } from "framer-motion";
import TouchAppIcon from '@mui/icons-material/TouchApp';

// 距離の計算
const calculateDistance = (x1, y1, x2, y2) => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  return distance;
};

const MouseImageTrail = ({ images, renderImageBuffer, rotationRange, children }) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });

  // サイレンダリングなしにカウントを保持する
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    // カーソルと画像の距離の計算
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    // カーソルと一定の距離がある時に画像の描画
    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const renderNextImage = () => {
    // imagesの範囲内で描画
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const rotation = Math.random() * rotationRange;

    const el = document.querySelector(selector);
    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();


    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 20, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((fileName, index) => (
        <img
          key={index}
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={"./images/" + fileName}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export const MouseImage = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={30}
      rotationRange={25}
      images={[
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
        "7.jpg",
        "8.jpg",
        "9.jpg",
        "10.jpg",
        "11.jpg",
        "12.jpg",
        "13.jpg",
        "14.jpg",
        "15.jpg",
        "16.jpg",
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-white">
        <p className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
          <TouchAppIcon />
          <span>Hover me</span>
        </p>
      </section>
    </MouseImageTrail>
  );
};