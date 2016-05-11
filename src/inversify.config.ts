import "reflect-metadata";
import { Kernel } from "inversify";

// Actual implementation class
import API from "./api/API";
// import { Middlewares } from "base-middlewares";

import { EmployeeAPI } from "./api/EmployeeAPI";
import { EmployeeService } from "./service/EmployeeService";
import { EmployeeDAO } from "./dal/dao/EmployeeDAO";

// Interfaces
import {IAPI} from "./api/IAPI";
// import {IMiddlewares} from "base-middlewares";

import { IEmployeeAPI } from "./api/IEmployeeAPI";
import { IEmployeeModel }from "entity-employee";
import { IEmployeeService } from "./service/IEmployeeService";
import { IEmployeeDAO } from "./dal/dao/IEmployeeDAO";

let kernel: inversify.IKernel = new Kernel();

kernel.bind<IAPI> ("IAPI").to(API).inSingletonScope();

kernel.bind<IEmployeeAPI>("IEmployeeAPI").to(EmployeeAPI).inSingletonScope();
kernel.bind<IEmployeeService>("IEmployeeService").to(EmployeeService).inSingletonScope();
kernel.bind<IEmployeeDAO<IEmployeeModel>>("IEmployeeDAO").to(EmployeeDAO).inSingletonScope();

export {kernel};
export function getInstance<T> (name: string): T {
    return kernel.get<T> (name);
}
