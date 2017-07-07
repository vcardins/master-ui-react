export default {
	type: 'object',
	required: ['username', 'email', 'firstName', 'password', 'confirmPassword'],
	username: {
		type: 'string',
		minLength: 6,
	},
	email: {
		type: 'string',
		pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
	},
	firstName: {
		type: 'string',
	},
	password: {
		type: 'string',
		minLength: 6,
	},		
	confirmPassword: {
		type: 'string',
		minLength: 6,
	},
};
