/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    // regitser mongoose schema here in future
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  providers: [UserService],
  exports: [
    UserService,

    // MongooseModule.forFeature([{name: User.name, schema: User}]),
    // export the schema if other modules need to use it

  ], // export UserService to be used in other modules(e.g., AuthModule)
})
export class UserModule {}
