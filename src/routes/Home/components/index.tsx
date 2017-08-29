import * as React from 'react';
import { Card } from 'semantic-ui-react';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
	title: string;
}

const Home: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const { title } = props;
	const fields: any[] = [
		{ type: 'text', label: 'Field 1', name: 'field1'},  
		{ id: 'field2', type: 'text', label: 'Field 2', name: 'field2'},  
		{ id: 'field3', type: 'text', label: 'Field 3', name: 'field3'},  
		{ id: 'field4', type: 'text', label: 'Field 4', name: 'field4'},
	];
	
	const extra = (
		<div>
			<h3>{title}</h3>
			<p>
				{ JSON.stringify(fields) } 
			</p>
		</div>
	);

	return (
		<div id="home">
			<Card
				image="http://semantic-ui.com/images/avatar/large/elliot.jpg"
				header="Welcome"
				meta="Friend"
				description="This is the home page."
				extra={extra}
			/>
		</div>
	);

};

Home.defaultProps = {title: 'Home Page Victor'};

export default Home;
