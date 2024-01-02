import mongoose from 'mongoose';
const { Schema } = mongoose;

const PollSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	title: String,
	options: [String],
	votes: [
		{
			user: { type: Schema.Types.ObjectId, ref: 'users' },
			vote: String,
		},
	],
	event: {
		type: Schema.Types.ObjectId,
		ref: 'events',
	},
	isOpen: Boolean,
});

const getPollModel = () => mongoose.model('polls', PollSchema);
export const Poll = (mongoose.models.polls || getPollModel()) as ReturnType<
	typeof getPollModel
>;
