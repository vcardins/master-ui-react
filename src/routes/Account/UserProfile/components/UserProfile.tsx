import * as React from 'react';
import '../index.scss';
import { Card } from 'semantic-ui-react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    header: string;
    description: string;
}

const UserProfile: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { header, description } = props;

    return (
        <div id="page-report">
            <Card
                image="http://semantic-ui.com/images/avatar/large/elliot.jpg"
                header={header}
                meta="User Profile"
                description={description}
            />
        </div>
    );
};

export default UserProfile;
