import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import '@trussworks/react-uswds/lib/index.css';
import { initAmplify } from './utils/auth';

initAmplify();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>
);
