import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListSchema = new Schema({
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
	mongoose.models.lists || mongoose.model('lists', ListSchema);
