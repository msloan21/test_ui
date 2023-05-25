import React, { useEffect, useState } from 'react';
import {
	Button,
	Fieldset,
	Grid,
	Label,
	TextInput,
	Form,
} from '@trussworks/react-uswds';
import { fetchWithAuthJson } from '../../utils/utils';
import { hasAnalyst, hasManager } from '../../helpers/Permissions/Permission';

type DemoResponse = {
	val: string;
	id: number;
};

const DemoComponent: React.FC = () => {
	const [demoValue, setDemoValue] = useState('No search performed yet.');
	const [tempDemoValue, setTempDemoValue] = useState<string>();
	const [demoId, setDemoId] = useState<number>();
	const [hasManagerRole, setHasManagerRole] = useState<boolean | undefined>(
		false
	);
	const [hasAnalystRole, setHasAnalystRole] = useState<boolean | undefined>(
		false
	);

	useEffect(() => {
		const setRoles = async () => {
			setHasManagerRole(await hasManager());
			setHasAnalystRole(await hasAnalyst());
		};
		setRoles();
	}, []);

	const retrieveDemo = async () => {
		return fetchWithAuthJson(`demo/${demoId}`)
			.then((json) => {
				setDemoValue((json as DemoResponse).val);
			})
			.catch((e) => {
				console.error(e);
				setDemoValue('');
			});
	};

	const createDemo = async () => {
		return fetchWithAuthJson(`demo`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({ val: tempDemoValue }),
		})
			.then((json) => {
				setTempDemoValue('');
				setDemoId((json as DemoResponse).id);
				setDemoValue((json as DemoResponse).val);
			})
			.catch((e) => {
				console.error(e);
				setDemoId(1);
				setDemoValue('');
			});
	};

	return (
		<Grid
			col={true}
			className='grid-col-12 tablet:grid-col-8 desktop:grid-col-6'
		>
			{hasManagerRole && (
				<section
					className='bg-white
            padding-y-3 padding-x-5
            border border-base-lighter'
				>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							createDemo();
						}}
					>
						<Fieldset legend='Create a Demo entity' legendStyle='large'>
							<Label htmlFor='demo-create-form-demo-value'>Entity value</Label>
							<TextInput
								id='demo-create-form-demo-value'
								name='tempDemoValue'
								type='text'
								value={tempDemoValue}
								onChange={(e) => setTempDemoValue(e.target.value)}
							/>
							<Button id='create-value' type='submit' disabled={!tempDemoValue}>
								Create
							</Button>
						</Fieldset>
					</Form>
				</section>
			)}
			{hasAnalystRole && (
				<section
					className='bg-white
            padding-y-3 padding-x-5
            border border-base-lighter'
				>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							retrieveDemo();
						}}
					>
						<Fieldset legend='Retrieve a Demo entity' legendStyle='large'>
							<Label htmlFor='demo-retrieve-form-demo-id'>Entity id</Label>
							<TextInput
								id='demo-retrieve-form-demo-id'
								name='demoId'
								type='number'
								value={demoId}
								onChange={(e) => setDemoId(Number.parseInt(e.target.value))}
							/>
							<Button type='submit' disabled={!demoId}>
								Retrieve
							</Button>
						</Fieldset>
					</Form>
					<p>
						Demo value:{' '}
						<strong>
							{demoValue !== '' ? demoValue : 'No demo value found.'}
						</strong>
					</p>
				</section>
			)}
		</Grid>
	);
};

export default DemoComponent;
