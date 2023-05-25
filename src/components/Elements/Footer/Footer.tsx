import React from 'react';
import {
	Button,
	Logo,
	Address,
	FooterNav,
	Footer as TrussworksFooter,
	SocialLinks,
	Identifier,
	IdentifierMasthead,
	IdentifierLogos,
	IdentifierLinks,
	IdentifierLogo,
	IdentifierGov,
	IdentifierIdentity,
	Link,
	SocialLink,
	IdentifierLink,
	IdentifierLinkItem,
} from '@trussworks/react-uswds';
import '@trussworks/react-uswds/lib/index.css';

import logoImg from '../../../images/logo-img.png';
import dotGovIcon from '../../../images/icon-dot-gov.svg';

const returnToTop = (
	<div className='grid-container usa-footer__return-to-top'>
		<Button
			type='button'
			unstyled
			onClick={() => {
				window.scrollTo(0, 0);
			}}
		>
			Return to top
		</Button>
	</div>
);

const socialLinkItems = [
	<SocialLink key='facebook' name='Facebook' href='/fake' />,
	<SocialLink key='twitter' name='Twitter' href='/fake' />,
	<SocialLink key='youtube' name='YouTube' href='/fake' />,
	<SocialLink key='instagram' name='Instagram' href='/fake' />,
	<SocialLink key='rss' name='RSS' href='/fake' />,
];

const testLinks = (
	<>
		<IdentifierLinkItem key='one'>
			<IdentifierLink href='/fake'>
				About &lt;Parent shortname&gt;
			</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='two'>
			<IdentifierLink href='/fake'>Accessibility support</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='three'>
			<IdentifierLink href='/fake'>FOIA requests</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='four'>
			<IdentifierLink href='/fake'>No FEAR Act data</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='five'>
			<IdentifierLink href='/fake'>
				Office of the Inspector General
			</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='six'>
			<IdentifierLink href='/fake'>Performance reports</IdentifierLink>
		</IdentifierLinkItem>
		<IdentifierLinkItem key='seven'>
			<IdentifierLink href='/fake'>Privacy policy</IdentifierLink>
		</IdentifierLinkItem>
	</>
);

const testIdentifierLogo = (
	<img
		src={dotGovIcon}
		className='usa-identifier__logo-img'
		alt='Test Agency Name logo'
	/>
);

const testIdentifierGovContent = (
	<>
		<div className='usa-identifier__usagov-description'>
			Looking for U.S. government information and services?
		</div>
		&nbsp;
		<Link href='https://www.usa.gov/' className='usa-link'>
			Visit USA.gov
		</Link>
	</>
);

const Footer: React.FC = () => {
	return (
		<>
			<TrussworksFooter
				size='medium'
				returnToTop={returnToTop}
				primary={
					<FooterNav
						size='medium'
						links={Array(4).fill(
							<Link className='usa-footer__primary-link' href='/fake'>
								Primary Link
							</Link>
						)}
					/>
				}
				secondary={
					<div className='grid-row grid-gap'>
						<Logo
							size='medium'
							image={
								<img
									className='usa-footer__logo-img'
									alt='img alt text'
									src={logoImg}
								/>
							}
							heading={
								<p className='usa-footer__logo-heading'>Name of Agency</p>
							}
						/>
						<div className='usa-footer__contact-links mobile-lg:grid-col-6'>
							<SocialLinks links={socialLinkItems} />
							<p className='usa-footer__contact-heading'>
								Agency Contact Center
							</p>
							<Address
								size='medium'
								items={[
									<Link key='telephone' href='tel:1-800-555-5555'>
										(800) CALL-GOVT
									</Link>,
									<Link key='email' href='mailto:info@agency.gov'>
										info@agency.gov
									</Link>,
								]}
							/>
						</div>
					</div>
				}
			/>
			<Identifier>
				<IdentifierMasthead aria-label='Agency identifier'>
					<IdentifierLogos>
						<IdentifierLogo href='/fake'>{testIdentifierLogo}</IdentifierLogo>
					</IdentifierLogos>
					<IdentifierIdentity domain='domain.edu.mil.gov'>
						{`An official website of the `}
						<Link href='/fake'>Test Agency Name</Link>
					</IdentifierIdentity>
				</IdentifierMasthead>
				<IdentifierLinks navProps={{ 'aria-label': 'Important links' }}>
					{testLinks}
				</IdentifierLinks>
				<IdentifierGov aria-label='U.S. government information and services'>
					{testIdentifierGovContent}
				</IdentifierGov>
			</Identifier>
		</>
	);
};

export default Footer;
