import CategoryModel from "./category.model"

class EventModel {
   public _id: string
   public categoryId: string
   public eventDate: string
   public description: string
   public address: string
   public guestsNumber: number
   public category: CategoryModel
}

export default EventModel;