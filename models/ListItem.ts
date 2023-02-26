import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const listItemSchema = new Schema({
	name: String,
	description: String,
	link: String,
});

const ListItem = mongoose.model('listItems', listItemSchema);

module.exports = ListItem;
