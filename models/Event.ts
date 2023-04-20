import mongoose from 'mongoose';
const { Schema } = mongoose;

const EventSchema = new Schema({
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
	pendingCollaborators: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
	],
});

const getModel = () => mongoose.model('events', EventSchema);
export const Event = (mongoose.models.events || getModel()) as ReturnType<
	typeof getModel
>;
