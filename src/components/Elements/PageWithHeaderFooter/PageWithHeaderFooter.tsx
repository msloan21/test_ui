import * as React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type PageWithHeaderFooterProps = {
	children?: React.ReactNode;
	displayLogout: boolean;
};

const PageWithHeaderFooter = ({
	children,
	displayLogout,
}: PageWithHeaderFooterProps) => {
	const [isOpen, setBannerOpen] = React.useState(false);

	return (
		<div>
			<Header
				isOpen={isOpen}
				setBannerOpen={setBannerOpen}
				displayLogout={displayLogout}
			/>
			{children}
			<Footer />
		</div>
	);
};

export default PageWithHeaderFooter;
