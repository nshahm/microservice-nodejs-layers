import * as Express from "express";

interface BaseService {
    
    create: Express.RequestHandler;
    update: Express.RequestHandler;
    delete: Express.RequestHandler;
    retrieve: Express.RequestHandler;
    findById: Express.RequestHandler;
}

export default BaseService;