import React from 'react';

import {StateProvider} from './context';
import Main from './Main';

import './styles/red-hat-display.scss';
import './styles/responsive.scss';
import './styles/theme.scss';

const App = () => {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    );
};

export default App;
