import * as React from 'react';
import '../index.scss';
import { Card } from 'semantic-ui-react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    user: any;
}

/**
 * 
 * 
 * @param {Props} props 
 * @returns {JSX.Element} 
 */
const UserTodo = ({ user }: Props): JSX.Element => {
    {/*<!--
    Checkbox Trickery with CSS:
    http://codersblock.com/blog/checkbox-trickery-with-css/ 
    -->*/}
    return (
        <div className="user-todo">
            <div className="container">
                <h1>Will's Summer To-Do List</h1>
                <div className="items">
                    <input id="item1" type="checkbox" />
                    <label htmlFor="item1">Create a to-do list</label>

                    <input id="item2" type="checkbox" />
                    <label htmlFor="item2">Take down Christmas tree</label>

                    <input id="item3" type="checkbox" />
                    <label htmlFor="item3">Learn Ember.js</label>

                    <input id="item4" type="checkbox" />
                    <label htmlFor="item4">Binge watch every episode of MacGyver</label>

                    <input id="item5" type="checkbox" />
                    <label htmlFor="item5">Alphabetize everything in the fridge</label>

                    <input id="item6" type="checkbox" />
                    <label htmlFor="item6">Do 10 pull-ups without dropping</label>

                    <h2 className="done" aria-hidden="true">Done</h2>
                    <h2 className="undone" aria-hidden="true">Not Done</h2>
                </div>
            </div>
        </div>
    );
};

export default UserTodo;
