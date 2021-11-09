import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import Routes from './models/route';

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
       await this.appService.addRoute(req.body.name)
       res.json({
         error: false,
         message: ''
       })
  }
  @Post("remove_route")
  async RemoveRoute(@Res() res,@Req() req){
      await this.appService.removeRoute(req.body.routeId)
      res.json({
        error: false,
        message: ''
      })
  }
  @Post("edit_route")
  async EditRoute(@Res() res,@Req() req){
     var result =  await this.appService.editRoute(req.body.routeId, req.body.routeData)
     res.json(result)
  }
  @Post("edit_route_poins")
  async EditRoutePoints(@Res() res,@Req() req){
     var result = await this.appService.editRoutePoints(req.body.routeId, req.body.points)
     res.json(result)
  }
  @Post("reset_routes")
  async ResetRoutes(@Res() res,@Req() req){

  }
  @Post("test")
  async test(@Res() res){
    // var route = await Routes.findOne({id: 1})
    // route.name = "Тестовый маршрут"
    // await route.save()
    //   res.json({
    //      res: this.appService.addRoute()
    //   })
  }
}
