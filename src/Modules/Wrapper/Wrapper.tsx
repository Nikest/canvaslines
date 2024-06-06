import React from 'react';
import { sl } from '@Utils';

const c = sl(() => require('./Wrapper.less'));

interface IWrapperProps {
    children: React.ReactNode;
}

export const Wrapper: React.FC<IWrapperProps> = ({ children }) => {
    return (
        <main className={c('container')}>
            {children}
        </main>
    );
};