import mongoose, { Document, Schema, model } from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Interface: 
export interface IEventModel extends Document{
    categoryId: mongoose.Schema.Types.ObjectId;
    eventDate: string;
    description: string;
    address: string;
    guestsNumber: number;
}

// 2. Schema: 
export const EventSchema = new Schema<IEventModel>({
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    eventDate: {
        type: String,
        required: [true, "Missing Event Date."],
    },
    description: {
        type: String,
        required: [true, "Missing Event Description."],
        minlength: [2, "Event Description too short"],
        maxlength: [100, "Event Description too long"],
    },
    address: {
        type: String,
        required: [true, "Missing Event Address."],
        minlength: [2, "Event address too short"],
        maxlength: [100, "Event address too long"],
    },
    guestsNumber: {
        type: Number,
        required: [true, "Missing number of guests."],
        min: [5, "Event guests can't be lower than 5."],
        max: [1000, "Event guests can't be over 1000."],
    }
},{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

EventSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

// 3. Model: 
export const EventModel = model<IEventModel>("EventModel", EventSchema, "events");