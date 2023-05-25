import React from 'react';
import TextInput from './TextInput';
import { render, screen } from '@testing-library/react';

jest.mock('formik', () => {
	type MockMetaType = {
		touched?: boolean;
		error?: string;
	};

	let field = {};
	let meta: MockMetaType = {};

	const getMeta = () => meta;

	return {
		__clear: () => {
			meta = {};
			field = {};
		},
		__setMeta: (toSet: MockMetaType) => {
			meta = toSet;
		},
		__getMeta: () => meta,
		useField: () => [field, getMeta()],
	};
});

describe('TextInput', () => {
	beforeEach(() => {
		require('formik').__clear();
	});
	const defaultProps = {
		id: 'id',
		name: 'test-name',
		label: 'My text input',
	};
	it('renders', () => {
		render(<TextInput {...defaultProps} type={'text'} hint='My hint text' />);
	});

	it('displays errors', () => {
		require('formik').__setMeta({
			touched: true,
			error: 'This is my error',
		});
		render(<TextInput {...defaultProps} type={'text'} />);
		screen.getByText('This is my error');
	});
});
