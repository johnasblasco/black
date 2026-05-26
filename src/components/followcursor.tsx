import { useEffect } from 'react';

interface FollowCursorProps {
  color?: string;
  zIndex?: number;
}

const FollowCursor: React.FC<FollowCursorProps> = ({
  color = '#323232a6',
  zIndex = 9999,
}) => {
  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const cursor = { x: width / 2, y: height / 2 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    class Dot {
      position: { x: number; y: number };
      width: number;
      lag: number;

      constructor(x: number, y: number, width: number, lag: number) {
        this.position = { x, y };
        this.width = width;
        this.lag = lag;
      }

      moveTowards(x: number, y: number, ctx: CanvasRenderingContext2D) {
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    const dot = new Dot(width / 2, height / 2, 10, 10);

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const updateDot = () => {
      if (context) {
        context.clearRect(0, 0, width, height);

        // Hide global follow cursor when hovering over the video container
        const el = document.elementFromPoint(cursor.x, cursor.y);
        if (el && (el.closest('.video-container-cursor-none') || el.classList.contains('video-container-cursor-none'))) {
          return;
        }

        dot.moveTowards(cursor.x, cursor.y, context);
      }
    };

    const loop = () => {
      updateDot();
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches) return;
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.width = width;
      canvas.height = height;
      canvas.style.zIndex = zIndex ? zIndex.toString() : '';
      document.body.appendChild(canvas);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      loop();
    };

    const destroy = () => {
      if (canvas) canvas.remove();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };

    init();
    return () => destroy();
  }, [color, zIndex]);

  return null;
};

export default FollowCursor;
