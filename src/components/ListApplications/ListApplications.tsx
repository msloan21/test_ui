import React, { useEffect, useState } from 'react';
import { Button, Pagination, Table } from '@trussworks/react-uswds';

const columns = ['First Name', 'Last Name', 'Date of Birth'];
const mockData = [
	{
		firstName: 'Bob',
		lastName: 'Ross',
		dob: '10/29/1942',
		email: 'Bob.Ross@painter.com',
		phoneNumber: '111-111-1111',
		originCountry: 'Canada',
		status: 'Approved',
	},
	{
		firstName: 'Steven',
		lastName: 'Rogers',
		dob: '10/29/1943',
		email: 'Steven.Rogers@captainAmerica.com',
		phoneNumber: '111-111-1112',
		originCountry: 'United States',
		status: 'Pending',
	},
	{
		firstName: 'Wanda',
		lastName: 'Maximoff',
		dob: '10/29/1944',
		email: 'Wanda.Maximoff@scarletWitch.com',
		phoneNumber: '111-111-1113',
		originCountry: 'France',
		status: 'Denied',
	},
	{
		firstName: 'Thor',
		lastName: 'Odinson',
		dob: '10/29/1945',
		email: 'Thor.Odinson@thor.com',
		phoneNumber: '111-111-1114',
		originCountry: 'Asgard',
		status: 'Denied',
	},
];

export const ListApplications = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(5);
	const [data, setData] = useState(mockData);

	useEffect(() => {
		const getApplicantList = async () => {
			// Hit backend with current page and set data
			setData(mockData);
			setTotalPages(5);
		};
		getApplicantList();
	}, [currentPage]);

	const onClickPageNumber = (
		event: React.MouseEvent<HTMLButtonElement>,
		page: number
	) => {
		setCurrentPage(page);
	};

	return (
		<div style={{ marginLeft: '10%' }}>
			<Table
				caption='List of Applications'
				striped
				scrollable
				bordered={false}
				stackedStyle='default'
			>
				<React.Fragment key='.0'>
					<thead>
						<tr>
							{columns.map((column) => {
								return (
									<th key={column} scope='col'>
										{column}
									</th>
								);
							})}
							<th scope='col'>Status</th>
							<th scope='col'>Schedule Appointment</th>
						</tr>
					</thead>
					<tbody>
						{data.map((application, index) => {
							return (
								<>
									<tr key={application.firstName}>
										<th scope='row' data-label='First Name'>
											{application.firstName}
										</th>
										<td data-label='Last Name'>{application.lastName}</td>
										<td data-label='Date of Birth'>{application.dob}</td>
										<td data-label='Status'>{application.status}</td>
										<td data-label='Application'>
											<Button
												onClick={() => {
													console.log('Navigate to page');
												}}
												type='button'
												outline
												data-testid={`open-${index}-application`}
											>
												Schedule
											</Button>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</React.Fragment>
			</Table>
			<Pagination
				style={{ alignSelf: 'center' }}
				totalPages={totalPages}
				currentPage={currentPage}
				onClickNext={() => setCurrentPage(currentPage + 1)}
				onClickPrevious={() => setCurrentPage(currentPage - 1)}
				onClickPageNumber={(event, page) => onClickPageNumber(event, page)}
				pathname={''}
			/>
		</div>
	);
};

export default ListApplications;
