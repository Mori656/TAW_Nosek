import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getPost);
        this.router.post(`${this.path}`, this.addPost);
        this.router.delete(`${this.path}/:id`, this.delPost);
        this.router.get(`${this.path}s/:num`, this.getSomePosts);
        this.router.get(`${this.path}s`, this.getAllPosts);
        this.router.delete(`${this.path}s`, this.delAllPosts);
    }

    private getPost = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        if (isNaN(id) || id < 0 || id >= testArr.length) {
            return response.status(404).json("Elementu nie znaleziono");
        }
        response.status(200).json(testArr[id]);
    };

    private addPost = async (request: Request, response: Response, next: NextFunction) => {
        const { number } = request.body;
        testArr.push(number);
        response.status(200).json('Dodano element');
    };

    private delPost = async (request: Request, response: Response, next: NextFunction) => {
        const id = Number(request.params.id);
        if (isNaN(id) || id < 0 || id >= testArr.length) {
            return response.status(404).json("Elementu nie znaleziono");
        }
        testArr.splice(id,1);
        response.status(200).json("Element usunięto");
    };

    private getSomePosts = async (request: Request, response: Response, next: NextFunction) => {
        const num = Number(request.params.num); 
        response.status(200).json(testArr.slice(0,num));
    };

    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {

        response.status(200).json(testArr);
    };
    private delAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        testArr = [];
        
        response.status(200).json("Usunięto wszystkie elementy");
        };
}

export default PostController;