import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { compareSync, hashSync } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashed = hashSync(registerDto.password);
    const user = await this.prisma.user.create({
      data: { ...registerDto, password: hashed },
    });

    return this.generateToken(user.id, user.email);
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) throw new UnauthorizedException('Credential invalids');

    const isPasswordMatch = compareSync(loginDto.password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Credential invalids');

    return this.generateToken(user.id, user.email);
  }

  private generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return { access_token: this.jwt.sign(payload) };
  }
}
