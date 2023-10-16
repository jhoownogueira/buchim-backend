import { Injectable } from '@nestjs/common';
import { IPostRepository } from '../post.repository';
import { PrismaService } from 'apps/post-service/src/infra/database/prisma.service';

@Injectable()
export class PostPrismaRepository implements IPostRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<void> {
    await this.prisma.post.create({
      data,
    });
  }
}
