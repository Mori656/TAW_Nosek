import { RequestHandler, Request, Response, NextFunction } from 'express';
import { config } from "../config";

export const logPost: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    if(request.method=="GET"){
        console.log(`\x1b[32m${request.method}\x1b[0m ${request.url} ${new Date().toISOString()}`);
    }else if(request.method=="POST"){
        console.log(`\x1b[34m${request.method}\x1b[0m ${request.url} ${new Date().toISOString()}`);
    }else if(request.method=="PUT"){
        console.log(`\x1b[36m${request.method}\x1b[0m ${request.url} ${new Date().toISOString()}`);
    }else if(request.method=="DELETE"){
        console.log(`\x1b[31m${request.method}\x1b[0m ${request.url} ${new Date().toISOString()}`);
    }else{
        console.log(`\x1b[39m${request.method}\x1b[0m ${request.url} ${new Date().toISOString()}`);
    }
     
    next();
};