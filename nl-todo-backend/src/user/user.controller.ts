import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt.guard';
import { PageDto, PageOptionsDto } from 'src/common/dto/page.dto';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user.' })
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(new User(createUserDto));
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrive user.' })
  retrive(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users.' })
  async list(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    return this.userService.listAll(pageOptionsDto);
  }
}
