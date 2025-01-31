import { Schema, model } from 'mongoose';
import { IData } from "../models/data.model";

export const DataSchema: Schema = new Schema({
   title: { type: String, required: true },
   text: { type: String, required: true },
   image: { type: String, required: true },
   tags: { type: [String], max: 10 },
   comments: [{ author: String, text: String}],
});

export default model<IData>('Post-MNo', DataSchema);