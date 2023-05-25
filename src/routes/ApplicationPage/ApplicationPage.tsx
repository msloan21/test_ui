import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';
import PageWithHeaderFooter from '../../components/Elements/PageWithHeaderFooter/PageWithHeaderFooter';

const ApplicationPage: React.FC = () => {
	return (
		<PageWithHeaderFooter displayLogout={true}>
			<main id='main-content'>
				<div className='bg-base-lightest'>
					<GridContainer className='grid-container usa-section'>
						<Grid
							col={true}
							className='grid-col-12 tablet:grid-col-8 desktop:grid-col-6'
						>
							<div
								className='
                bg-white
                padding-y-3 padding-x-5
                border border-base-lighter
                '
							>
								<ApplicationForm />
							</div>
						</Grid>
					</GridContainer>
				</div>
			</main>
		</PageWithHeaderFooter>
	);
};

export default ApplicationPage;
