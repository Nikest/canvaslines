import React from 'react';
import { sl } from '@Utils';

const c = sl(() => require('./Button.less'));

interface IButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({ children, onClick, isActive = false }) => {
    return (
        <button className={c('button')} onClick={onClick} data-active={isActive}>
            <span className={c('decor')}>{children}</span>
        </button>
    );
}