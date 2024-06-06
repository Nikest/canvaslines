import React from 'react';
import { sl } from '@Utils';

const c = sl(() => require('./Info.less'));

interface IButtonProps {
    data: number[][];
}

export const Info: React.FC<IButtonProps> = ({ data }) => {
    return (
        <div className={c('container')}>
            {
                data.map((line, i) => (
                    <p key={i} className={c('line')}>
                        Line {i + 1}: [{line.join(', ')}]
                    </p>
                ))
            }
        </div>
    );
}