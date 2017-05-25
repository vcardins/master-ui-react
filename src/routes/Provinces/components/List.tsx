import * as React from 'react';
import { Link } from 'react-router';
import { Table, Dropdown, Loader } from 'semantic-ui-react';
import ContentPane from 'components/ContentPane';
import Province from '../models/Province';
import '../index.scss';

interface Props {
    models: Array<Province>;
    onSelected: Function;
    onCountrySelected: any;
    selected?: Province;
    filters?: Array<string | JSX.Element>;
    isLoading: boolean;
    filter: string;
}

const ProvinceList: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const {
        models,
        onSelected,
        onCountrySelected,
        selected = new Province(),
        filters, 
        isLoading,
        filter,
    } = props;

    const filterOptions = [
        { key: 'ca', value: 'ca', text: 'Canada', flag: 'ca' },
        { key: 'us', value: 'us', text: 'United States', flag: 'us' },
    ];

    const FilterDropdown = () => (
            <Dropdown 
                placeholder="Select Country" 
                onChange={onCountrySelected}
                value={filter}
                search selection options={filterOptions} />);

    return (
        <ContentPane toolbar={<FilterDropdown/>}>
            { isLoading
                ? <Loader active inline />
                : <Table striped celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Country</Table.HeaderCell>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { models.map((model, i) => (
                            <Table.Row key={ model.code } onClick={ onSelected.bind(null, model) } active={selected.code === model.code}>
                                <Table.Cell>{ model.iso2 }</Table.Cell>
                                <Table.Cell>{ model.code }</Table.Cell>
                                <Table.Cell>{ model.name }</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table> 
            }
        </ContentPane>
    );
};

export default ProvinceList;
