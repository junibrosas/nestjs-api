import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

type UpdateProfile = {
  userId: number,
  fullname: string,
  avatarUrl: string
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async updateProfile({ userId, fullname, avatarUrl }: UpdateProfile) {
    if (avatarUrl) {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          fullname,
          avatarUrl
        }
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullname
      }
    });
  }

  async searchUsers(fullname: string, userId: number) {
    return this.prisma.user.findMany({
      where: {
        fullname: {
          contains: fullname
        },
        id: {
          not: userId
        }
      }
    })
  }
}
