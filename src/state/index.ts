import _ from 'lodash';
import * as Baobab from 'baobab';
import StateDefaults from './defaults';

const State = new Baobab(StateDefaults, {
	// autoCommit boolean [true]: should the tree auto commit updates or should it let the user do so through the commit method?
	autoCommit: false,

	// asynchronous boolean [true]: should the tree delay the update to the next frame or fire them synchronously?
	// asynchronous: false,

	// immutable boolean [true]: should the tree's data be immutable? Note that immutability is performed through Object.freeze and should be disabled in production for performance reasons.
	immutable: true,

	// lazyMonkeys boolean [true]: should the monkeys be lazy? Disable this option for easier debugging in your console (getter functions are sometimes hard to read in the console).
	// lazyMonkeys: true,

	// persistent boolean [true]: should the tree be persistent. Know that disabling this option, while bringing a significant performance boost on heavy data, will make you lose the benefits of your tree's history and O(1) comparisons of objects.
	// persistent: false,

	// pure boolean [true]: by default, on set and apply operations, the tree will check if the given value and the target node are stricly equal. If they indeed are, the tree won't update.
	// pure: false,

	// validate function: a function in charge of validating the tree whenever it updates. See below for an example of such function.
	// validate: () => {},

	// validationBehavior string [rollback]: validation behavior of the tree. If rollback, the tree won't apply the current update and fire an invalid event while notify will only emit the event and let the tree enter the invalid state anyway.
	// validationBehavior: 'rollback',
});

if ( process.env.NODE_ENV !== 'production' ) {
	(window as any)._State = State;
	(window as any)._lodash = _;
}

export default State;
