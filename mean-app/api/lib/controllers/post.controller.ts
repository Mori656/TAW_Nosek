import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService:DataService;

    constructor() {
        this.dataService = new DataService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        
        this.router.post(`${this.path}`, this.addData);
        this.router.get(`${this.path}s`, this.getAllPosts);
        this.router.get(`${this.path}s/:num`, checkPostCount, this.getSomePosts);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.delete(`${this.path}/:id`, this.deleteById);
        this.router.delete(`${this.path}s`, this.deleteAllPosts);
    }

    private getAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        const someData = await this.dataService.query({});
        response.status(200).json(someData);
    };

    private getSomePosts = async (request: Request, response: Response, next: NextFunction) => {
        const num = Number(request.params.num); 
        const someData = await this.dataService.getSomePosts(num);
        response.status(200).json(someData);
    };

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { title, text, image } = request.body;

        const readingData = {
            title,
            text,
            image
        };

        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)

            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }
     
    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }
     
    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData({});
        response.sendStatus(200);
    };
     
     
}

export default PostController;