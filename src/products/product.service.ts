import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// df801390-ac65-4466-9702-98da02d58660
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProductDto: CreateProductDto) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('The user does not exist');

    return this.prisma.product.create({
      data: { ...createProductDto, userId: user.id },
    });
  }

  async findAll(userId: string) {
    return this.prisma.product.findMany({ where: { userId } });
  }

  async findOne(userId: string, productId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('The product does not exists');

    if (product.userId !== userId) throw new ForbiddenException();

    return product;
  }

  async update(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOne(userId, productId);

    return this.prisma.product.update({
      where: { id: product.id },
      data: updateProductDto,
    });
  }

  async delete(userId: string, productId: string) {
    const product = await this.findOne(userId, productId);

    return this.prisma.product.delete({
      where: { id: product.id },
    });
  }
}
