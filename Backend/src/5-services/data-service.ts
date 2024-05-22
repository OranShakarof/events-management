import { error } from "console";
import { CategoryModel, ICategoryModel } from "../3-models/category-model";
import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";
import { EventModel, IEventModel } from "../3-models/event-model";

function getAllCategories(): Promise<ICategoryModel[]> {
  return CategoryModel.find().exec();
}

function getEventsByCategory(categoryId: string): Promise<IEventModel[]> {
  const event = EventModel.find({ categoryId }).populate("category").exec();
  if(!event) throw new ResourceNotFoundError(categoryId);
  return event;

}

function addEvent(event: IEventModel): Promise<IEventModel> {
  const errors = event.validateSync();
  if(errors) throw new ValidationError(errors.message);
  return event.save();
}

async function deleteEvent(_id: string): Promise<void> {
  const deletedEvent = await EventModel.findByIdAndDelete(_id).exec();
  if (!deletedEvent) throw new ResourceNotFoundError(_id);
}

export default {
  getAllCategories,
  getEventsByCategory,
  addEvent,
  deleteEvent
};
