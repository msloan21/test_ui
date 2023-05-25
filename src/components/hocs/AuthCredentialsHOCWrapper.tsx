import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

type CognitoException = {
	code: string;
	name: string;
};

const determineTypeCognitoException = (
	obj: CognitoException
): obj is CognitoException => {
	return obj.name !== undefined && obj.code !== undefined;
};

type loginHandler = (username: string, password: string) => void;

export interface WithAuthHOCProps {
	handleLoginSubmit: loginHandler;
	errors: string;
	disabled: boolean;
}

export const withAuthHOC = <T extends WithAuthHOCProps>(
	Wrapped: React.ComponentType<T>
) => {
	const AuthWrapper = (props: Omit<T, keyof WithAuthHOCProps>) => {
		const navigate = useNavigate();

		const [authInProgress, setAuthInProgress] = useState(false);
		const [errors, setErrors] = useState('');

		const handler: loginHandler = async (username, password) => {
			setAuthInProgress(true);
			try {
				await Auth.signIn(username, password);
				await Auth.currentSession();

				setErrors('');
				setAuthInProgress(false);
				navigate(0);
			} catch (error) {
				if (
					determineTypeCognitoException(error as CognitoException) &&
					((error as CognitoException).code === 'UserNotFoundException' ||
						(error as CognitoException).code === 'NotAuthorizedException')
				) {
					console.error('authorization error during sign in', error);
					setErrors('Your attempt to sign in has failed.');
				} else {
					console.error('system error during sign in', error);
					setErrors('An error has occurred during sign-in.');
				}
				setAuthInProgress(false);
			}
		};

		return (
			<Wrapped
				{...(props as T)}
				handleLoginSubmit={handler}
				errors={errors}
				disabled={authInProgress}
			/>
		);
	};

	AuthWrapper.displayName = 'AuthWrapper';

	return AuthWrapper;
};

export default withAuthHOC;
