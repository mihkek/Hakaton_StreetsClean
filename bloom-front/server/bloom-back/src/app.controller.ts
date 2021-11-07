import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("get_routes")
  async getRoutes(){

  }
  @Post("add_route")
  async addRoute(){

  }
  @Post("remove_route")
  async RemoveRoute(){

  }
  @Post("reset_routes")
  async ResetRoutes(){
    
  }
}
