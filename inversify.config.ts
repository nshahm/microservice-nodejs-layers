/// <reference path="node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
/// <reference path="node_modules/reflect-metadata/reflect-metadata.d.ts"/>

import "reflect-metadata";
import { Kernel } from "inversify";

// Actual implementation
import EmployeeService from "./service/EmployeeService";
import EmployeeAPI from "./api/EmployeeAPI";
import {Middlewares} from "base-middlewares";
import { EmployeeRepository } from "./dal/repository/EmployeeRepository";
import { EmployeeDAO } from "./dal/dao/EmployeeDAO";
import IEmployeeDAO from "./dal/dao/IEmployeeDAO";
import API from "./api/API";
 
// Interfaces
import { IEmployeeService } from "./service/IEmployeeService";
// import { IEmployeeRepository } from "./dal/repository/IEmployeeRepository";
import { IEmployeeAPI } from "./api/IEmployeeAPI";
import { IEmployeeModel }from "entity-employee"; 

import {IMiddlewares} from "base-middlewares";
import {IAPI} from "./api/IAPI";


let kernel:inversify.IKernel = new Kernel();

kernel.bind("EmployeeRepository").toValue(new EmployeeRepository<IEmployeeModel>());
kernel.bind<IEmployeeDAO>("IEmployeeDAO").to(EmployeeDAO).inSingletonScope();
kernel.bind<IEmployeeService>("IEmployeeService").to(EmployeeService).inSingletonScope();
kernel.bind<IEmployeeAPI>("IEmployeeAPI").to(EmployeeAPI).inSingletonScope();
kernel.bind<IMiddlewares>("IMiddlewares").to(Middlewares).inSingletonScope(); 
kernel.bind<IAPI>("IAPI").to(API).inSingletonScope();

export default kernel;


export function getInstance<T>(name:string): T {
    return kernel.get<T>(name);
}