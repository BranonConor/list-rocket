import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
	googleId: String,
	firstName: String,
	lastName: String,
	email: String,
	photo: String,
	events: [
		{
			type: Schema.Types.ObjectId,
			ref: 'events',
		},
	],
	invites: [
		{
			type: Schema.Types.ObjectId,
			ref: 'events',
		},
	],
});

const getUserModel = () => mongoose.model('users', UserSchema);
export const User = (mongoose.models.users || getUserModel()) as ReturnType<
	typeof getUserModel
>;
