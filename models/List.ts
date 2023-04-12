import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	items: [
		{
			type: Schema.Types.ObjectId,
			ref: 'listItems',
		},
	],
});

export const List =
	mongoose.models.lists || mongoose.model('lists', listSchema);
