import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import DemoComponent from '../../components/demo/DemoComponent';
import PageWithHeaderFooter from '../../components/Elements/PageWithHeaderFooter/PageWithHeaderFooter';

const HomePage: React.FC = () => {
	return (
		<PageWithHeaderFooter displayLogout={false}>
			<main id='main-content'>
				<div className='bg-base-lightest'>
					<GridContainer className='grid-container usa-section'>
						<Grid row className='grid-row flex-justify-center'>
							<DemoComponent />
						</Grid>
					</GridContainer>
				</div>
			</main>
		</PageWithHeaderFooter>
	);
};

export default HomePage;
