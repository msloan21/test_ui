import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import PageWithHeaderFooter from '../../components/Elements/PageWithHeaderFooter/PageWithHeaderFooter';
import ListApplications from '../../components/ListApplications/ListApplications';

const ListApplicationsPage: React.FC = () => {
	return (
		<PageWithHeaderFooter displayLogout={false}>
			<main id='main-content'>
				<div className='bg-base-lightest'>
					<GridContainer className='grid-container usa-section'>
						<Grid col={true}>
							<div
								className='
                bg-white
                padding-y-3 padding-x-5
                border border-base-lighter
                '
							>
								<ListApplications />
							</div>
						</Grid>
					</GridContainer>
				</div>
			</main>
		</PageWithHeaderFooter>
	);
};

export default ListApplicationsPage;
