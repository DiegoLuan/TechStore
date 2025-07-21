/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductModule } from 'src/Product/product.module';
import { AppController } from './Controller/app.controller';
import { AppService } from 'src/App/Service/app.service';
import { DatabaseModule } from 'src/Core/Database/database.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
