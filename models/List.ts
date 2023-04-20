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
});

const getListModel = () => mongoose.model('lists', ListSchema);
export const List = (mongoose.models.lists || getListModel()) as ReturnType<
	typeof getListModel
>;
