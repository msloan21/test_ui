import React from 'react';
import { useField } from 'formik';
import { DatePickerProps as USWDSDatePickerProps } from '@trussworks/react-uswds/lib/components/forms/DatePicker/DatePicker';
import {
	DatePicker as USWDSDatePicker,
	ErrorMessage,
	FormGroup,
	Label,
} from '@trussworks/react-uswds';

interface DatePickerProps extends Omit<USWDSDatePickerProps, 'onChange'> {
	label: string;
	required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const [field, meta] = useField(props);

	const showError = !!(meta.touched && meta.error);
	return (
		<>
			<FormGroup error={showError}>
				<Label htmlFor={props.id} error={showError}>
					{props.label} {props.required && <span className='text-red'>*</span>}
				</Label>
				{showError && <ErrorMessage>{meta.error}</ErrorMessage>}
				<USWDSDatePicker
					aria-describedby={`${props.id}-date-hint`}
					aria-labelledby={`${props.id}-date-label`}
					{...field}
					{...props}
					onChange={(val) => {
						field.onChange({
							target: {
								id: props.id,
								value: val,
							},
						});
					}}
				/>
			</FormGroup>
			<div className='usa-hint' id={`${props.id}-hint`}>
				mm/dd/yyyy
			</div>
		</>
	);
};

export default DatePicker;
