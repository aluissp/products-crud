import { Module } from '@nestjs/common';
import { TaskModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TaskModule, AuthModule],
  controllers: [],
})
export class AppModule {}
