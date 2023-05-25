import React from 'react';
import { useField } from 'formik';
import { TextInputProps as USWDSTextInputProps } from '@trussworks/react-uswds/lib/components/forms/TextInput/TextInput';
import {
	TextInput as USWDSTextInput,
	Label,
	ErrorMessage,
	FormGroup,
} from '@trussworks/react-uswds';

interface TextInputProps extends USWDSTextInputProps {
	label: string;
	hint?: string;
	required?: boolean;
}

const TextInput: React.FC<TextInputProps> = (props) => {
	const [field, meta] = useField(props);
	const showError = !!(meta.touched && meta.error);

	return (
		<>
			<FormGroup error={showError}>
				<Label htmlFor={props.id} error={showError}>
					{props.label} {props.required && <span className='text-red'>*</span>}
				</Label>
				{showError && <ErrorMessage>{meta.error}</ErrorMessage>}
				<USWDSTextInput
					{...field}
					{...props}
					validationStatus={showError ? 'error' : undefined}
				/>
			</FormGroup>
			{props.hint && (
				<div className='usa-hint' id={`${props.id}-hint`}>
					{props.hint}
				</div>
			)}
		</>
	);
};

export default TextInput;
