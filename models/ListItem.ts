import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const listItemSchema = new Schema({
	name: String,
	description: String,
	link: String,
});

export const ListItem =
	mongoose.models.listitems || mongoose.model('listitems', listItemSchema);
