import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListItemSchema = new Schema({
	name: String,
	description: String,
	link: String,
});

export const ListItem =
	mongoose.models.listitems || mongoose.model('listitems', ListItemSchema);

const ListSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	items: [
		{
			type: Schema.Types.ObjectId,
			ref: 'listitems',
		},
	],
});

export const List =
	mongoose.models.lists || mongoose.model('lists', ListSchema);
