import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Loading from './components/Loading';

import '../assets/css/bootstrap.css';
import '../assets/css/global.css';

const App = lazy(() => import(/* webpackChunkName: "app"*/ './containers/App'));

ReactDOM.render(
	<Suspense fallback={<Loading spinning={true} title="Loading Route" />}>
		<App />
	</Suspense>,
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
