import mongoose from 'mongoose';
const { Schema } = mongoose;

const DocSchema = new Schema({
	data: {
		type: Schema.Types.String,
	},
	event: {
		type: Schema.Types.ObjectId,
		ref: 'events',
	},
});

const getDocModel = () => mongoose.model('docs', DocSchema);
export const Doc = (mongoose.models.docs || getDocModel()) as ReturnType<
	typeof getDocModel
>;
