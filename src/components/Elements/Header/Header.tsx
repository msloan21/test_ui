import React from 'react';
import {
	Banner,
	BannerButton,
	BannerContent,
	BannerFlag,
	BannerGuidance,
	BannerHeader,
	BannerIcon,
	BannerLockImage,
	MediaBlockBody,
	Header as TrussworksHeader,
} from '@trussworks/react-uswds';
import flagImg from '../../../images/us_flag_small.png';
import dotGovIcon from '../../../images/icon-dot-gov.svg';
import httpsIcon from '../../../images/icon-https.svg';
import '@trussworks/react-uswds/lib/index.css';
import LogoutButton from './LogoutButton/LogoutButton';

export type HeaderProps = {
	isOpen: boolean;
	setBannerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	displayLogout: boolean;
};

const Header: React.FC<HeaderProps> = ({
	isOpen,
	setBannerOpen,
	displayLogout,
}) => {
	const lock = <BannerLockImage title='Lock' description='A locked padlock' />;

	return (
		<>
			<Banner>
				<BannerHeader
					isOpen={isOpen}
					flagImg={<BannerFlag src={flagImg} alt='U.S. flag' />}
					headerText='An official website of the United States government'
					headerActionText="Here's how you know"
				>
					<BannerButton
						isOpen={isOpen}
						aria-controls='custom-banner'
						onClick={(): void => {
							setBannerOpen(!isOpen);
						}}
					>
						Here&apos;s how you know
					</BannerButton>
					<BannerContent id='custom-banner' isOpen={isOpen}>
						<div className='grid-row grid-gap-lg'>
							<BannerGuidance className='tablet:grid-col-6'>
								<BannerIcon src={dotGovIcon} alt='' />
								<MediaBlockBody>
									<p>
										<strong>Official websites use .gov</strong>
										<br />A <strong>.gov</strong> website belongs to an official
										government organization in the United States.
									</p>
								</MediaBlockBody>
							</BannerGuidance>
							<BannerGuidance className='tablet:grid-col-6'>
								<BannerIcon src={httpsIcon} alt='' />
								<MediaBlockBody>
									<p>
										<strong>Secure .gov websites use HTTPS</strong>
										<br />A <strong>lock ( {lock} )</strong> or{' '}
										<strong>https://</strong> means you&apos;ve safely connected
										to the .gov website. Share sensitive information only on
										official, secure websites.
									</p>
								</MediaBlockBody>
							</BannerGuidance>
						</div>
					</BannerContent>
				</BannerHeader>
			</Banner>
			<div className='usa-overlay'></div>
			<TrussworksHeader basic={true}>
				<div className='usa-nav-container'>
					<div className='usa-navbar'>
						<div className='usa-logo' id='-logo'>
							<em className='usa-logo__text'>
								<a href='/' title='<Project title>'>
									&lt;Project title&gt;
								</a>
							</em>
						</div>
					</div>
					{displayLogout && (
						<div className='margin-left-auto margin-bottom-2 '>
							<LogoutButton />
						</div>
					)}
				</div>
			</TrussworksHeader>
		</>
	);
};

export default Header;
