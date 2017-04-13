import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import './index.scss';

interface Props {
    children?: typeof React.PropTypes.element;
}

const Footer: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
     const { children } = props;

     return (
        <footer id="layout-footer">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}></Grid.Column>
                    <Grid.Column width={4}>
                        {children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>            
        </footer>
    );
};

export default Footer;
