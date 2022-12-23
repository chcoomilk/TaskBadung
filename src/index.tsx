/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './pages/Main';

render(() => <App />, document.getElementById('root') as HTMLElement);
