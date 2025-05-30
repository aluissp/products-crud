import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserAuth } from 'src/auth/entities/user-auth.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @CurrentUser() user: UserAuth,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(user.id, createProductDto);
  }

  @Get()
  findAll(@CurrentUser() user: UserAuth) {
    const products = this.productService.findAll(user.id);

    return plainToInstance(Product, products, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserAuth) {
    return this.productService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserAuth,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(user.id, id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserAuth) {
    return this.productService.delete(user.id, id);
  }
}
