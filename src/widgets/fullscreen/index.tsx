import * as React from 'react';
import * as screenfull from 'screenfull';
import { Icon } from 'semantic-ui-react';

interface Props {
	title?: string;
	iconOff?: string;
	iconOn?: string;
	className?: string;  
}

const FullScreen: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { iconOff = 'compress', iconOn = 'expand', title = 'Toggle Fullscreen', className } = props;
	let anchorRef;
	
	const getIcon = (isFullscreen: boolean = false) => {
		return <Icon name={isFullscreen ? iconOff : iconOn} aria-hidden="true" />;
	};

	const handleClick = (e: any) => {
		e.preventDefault();
		screenfull.toggle();
		// Switch icon indicator
		let icons = anchorRef.getElementsByTagName('i')[0].classList;
		if (screenfull.isFullscreen) {
			icons.remove(iconOn);
			icons.add(iconOff);
		} else {
			icons.remove(iconOff);
			icons.add(iconOn);
		}
	};
	
	if (screenfull.enabled) {
		return (
			<a href="javascript:void(0)" onClick={ handleClick } ref={ el => anchorRef = el } title={title} className={className}>
				{ getIcon() }
			</a>
		);
	}
	else {
		return getIcon();
	}
	
};

export default FullScreen;
