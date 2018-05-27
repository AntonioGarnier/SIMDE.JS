import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import { store } from './Store';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker'
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SIMDETheme from './Styles/SIMDETheme'
import i18n from './Language/i18n';
import Panel from './ControlPanel/';
import './Styles/index.css'
/*
 * Here is where the react endpoint appears
 *
 */
ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme(SIMDETheme)}>
                <HashRouter>
                    <Panel />
                </HashRouter>
            </MuiThemeProvider>
        </Provider>
    </I18nextProvider>, document.getElementById('app')
);
registerServiceWorker()
