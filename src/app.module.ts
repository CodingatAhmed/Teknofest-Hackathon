/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    // import the MongooseModule and configure it to use the MONGO_URI from environment variables
    // MongooseModule.forRoot(process.env.MONGO_URI),

    ConfigModule.forRoot({
      isGlobal: true, // make ConfigModule available globally
      envFilePath: '.env', // specify the path to the .env file
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,

    UserModule,

    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
