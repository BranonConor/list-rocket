import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListItemSchema = new Schema({
	name: String,
	description: String,
	link: String,
	resolvedBy: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	event: {
		type: Schema.Types.ObjectId,
		ref: 'events',
	},
});

const getListItemModel = () => mongoose.model('listitems', ListItemSchema);
export const ListItem = (mongoose.models.listitems ||
	getListItemModel()) as ReturnType<typeof getListItemModel>;

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
	event: {
		type: Schema.Types.ObjectId,
		ref: 'events',
	},
});

const getListModel = () => mongoose.model('lists', ListSchema);
export const List = (mongoose.models.lists || getListModel()) as ReturnType<
	typeof getListModel
>;
