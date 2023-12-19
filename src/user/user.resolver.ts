import { Args, Context, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { createWriteStream } from 'fs';
import * as GraphqlUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';
import * as uuidv4 from 'uuid';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  async updateProfile(
    @Args('fullname') fullname: string,
    @Args('file', { type: () => GraphqlUpload, nullable: true }) file: GraphqlUpload.FileUpload,
    @Context() context: { req: Request }
  ) {
    const avatarUrl = file ? await this.storeImageAndGetUrl(file) : null;
    const userId = context.req.user.sub;
    return this.userService.updateProfile({
      userId,
      fullname,
      avatarUrl
    });
  }

  private async storeImageAndGetUrl(file: GraphqlUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/uniqueFilename`;
    const readStream = createReadStream();

    readStream.pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}
