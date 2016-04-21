import * as Express from "express";

interface IBaseService {
    
    create: Express.RequestHandler;
    update: Express.RequestHandler;
    delete: Express.RequestHandler;
    retrieve: Express.RequestHandler;
    findById: Express.RequestHandler;
}

export {IBaseService};