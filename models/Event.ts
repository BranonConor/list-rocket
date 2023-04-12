import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const eventSchema = new Schema({
	name: String,
	description: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	collaborators: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
	],
	lists: [
		{
			type: Schema.Types.ObjectId,
			ref: 'lists',
		},
	],
});

export const Event =
	mongoose.models.events || mongoose.model('events', eventSchema);
