import * as React from 'react';
import { Image } from 'semantic-ui-react';
import './index.scss';

interface Props {
	height?: number;  
	imageUrl: string;
	alt?: string;
	onClick?: Function;	
}

const Logo: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { imageUrl, onClick, alt, height = 35 } = props;

	return (
		<div className="logo">
			<Image src={imageUrl} centered height={height} onClick={onClick} alt={alt} />
		</div>
	);
};

export default Logo;
