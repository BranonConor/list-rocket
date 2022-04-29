const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
	name: String,
	description: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	// collaborators: [
	//     {
	//         type: Schema.Types.ObjectId,
	//         ref: 'users'
	//     }
	// ],
	// lists: [
	//     {
	//         type: Schema.Types.ObjectId,
	//         ref: 'lists'
	//     }
	// ]
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
