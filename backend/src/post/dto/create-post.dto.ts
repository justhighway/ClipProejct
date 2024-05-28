import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  itemName: string;

  @IsString()
  targetItemName: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsString()
  address: string;

  @IsDateString()
  date: Date;

  @IsArray()
  imageUris: { uri: string }[];
}
