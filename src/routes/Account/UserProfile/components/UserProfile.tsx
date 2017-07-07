import * as React from 'react';
import '../index.scss';
import { Card } from 'semantic-ui-react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    header: string;
    description: string;
}

/**
 * 
 * 
 * @param {Props} props 
 * @returns {JSX.Element} 
 */
const UserProfile: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { header, description } = props;

    {/*<!--
    Checkbox Trickery with CSS:
    http://codersblock.com/blog/checkbox-trickery-with-css/ 
    -->*/}
    return (
        <form>
            <h1>C:\Users\Will\Magic</h1>
            <div className="tree">
                <div>
                    <input id="n-0" type="checkbox" />
                    <label htmlFor="n-0">Black</label>
                    <div className="sub">
                        <a href="#link">Plague Rats</a>
                        <a href="#link">Sengir Vampire</a>
                    </div>
                </div>
                <div>
                    <input id="n-1" type="checkbox" />
                    <label htmlFor="n-1">Blue</label>
                    <div className="sub">
                        <a href="#link">Mana Leak</a>
                        <a href="#link">Time Warp</a>
                    </div>
                </div>
                <div>
                    <input id="n-2" type="checkbox" />
                    <label htmlFor="n-2">Green</label>
                    <div className="sub">
                        <a href="#link">Giant Growth</a>
                        <a href="#link">Liege of the Tangle</a>
                    </div>
                </div>
                <div>
                    <input id="n-3" type="checkbox" />
                    <label htmlFor="n-3">Red</label>
                    <div className="sub">
                        <a href="#link">Mogg Fanatic</a>
                        <a href="#link">Worldfire</a>
                    </div>
                </div>
                <div>
                    <input id="n-4" type="checkbox" />
                    <label htmlFor="n-4">White</label>
                    <div className="sub">
                        <a href="#link">Healing Salve</a>
                        <a href="#link">Serra Angel</a>
                    </div>
                </div>
                <div>
                    <input id="n-5" type="checkbox" />
                    <label htmlFor="n-5">Multicolor</label>
                    <div className="sub">
                        <div>
                            <input id="n-5-0" type="checkbox" />
                            <label htmlFor="n-5-0">Blue + Green</label>
                            <div className="sub">
                                <a href="#link">Simic Aurora</a>
                                <a href="#link">Wistful Selkie</a>
                            </div>
                        </div>
                        <div>
                            <input id="n-5-1" type="checkbox" />
                            <label htmlFor="n-5-1">Red + White</label>
                            <div className="sub">
                                <a href="#link">Boros Swiftblade</a>
                                <a href="#link">Lightning Helix</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="reset" value="Collapse All" />
        </form>
    );
};

export default UserProfile;
