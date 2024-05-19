import mongoose, { Document, Schema } from 'mongoose';

interface IContent extends Document {
    content: string;
}

const ContentSchema: Schema = new Schema({
    content: { type: String, required: true },
});

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
