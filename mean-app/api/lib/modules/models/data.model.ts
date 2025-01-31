export interface IData {
    title: string;
    text: string;
    image: string;
    tags: ITag[];
    comments: IComment[];
 }
 
 export type Query<T> = {
    [key: string]: T;
 };

 interface IComment {
   user: string;
   text: string;
}
interface ITag {
   tagName: string;
}