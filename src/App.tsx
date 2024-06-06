import React from 'react';

import './global.less';

import { Wrapper, Painting } from '@Modules';

export const App: React.FC = () => {
    return (
        <Wrapper>
            <Painting />
        </Wrapper>
    );
};