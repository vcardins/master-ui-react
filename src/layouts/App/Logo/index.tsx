import * as React from 'react';
import { Image } from 'semantic-ui-react';
import './index.scss';

interface Props {
    imageUrl?: string;
    onLogoBtnClick?: Function;    
}

const Logo: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { imageUrl, onLogoBtnClick } = props;

    return (
        <div className="logo">
            <Image src={imageUrl} centered height="34px" onClick={onLogoBtnClick}/>
        </div>
    );
};

export default Logo;
