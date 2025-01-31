import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import DataService from '../modules/services/data.service';
import Joi from 'joi';

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService: DataService;

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

        // New routes for comments
        this.router.post(`${this.path}/:id/comment`, this.addComment);
        this.router.get(`${this.path}/:id/comments`, this.getComments);
        this.router.delete(`${this.path}/:id/comment/:commentId`, this.deleteComment);
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
        const { title, text, image, tags } = request.body;

        console.log('Request Body:', request.body); 
        
        const readingData = Joi.object({
            title: Joi.string().required(),
            text: Joi.string().required(),
            image: Joi.string().uri().required(),
            tags: Joi.array().items(Joi.string().max(50)).max(10).optional(),
        });

        try {
            const validatedData = await readingData.validateAsync(request.body);
            const post = await this.dataService.createPost(validatedData);
            response.status(200).json(post);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const post = await this.dataService.query({ _id: id });
        response.status(200).json(post);
    };

    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({ _id: id });
        response.sendStatus(200);
    };

    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData({});
        response.sendStatus(200);
    };

    private addComment = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const { text, author } = request.body;

        const commentSchema = Joi.object({
            text: Joi.string().required(),
            author: Joi.string().required(),
        });

        try {
            const validatedComment = await commentSchema.validateAsync(request.body);
            const post = await this.dataService.addCommentToPost(id, validatedComment);
            response.status(200).json(post);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    };

    private getComments = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const post = await this.dataService.query({ _id: id });
        if (post && post[0].comments) {
            response.status(200).json(post[0].comments);
        } else {
            response.status(404).json({ error: 'Post not found or no comments available.' });
        }
    };

    private deleteComment = async (request: Request, response: Response, next: NextFunction) => {
        const { id, commentId } = request.params;
        const post = await this.dataService.deleteCommentFromPost(id, commentId);
        if (post) {
            response.status(200).json(post);
        } else {
            response.status(404).json({ error: 'Post or comment not found.' });
        }
    };
}

export default PostController;