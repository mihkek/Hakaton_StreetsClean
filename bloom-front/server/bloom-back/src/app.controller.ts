import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("get_routes")
  async getRoutes(@Res() res,@Req() req){
      var routes = await this.appService.getRoutesWithPoints()
      res.json({
        routes: routes.routes,
        error: routes.error,
        errorMessage: routes.errorMessage
      })
  }
  @Post("add_route")
  async addRoute(@Res() res,@Req() req){

  }
  @Post("remove_route")
  async RemoveRoute(@Res() res,@Req() req){

  }
  @Post("reset_routes")
  async ResetRoutes(@Res() res,@Req() req){
    
  }
}
