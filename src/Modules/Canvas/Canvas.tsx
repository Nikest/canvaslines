import React, { useRef, useEffect } from 'react';
import { sl } from '@Utils';

const c = sl(() => require('./Canvas.less'));

export type TSize = 'small' | 'medium' | 'big';

interface ICanvasProps {
    size: TSize;
    onLinesUpdated: (lines: number[][]) => void;
    isSquare?: boolean;
}

export const Canvas: React.FC<ICanvasProps> = ({ size, onLinesUpdated, isSquare = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lines = useRef<number[][]>([]);
    const canvasWidth = 1200;
    const canvasHeight = 800;
    const color = '#AF40FF';
    
    useEffect(() => {
       const canvas = canvasRef.current;
       
       if (canvas) {
           let pointCoords: number[] = [0, 0];
           let currentLineStart: number[] = [];

           const ctx = canvas.getContext('2d');

           let sizeFactor = 1;
           if (size === 'small') {
               sizeFactor = 4;
           } else if (size === 'medium') {
               sizeFactor = 2;
           } else if (size === 'big') {
               sizeFactor = 1.3333;
           }

           const handleMouseMove = (e) => {
               const rect = canvas.getBoundingClientRect();
               let x = Math.round((e.clientX - rect.left) * sizeFactor);
               let y = Math.round((e.clientY - rect.top) * sizeFactor);

               if (isSquare && currentLineStart.length === 2) {
                   const [startX, startY] = currentLineStart;
                   const dx = Math.abs(x - startX);
                   const dy = Math.abs(y - startY);

                   if (dx > dy) {
                       y = startY;
                   } else {
                       x = startX;
                   }
               }

               pointCoords = [x, y];
           }

           const handleMouseDown = (e) => {
               const rect = canvas.getBoundingClientRect();
               const x = Math.round((e.clientX - rect.left) * sizeFactor);
               const y = Math.round((e.clientY - rect.top) * sizeFactor);

               if(currentLineStart.length === 2) {
                   const allLines = [...lines.current];
                   allLines.push([...currentLineStart, ...pointCoords]);
                   lines.current = allLines;
                   currentLineStart = [];
                   onLinesUpdated(lines.current);
               } else {
                   currentLineStart = [x, y];
               }
           }

           canvas.addEventListener('mousemove', handleMouseMove);
           canvas.addEventListener('mousedown', handleMouseDown);
           
           const draw = () => {
               const pointSize = 2 * sizeFactor;
               const lineSize = 2 * sizeFactor;

               // draw point
               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.fillStyle = color;
               ctx.beginPath();
               ctx.arc(pointCoords[0], pointCoords[1], pointSize, pointSize, 4 * Math.PI);
               ctx.fill();

               // draw current line
               if (currentLineStart.length === 2) {
                   const [startX, startY] = currentLineStart;
                   const [endX, endY] = pointCoords;
                   ctx.beginPath();
                   ctx.lineWidth = lineSize;
                   ctx.strokeStyle = color;
                   ctx.moveTo(startX, startY);
                   ctx.lineTo(endX, endY);
                   ctx.stroke();
               }

                // draw lines
                lines.current.forEach(([startX, startY, endX, endY]) => {
                    ctx.beginPath();
                    ctx.lineWidth = lineSize;
                    ctx.strokeStyle = color;
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                });

               window.requestAnimationFrame(draw);
           }
           
           window.requestAnimationFrame(draw);

           return () => {
               canvas.removeEventListener('mousemove', handleMouseMove);
               canvas.removeEventListener('mousedown', handleMouseDown);
           }
       }
    
    }, [isSquare]);

    return (
        <div className={c('container')}>
            <canvas ref={canvasRef} className={c(`canvas ${size}`)} width={canvasWidth} height={canvasHeight}></canvas>
        </div>
    );
}