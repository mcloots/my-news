import {Status} from '../admin/status/status';
import {Category} from '../admin/category/category';

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    imageCaption: string;
    content: string;
    author: string;
    authorId: number;
    publishDate: string;
    categoryId: number;
    statusId: number;
    status: Status;
    category: Category;
}
