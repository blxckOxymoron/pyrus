import {
  type DOMAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type MouseEvent,
  CanvasHTMLAttributes,
  DetailedHTMLProps,
} from "react";

const defaultPressure = 0.4;

type CanvasPointerEvent =
  | TouchEvent<HTMLCanvasElement>
  | MouseEvent<HTMLCanvasElement>;

function calculateLineWidth(pressure: number, maxWidth: number) {
  return Math.log(pressure + 1) * maxWidth;
}

type Point = {
  x: number;
  y: number;
  pressure: number;
  lineWidth: number;
  time: number;
};

function calculatePressure(
  points: [Pick<Point, "x" | "y" | "time">, Pick<Point, "x" | "y" | "time">],
) {
  const [previousPoint, point] = points;

  const distance = Math.hypot(
    point.x - previousPoint.x,
    point.y - previousPoint.y,
  );

  const speed = distance / (point.time - previousPoint.time);

  const pressure = Math.min(0.9, 0.7 * Math.exp(-speed) + 0.3);

  return pressure; // 0 -> 2
}

export default function useDrawableCanvas({
  width,
  height,
  onCompleted,
  timeout = 500,
  resolutionMultiplier = 2,
  strokeStyle = "#fff",
  strokeWidth = 40,
}: {
  width: number;
  height: number;
  onCompleted: ({ lines, data }: { lines: Point[][]; data: string }) => void;
  timeout?: number;
  resolutionMultiplier?: number;
  strokeStyle?: string;
  strokeWidth?: number;
}): {
  bindings: DetailedHTMLProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  >;
  clear: () => void;
} {
  // with help of https://github.com/shuding/apple-pencil-safari-api-test/blob/gh-pages/index.js

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSomething, setHasDrawnSomething] = useState(false);

  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Point[][]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const saveImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    const data = canvas.toDataURL("image/png");
    onCompleted({ lines, data });
    setHasDrawnSomething(false);

    //* reset canvas must be handled in on completed with clear()
  }, [ctx, lines, onCompleted]);

  // save image on end of drawing
  useEffect(() => {
    if (!hasDrawnSomething || isDrawing) return;

    const timeoutRef = setTimeout(saveImage, timeout);
    return () => clearTimeout(timeoutRef);
  }, [hasDrawnSomething, isDrawing, saveImage, timeout]);

  const registerTouch = (e: CanvasPointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return; // canvas not mounted

    let pressure: number | null = null;
    let x = 0,
      y = 0;

    const preveousPoint = points.at(-1);

    if (
      "touches" in e &&
      e.touches[0] &&
      "force" in e.touches[0] &&
      typeof e.touches[0]["force"] === "number"
    ) {
      if (e.touches[0]["force"] > 0) {
        pressure = e.touches[0]["force"] * 2 + 0.2;
      }
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if ("clientX" in e) {
      x = e.clientX;
      y = e.clientY;
    }

    x -= rect.left;
    y -= rect.top;

    x *= resolutionMultiplier;
    y *= resolutionMultiplier;

    const time = Date.now();

    if (!pressure) {
      pressure = preveousPoint
        ? calculatePressure([preveousPoint, { x, y, time }])
        : defaultPressure;
    }

    let lineWidth = calculateLineWidth(
      pressure,
      strokeWidth * resolutionMultiplier,
    );
    if (preveousPoint) {
      lineWidth = lineWidth * 0.3 + preveousPoint.lineWidth * 0.7;
    }

    const point = { x, y, pressure, lineWidth, time };

    drawOnCanvas(point);
  };

  function drawOnCanvas(point: Point) {
    if (!ctx) return;

    const preveousPoint = points.at(-1);

    if (!preveousPoint) {
      ctx.lineWidth = point.lineWidth;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.arc(point.x, point.y, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      const xc = (point.x + preveousPoint.x) / 2;
      const yc = (point.y + preveousPoint.y) / 2;
      ctx.lineWidth = preveousPoint.lineWidth;
      ctx.quadraticCurveTo(preveousPoint.x, preveousPoint.y, xc, yc);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xc, yc);
    }

    setHasDrawnSomething(true);
    setPoints((points) => [...points, point]);
  }

  const onStart = (e: CanvasPointerEvent) => {
    e.preventDefault();
    setIsDrawing(true);

    registerTouch(e);
  };

  const onEnd = (e: CanvasPointerEvent) => {
    e.preventDefault();
    setIsDrawing(false);
    if (points.length) setLines((lines) => [...lines, points]);
    setPoints([]);
  };

  const onMove = (e: CanvasPointerEvent) => {
    if (!isDrawing) return;
    e.preventDefault();

    registerTouch(e);
  };

  const listeners: DOMAttributes<HTMLCanvasElement> = {
    onTouchStart: onStart,
    onTouchMove: onMove,
    onTouchEnd: onEnd,
    onTouchCancel: onEnd,

    onMouseDown: onStart,
    onMouseMove: onMove,
    onMouseUp: onEnd,
    onMouseLeave: onEnd,
  };

  // canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width * resolutionMultiplier;
    canvas.height = height * resolutionMultiplier;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setCtx(ctx);

    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [canvasRef, height, resolutionMultiplier, strokeStyle, width]);

  return {
    bindings: {
      ...listeners,
      ref: canvasRef,
      style: {
        width,
        height,
        touchAction: "none",
      },
    },
    clear: useCallback(() => {
      ctx?.clearRect(
        0,
        0,
        width * resolutionMultiplier,
        height * resolutionMultiplier,
      );
      setLines([]);
      setHasDrawnSomething(false);
    }, [ctx, height, resolutionMultiplier, width]),
  };
}
