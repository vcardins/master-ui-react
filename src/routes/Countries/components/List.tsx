import * as React from 'react';
import { Link } from 'react-router';
import { Table, Dropdown, Input, Loader } from 'semantic-ui-react';
import ContentPane from 'components/ContentPane';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    models: Array<any>;
    isLoading: boolean;
}

const CountriesList: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const {
        models = [],
        isLoading,
    } = props;

    const filterOptions = [
        {
            text: 'North America',
            value: 'na',
            label: { color: 'blue', empty: true, circular: true },
        },
        {
            text: 'Europe',
            value: 'eu',
            label: { color: 'pink', empty: true, circular: true },
        },
    ];

    const FilterDropdown = () => (
            <Dropdown text="Filter Country" multiple icon="filter">
                <Dropdown.Menu>
                <Input icon="search" iconPosition="left" className="search" />
                <Dropdown.Divider />
                <Dropdown.Header icon="tags" content="Tag Label" />
                <Dropdown.Menu scrolling>
                    {filterOptions.map((option) => <Dropdown.Item key={option.value} {...option} />)}
                </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
        );
        
    return (
        <ContentPane toolbar={<FilterDropdown/>}>
            { isLoading
                ? <Loader active inline />
                :  <Table striped celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Iso 2</Table.HeaderCell>
                                <Table.HeaderCell>Iso 3</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Currency</Table.HeaderCell>
                                <Table.HeaderCell>Phone Code</Table.HeaderCell>
                                <Table.HeaderCell>Longitude</Table.HeaderCell>
                                <Table.HeaderCell>Latitude</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { models.map(({iso2, iso3, name, currency, phoneCode, longitude, latitude}, i) => (
                                <Table.Row key={ iso2 }>
                                    <Table.Cell>{ iso2 }</Table.Cell>
                                    <Table.Cell>{ iso3 }</Table.Cell>
                                    <Table.Cell>{ name }</Table.Cell>
                                    <Table.Cell>{ currency }</Table.Cell>
                                    <Table.Cell>{ phoneCode }</Table.Cell>
                                    <Table.Cell>{ longitude }</Table.Cell>
                                    <Table.Cell>{ latitude }</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table> 
            }
        </ContentPane>
    );     
};

export default CountriesList;
