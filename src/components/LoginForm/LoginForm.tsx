import React, { useState } from 'react';
import {
	Fieldset,
	Label,
	TextInput,
	Button,
	Form,
	Alert,
} from '@trussworks/react-uswds';
import '@trussworks/react-uswds/lib/index.css';
import {
	withAuthHOC,
	WithAuthHOCProps,
} from '../hocs/AuthCredentialsHOCWrapper';

interface LoginFormProps extends WithAuthHOCProps {
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	showPassword,
	setShowPassword,
	handleLoginSubmit,
	errors,
	disabled,
}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit: React.FormEventHandler = (
		e: React.FormEvent<HTMLFormElement>
	): void => {
		e.preventDefault();
		handleLoginSubmit(username, password);
	};

	const handleToggleShowPassword: React.FormEventHandler = (
		e: React.FormEvent<HTMLFormElement>
	): void => {
		e.preventDefault();
		e.stopPropagation();
		setShowPassword(!showPassword);
	};

	return (
		<>
			<Form onSubmit={handleSubmit} large>
				<Fieldset legend='Access your account' legendStyle='large'>
					<Label htmlFor='username'>Username or email address</Label>
					<TextInput
						className='usa-input'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						id='username'
						name='username'
						type='text'
						autoCapitalize='off'
						autoCorrect='off'
						disabled={disabled}
					/>
					<Label htmlFor='password'>Password</Label>
					<TextInput
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						name='password'
						type={showPassword ? 'text' : 'password'}
						disabled={disabled}
					/>
					<p className='usa-form__note'>
						<Button
							id='password-visibility-toggle'
							name='password-visibility-toggle'
							type='button'
							title='Show password'
							className='usa-show-password usa-button usa-button--unstyled'
							aria-controls='password'
							onClick={handleToggleShowPassword}
							disabled={disabled}
						>
							{showPassword ? 'Hide password' : 'Show password'}
						</Button>
					</p>
					<Button type='submit' disabled={disabled} data-testid='submit button'>
						Sign in
					</Button>

					{errors !== '' && (
						<Alert type='error' heading='Sign-in error' headingLevel='h4'>
							{errors}
						</Alert>
					)}
				</Fieldset>
			</Form>
		</>
	);
};

export default withAuthHOC(LoginForm);
