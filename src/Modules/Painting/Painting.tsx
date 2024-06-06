import React, { useState } from 'react';
import { Button, Info } from '@Components';
import { Canvas, TSize } from '@Modules';
import { sl } from '@Utils';

const c = sl(() => require('./Painting.less'));

export const Painting: React.FC = () => {
    const [ size, setSize ] = useState<TSize>('big');
    const [ isSquare, setIsSquare ] = useState<boolean>(false);
    const [ lines, setLines ] = useState<number[][]>([]);

    const sizeChange = (s: TSize) => () => setSize(s);

    return (
        <div className={c('container')}>
            <div className={c('button-wrapper')}>
                <Button onClick={sizeChange('small')} isActive={size === 'small'}>Small</Button>
                <Button onClick={sizeChange('medium')} isActive={size === 'medium'}>Medium</Button>
                <Button onClick={sizeChange('big')} isActive={size === 'big'}>Big</Button>

                <Button onClick={() => setIsSquare(!isSquare)} isActive={isSquare}>Square</Button>
            </div>

            <Canvas size={size} onLinesUpdated={(newLines) => setLines(newLines)} isSquare={isSquare} />

            <Info data={lines} />
        </div>
    );
}