import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(page: number) {
    const perPage = 10;
    const offset = (page - 1) * perPage;

    return this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.date', 'DESC')
      .take(perPage)
      .skip(offset)
      .getMany();
  }

  async getPostById(id: number) {
    try {
      const fountPost = await this.postRepository
        .createQueryBuilder('post')
        .where('post.id=:id', { id })
        .getOne();

      if (!fountPost) {
        throw new NotFoundException('존재하지 않는 게시물입니다.');
      }

      return fountPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '게시물을 가져오는 중 에러가 발생했습니다.',
      );
    }
  }

  async createPost(createPostDto: CreatePostDto) {
    const {
      title,
      description,
      itemName,
      targetItemName,
      latitude,
      longitude,
      address,
      date,
      imageUris,
    } = createPostDto;

    const post = this.postRepository.create({
      title,
      description,
      itemName,
      targetItemName,
      latitude,
      longitude,
      address,
      date,
      // imageUris,
    });

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '게시물 생성 중 에러가 발생했습니다.',
      );
    }

    return post;
  }

  async deletePost(id: number) {
    try {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .delete()
        .from(Post)
        .where('id=:id', { id })
        .execute();
      if (result.affected === 0) {
        throw new NotFoundException('존재하지 않는 게시물입니다.');
      }

      return id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '게시물을 삭제하는 중 에러가 발생했습니다.',
      );
    }
  }

  async updatePost(
    id: number,
    updatePostDto: Omit<CreatePostDto, 'latitude' | 'longitude' | 'address'>,
  ) {
    const post = await this.getPostById(id);
    const { title, description, itemName, targetItemName, date } =
      updatePostDto;

    post.title = title;
    post.description = description;
    post.itemName = itemName;
    post.targetItemName = targetItemName;
    post.date = date;
    // post.ImageUris = ImageUris;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '게시물을 업데이트하는 중 에러가 발생했습니다.',
      );
    }
    return post;
  }
}
