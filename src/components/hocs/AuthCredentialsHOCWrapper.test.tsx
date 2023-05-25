import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { withAuthHOC, WithAuthHOCProps } from './AuthCredentialsHOCWrapper';
const awsAmplify = require('aws-amplify');

jest.mock('../../utils/utils', () => {
	return {
		getWindowAccountsPublicGlobals: jest.fn().mockReturnValue({
			domain: 'localhost',
			cognito: {
				region: 'region',
				userPoolId: 'userPoolId',
				userPoolWebClientId: 'clientId',
			},
		}),
	};
});

jest.mock('react-router-dom', () => {
	const mockNavigate = jest.fn();
	return {
		useNavigate: () => mockNavigate,
		__mockNavigate: mockNavigate,
	};
});

describe('Auth Credentials component', () => {
	interface MockProps extends WithAuthHOCProps {
		testText: string;
	}

	let mockComponent: React.FC<MockProps>;

	beforeEach(() => {
		awsAmplify.__initMockDefaultValues();
		awsAmplify.__setToken('jwt-auth-creds-test');
		awsAmplify.__setRefreshToken('refresh-auth-creds-test');
		awsAmplify.__setLoginToSucceed();
		console.error = jest.fn();

		mockComponent = ({ testText, handleLoginSubmit, errors, disabled }) => (
			<div>
				<span>{testText}</span>
				<span>{errors}</span>
				<input type='text' disabled={disabled} />
				<button onClick={() => handleLoginSubmit('apple', 'banana')} />
			</div>
		);
	});

	afterAll(() => {
		awsAmplify.__setLoginToSucceed();
	});

	it('renders the wrapped component', () => {
		const Wrapped = withAuthHOC(mockComponent);
		render(<Wrapped testText={'test'} />);
		expect(screen.getByText('test')).toBeInTheDocument();
	});

	it('handles submit login success', async () => {
		const Wrapped = withAuthHOC(mockComponent);
		render(<Wrapped testText={'test'} />);
		await act(() => {
			screen.getByRole('button').click();
		});
		await waitFor(() => {
			expect(require('react-router-dom').__mockNavigate).toBeCalled();
		});
	});

	it('handles submit login incorrect credentials', async () => {
		awsAmplify.__setLoginToFailPassword();
		const Wrapped = withAuthHOC(mockComponent);
		render(<Wrapped testText={'test'} />);
		screen.getByRole('button').click();

		await waitFor(() => {
			expect(
				screen.getByText('Your attempt to sign in has failed.')
			).toBeInTheDocument();
		});
	});

	it('handles submit login system error', async () => {
		awsAmplify.__setLoginToFailWError();
		const Wrapped = withAuthHOC(mockComponent);
		render(<Wrapped testText={'test'} />);
		screen.getByRole('button').click();

		await waitFor(() => {
			expect(
				screen.getByText('An error has occurred during sign-in.')
			).toBeInTheDocument();
		});
	});
});
