import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import { EventModel } from "../3-models/event-model";
import StatusCode from "../3-models/status-code";

const router = express.Router();

router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await dataService.getAllCategories();
        response.json(categories);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/events-by-category/:categoryId([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId
        const events = await dataService.getEventsByCategory(categoryId);
        response.json(events);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/events", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const event = new EventModel(request.body);
        const addedEvent = await dataService.addEvent(event);
        response.status(StatusCode.Created).json(addedEvent);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/events/:_id([a-fA-F0-9]{24})", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await dataService.deleteEvent(_id);
        response.sendStatus(StatusCode.NoContent)
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
