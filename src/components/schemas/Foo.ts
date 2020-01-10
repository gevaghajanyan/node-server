import {  IsOptional, IsString, MaxLength} from 'class-validator'

export class Foo {
  @IsString() id: string;

  @IsOptional()
  @MaxLength(20, { each: true })
  tags: string[]
}