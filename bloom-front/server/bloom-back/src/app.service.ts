import { Injectable } from '@nestjs/common';
import Routes from './models/route';
import RoutePoints from './models/route-points';
const  iconv = require('iconv-lite')

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getRoutesWithPoints(){
    try{
      var routesList = await Routes.find()
      var testStr = routesList[0].name
      var encodeStr = iconv.decode(testStr, "utf8").toString();
      console.log(encodeStr)
      var routesWithPoints = []
     await Promise.all(routesList.map( async(route) =>{
           var routePoints = await this.getRoutePoints(route.id)
           routesWithPoints.push({
                routeData: route,
                routePoints: routePoints
           })
     } ))
      return {
        routes: routesWithPoints,
        error: false,
        errorMessage: ''
      }
    }catch(err){
      return{
        error: true,
        errorMessage: err.toString(),
        routes: []
      }
    }
  }
  async addRoute(){

  }
  async removeRoute(){

  }
  async setNewRoutes(){

  }
  async getRoutePoints(route){
      var routePoints = await RoutePoints.find({route: route})
      return routePoints
  }
}
