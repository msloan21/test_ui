import React from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@trussworks/react-uswds';

const LogoutButton: React.FC = () => {
	const navigate = useNavigate();

	const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		await Auth.signOut();
		navigate(0);
	};

	return (
		<Button type='button' onClick={handleLogout} data-testid='logout button'>
			Log out
		</Button>
	);
};

export default LogoutButton;
