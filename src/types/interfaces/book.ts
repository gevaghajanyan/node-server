import { Document } from 'mongoose'

export interface IBook extends Document {
  id?: string;
  authors?: string[];
  imageUrl?: string;
  filePath?: string;
  title?: string;
  description?: string[];
  subDescription?: {
    title: string;
    list: string[];
  };
  categories?: string[];
  rate?: number;
  pages?: number;
  country?: string;
  published?: string;
}
