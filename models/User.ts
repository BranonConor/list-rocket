import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
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
});

export const User =
	mongoose.models.users || mongoose.model('users', userSchema);
