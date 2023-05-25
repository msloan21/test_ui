import React, { useState } from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import LoginForm from '../../components/LoginForm/LoginForm';
import '@trussworks/react-uswds/lib/index.css';
import PageWithHeaderFooter from '../../components/Elements/PageWithHeaderFooter/PageWithHeaderFooter';

const LoginPage: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<PageWithHeaderFooter displayLogout={false}>
			<main id='main-content'>
				<div className='bg-base-lightest'>
					<GridContainer className='grid-container usa-section'>
						<Grid row className='grid-row flex-justify-center'>
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
									<h1 className='margin-bottom-0'>Sign in</h1>
									<LoginForm
										showPassword={showPassword}
										setShowPassword={setShowPassword}
									/>
								</div>
							</Grid>
						</Grid>
					</GridContainer>
				</div>
			</main>
		</PageWithHeaderFooter>
	);
};

export default LoginPage;
