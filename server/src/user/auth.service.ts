import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './model/user.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUserFields(user),
      accessToken: await this.issueAccessToken(String(user._id)),
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (oldUser)
      throw new BadRequestException(
        'User with this email is already in the system',
      );

    const salt = await genSalt(10);

    const newUser = new this.userModel({
      email: dto.email,
      password: await hash(dto.password, salt),
      avatarPath: faker.image.avatar()
    });

    const user = await newUser.save();

    return {
      user: this.returnUserFields(user),
      accessToken: await this.issueAccessToken(String(user._id)),
    };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(dto: AuthDto): Promise<UserModel> {
    const user = await this.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException('User not found');

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async issueAccessToken(userId: string) {
    const data = { _id: userId }; // записываем данные которые будем писать внутрь токена

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '31d',
    });

    return { accessToken }; // генерируем токен с помощью signAsync ДЖВТ
  }

  returnUserFields(user: UserModel) {
    return {
      _id: user._id,
      email: user.email,
      avatarPath: user.avatarPath,
    };
  }
}
