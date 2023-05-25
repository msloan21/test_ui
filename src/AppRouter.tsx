import React, { useEffect, useState } from 'react';
import './index.css';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';
import ErrorPage from './routes/ErrorPage/ErrorPage';
import LoginForm from './routes/LoginPage/LoginPage';
import HomePage from './routes/HomePage/HomePage';
import { Auth } from 'aws-amplify';
import ApplicationPage from './routes/ApplicationPage/ApplicationPage';
import ListApplicationsPage from './routes/ListApplicationsPage/ListApplicationsPage';

const AppRouter: React.FC = () => {
	const [token, setToken] = useState<string>();
	const [expiration, setExpiration] = useState<number>();
	const [loadingSession, setLoadingSession] = useState(true);

	const checkValidToken = () => {
		return token && expiration && new Date(expiration * 1000) >= new Date();
	};

	useEffect(() => {
		const getToken = async () => {
			try {
				const session = await Auth.currentSession();
				const token = session.getAccessToken().getJwtToken();
				const expir = session.getAccessToken().getExpiration();
				setToken(token);
				setExpiration(expir);
				setLoadingSession(false);
			} catch (e) {
				console.error(e);
				setLoadingSession(false);
			}
		};

		getToken();
	});

	if (!loadingSession) {
		const router = createBrowserRouter([
			{
				path: '/',
				element: (
					<>
						{!checkValidToken() ? (
							<LoginForm />
						) : (
							<Navigate to='/listApplications' replace={false} />
						)}
					</>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: '/listApplications',
				element: (
					<>
						{checkValidToken() ? (
							<ListApplicationsPage />
						) : (
							<Navigate to='/' replace={false} />
						)}
					</>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: '/submitApplication',
				element: (
					<>
						{checkValidToken() ? (
							<ApplicationPage />
						) : (
							<Navigate to='/' replace={false} />
						)}
					</>
				),
				errorElement: <ErrorPage />,
			},
			{
				path: '/home',
				element: (
					<>
						{checkValidToken() ? (
							<HomePage />
						) : (
							<Navigate to='/' replace={false} />
						)}
					</>
				),
				errorElement: <ErrorPage />,
			},
		]);

		return <RouterProvider router={router} />;
	} else {
		return <p>Loading...</p>;
	}
};

export default AppRouter;
