import * as React from 'react';
import { Link } from 'react-router';
import { Table, Dropdown, Input, Loader } from 'semantic-ui-react';
import ContentPane from 'layouts/App/ContentPane';
import Province from '../models/Province';
import '../index.scss';

interface Props {
    models: Array<Province>;
    onSelected: Function;
    onCountrySelected: any;
    selected?: Province;
    filters?: Array<string | JSX.Element>;
    isLoading: boolean;
}

const ProvinceList: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const {
        models,
        onSelected,
        onCountrySelected,
        selected = new Province(),
        filters, 
        isLoading,
    } = props;

    const filterOptions = [
        {
            text: 'Canada',
            value: 'CA',
            label: { color: 'red', empty: true, circular: true },
        },
        {
            text: 'United States',
            value: 'US',
            label: { color: 'blue', empty: true, circular: true },
        },
    ];

    const FilterDropdown = () => (
            <Dropdown text="Filter" multiple icon="filter" onChange={ onCountrySelected }>
                <Dropdown.Menu>
                    <Input icon="search" iconPosition="left" className="search" />
                    <Dropdown.Divider />
                    <Dropdown.Header icon="tags" content="Tag Label" />
                    <Dropdown.Menu scrolling>
                        { filterOptions.map((option) => <Dropdown.Item key={option.value} {...option} />) }
                    </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
        );

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
