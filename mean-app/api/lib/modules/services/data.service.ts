import { IData, Query } from "../models/data.model";
import dataSchema from '../schemas/data.schema';

class DataService {
    // Tworzenie nowego posta
    public async createPost(postParams: IData) {
        try {
            const dataModel = new dataSchema(postParams);
            await dataModel.save();
            return dataModel; // Zwracamy utworzony post
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    // Pobieranie postów na podstawie zapytania
    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await dataSchema.find(query, { __v: 0 });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    // Pobieranie ograniczonej liczby postów
    public async getSomePosts(lim: number) {
        try {
            const result = await dataSchema.find({}, { __v: 0 }, { limit: lim });
            return result;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    // Usuwanie postów na podstawie zapytania
    public async deleteData(query: Query<number | string | boolean>) {
        try {
            await dataSchema.deleteMany(query);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }

    // Dodawanie komentarza do posta
    public async addCommentToPost(postId: string, comment: { text: string; author: string }) {
        try {
            const updatedPost = await dataSchema.findByIdAndUpdate(
                postId,
                { $push: { comments: comment } }, // Dodajemy komentarz do tablicy `comments`
                { new: true } // Zwracamy zaktualizowany dokument
            );
            return updatedPost;
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania komentarza:', error);
            throw new Error('Wystąpił błąd podczas dodawania komentarza');
        }
    }

    // Usuwanie komentarza z posta
    public async deleteCommentFromPost(postId: string, commentId: string) {
        try {
            const updatedPost = await dataSchema.findByIdAndUpdate(
                postId,
                { $pull: { comments: { _id: commentId } } }, // Usuwamy komentarz o podanym `commentId`
                { new: true } // Zwracamy zaktualizowany dokument
            );
            return updatedPost;
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania komentarza:', error);
            throw new Error('Wystąpił błąd podczas usuwania komentarza');
        }
    }

    // Pobieranie komentarzy dla danego posta
    public async getComments(postId: string): Promise<any[]> {
        try {
            const post = await dataSchema.findById(postId, { comments: 1, _id: 0 }); // Pobieramy tylko pole `comments`
            return post ? post.comments : []; // Zwracamy komentarze lub pustą tablicę, jeśli post nie istnieje
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania komentarzy:', error);
            throw new Error('Wystąpił błąd podczas pobierania komentarzy');
        }
    }
}

export default DataService;