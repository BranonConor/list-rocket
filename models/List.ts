import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
	_id: String,
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

const List = mongoose.model('lists', listSchema);

module.exports = List;
