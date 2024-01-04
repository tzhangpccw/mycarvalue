import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { User } from './users/user.entity'
import { User } from './users/user.entity'
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');
const settings = require('../ormconfig.js');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(settings),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       //During development,synchronize: true is very useful!
    //       // Before deploying your app for the first time, I highly 
    //       // recommend using synchronize: false and never use it again
    //       entities: [User, Report],
    //     };
    //   },
    // }),

    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [User, Report]
    //     }
    //   }
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   // database: process.env.NODE_ENV==='test' ? 'test.sqlite' : 'db.sqlite',
    //   // database: 'db.sqlite',
    //   entities: [User, Report], //UserEntity, ReportEntity
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }],
})
export class AppModule {

  constructor(private configService: ConfigService) { }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       cookieSession({
  //         keys: ['abcdefg']
  //       }),
  //     )
  //     .forRoutes('*');
  // }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}