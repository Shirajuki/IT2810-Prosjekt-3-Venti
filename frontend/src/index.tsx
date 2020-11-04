import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RootStore from "./stores/root-store";

ReactDOM.render(
	<RootStore>
		<App />
	</RootStore>,

	document.getElementById('root')
);

serviceWorker.unregister();
