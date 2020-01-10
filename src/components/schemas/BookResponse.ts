import { IsArray, IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

class ISubDesc {
  title: string;
  list: string[];
}

export class BookResponse {
  @IsString()
  id?: string;

  @IsArray()
  authors?: string[];

  @IsString()
  imageUrl?: string;

  @IsString()
  filePath?: string;

  @IsString()
  title?: string;

  @IsArray()
  description?: string[];

  @IsEnum(ISubDesc)
  subDescription?: ISubDesc;

  @IsArray()
  categories?: string[];

  @IsNumber()
  rate?: number;

  @IsNumber()
  pages?: number;

  @IsString()
  country?: string;

  @IsDateString()
  published?: string;
}