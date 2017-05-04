import * as React from 'react';
import { Link } from 'react-router';
import { Segment, Card, Grid, Image } from 'semantic-ui-react';
import '../index.scss';

interface Props extends React.HTMLProps<HTMLDivElement> {
    lookup: any;
    header: string;
    description: string;
}

const Dashboard: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { lookup, header, description } = props;
    const paragraphImage = 'https://react.semantic-ui.com/assets/images/wireframe/paragraph.png';
    const GridExampleVerticallyDivided = (
        <Grid divided="vertically">
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    const GridExampleRows = (
        <Grid columns={3}>
            <Grid.Row>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>

             <Grid.Row columns={2}>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
                <Grid.Column>
                    <Image src={paragraphImage} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
    
    return (
        <div>
            { GridExampleVerticallyDivided }
            { GridExampleRows }
        </div>
    );
};

export default Dashboard;
