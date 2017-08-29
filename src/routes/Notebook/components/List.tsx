import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router';
import { Table, Dropdown, Loader } from 'semantic-ui-react';
import ContentPane from 'components/ContentPane';
import Notebook from '../models/Notebook';
import '../index.scss';

interface Props {
	models: Array<Notebook>;
	onSelected: Function;
	selected?: Notebook;
	filters?: Array<string | JSX.Element>;
	isLoading: boolean;
	filter: string;
}

const NotebookList: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
	const {
		models,
		onSelected,
		selected = new Notebook(),
		filters, 
		isLoading,
		filter,
	} = props;

	const filterOptions = [
		{ key: 'starred', value: '1', text: 'Starred' },
	];

	const FilterDropdown = () => (
			<Dropdown 
				placeholder="Filter" 
				onChange={() => {}}
				value={filter}
				search selection options={filterOptions} />);

	return (
		<ContentPane toolbar={<FilterDropdown/>}>
			{ isLoading
				? <Loader active inline />
				: <Table striped celled selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Title</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Created</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{ models.map((model, i) => (
							<Table.Row key={ model.id } onClick={ onSelected.bind(null, model) } active={selected.id === model.id}>
								<Table.Cell>{ model.title }</Table.Cell>
								<Table.Cell>{ model.description }</Table.Cell>
								<Table.Cell>{ moment(model.created).format() }</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table> 
			}
		</ContentPane>
	);
};

export default NotebookList;
