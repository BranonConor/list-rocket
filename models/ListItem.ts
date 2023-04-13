import mongoose from 'mongoose';
const { Schema } = mongoose;

const ListItemSchema = new Schema({
	name: String,
	description: String,
	link: String,
});

export const ListItem =
	mongoose.models.listitems || mongoose.model('listitems', ListItemSchema);
