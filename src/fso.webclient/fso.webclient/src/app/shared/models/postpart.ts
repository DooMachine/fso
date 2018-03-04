import { BaseImage } from './baseImage';

export interface PostPart {
    id: number;
    title: string;
    description: string;
    image: BaseImage;
    dateUtcAdd: Date;
    dateUtcModified: Date;
}
