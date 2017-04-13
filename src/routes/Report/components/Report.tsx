import * as React from 'react';
import '../index.scss';
import { Segment, Card } from 'semantic-ui-react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    header: string;
    description: string;
}

const Report: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { header, description } = props;

    return (
        <Card
            image="http://semantic-ui.com/images/avatar/large/elliot.jpg"
            header={header}
            meta="Report"
            description={description}
        />
    );
};

export default Report;
