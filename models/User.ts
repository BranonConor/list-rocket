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

export const User = mongoose.model('users', UserSchema);
