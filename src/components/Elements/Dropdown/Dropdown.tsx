import React from 'react';
import { useField } from 'formik';
import {
	Dropdown as USWDSDropdown,
	Label,
	ErrorMessage,
	FormGroup,
} from '@trussworks/react-uswds';
declare type DropdownProps = {
	id: string;
	name: string;
	className?: string;
	inputRef?:
		| string
		| ((instance: HTMLSelectElement | null) => void)
		| React.RefObject<HTMLSelectElement>
		| null
		| undefined;
};
type Option = {
	label: string;
	value: string;
};
interface DropdownPropsExtended extends DropdownProps {
	label: string;
	required?: boolean;
	options: Option[];
}
const Dropdown: React.FC<DropdownPropsExtended> = (props) => {
	const [field, meta] = useField(props);
	const showError = !!(meta.touched && meta.error);
	const options = [{ label: '-select-', value: '' }, ...props.options];
	return (
		<FormGroup error={showError}>
			<Label htmlFor={props.id} error={showError}>
				{props.label} {props.required && <span className='text-red'>*</span>}
			</Label>
			{showError && <ErrorMessage>{meta.error}</ErrorMessage>}
			<USWDSDropdown {...field} {...props}>
				{options &&
					options.map((option, ind) => (
						<option key={`${option.value}-${ind}`} value={option.value}>
							{option.label}
						</option>
					))}
			</USWDSDropdown>
		</FormGroup>
	);
};
export default Dropdown;
