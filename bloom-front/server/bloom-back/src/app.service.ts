import { Injectable } from '@nestjs/common';
import Routes from './models/route';
import RoutePoints from './models/route-points';
import { getColor } from './get_color';

const  iconv = require('iconv-lite')
const utf8 = require('utf8');

const autoenc = require('node-autodetect-utf8-cp1251-cp866');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getRoutesWithPoints(){
    try{
      var routesList = await Routes.find()
      var testStr = routesList[0].name
      var encodeStr = testStr// iconv.decode(testStr,  "Windows-1251").toString()

      console.log(encodeStr)
      console.log(autoenc.detectEncoding(encodeStr))
      console.log(autoenc.detectEncoding(encodeStr).encoding);
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
  async addRoute(routeName: string){
      var route = new Routes()
      route.name = routeName
      route.tehnikPosition_lat = 52.60227
      route.tehnikPosition_len = 39.5737
      route.line_color = getColor()
      route.typeTeh = 1
      route.timeWork = "8.00"
      route.tehCount = 2
      await route.save()

      var routePoint = new RoutePoints()
      routePoint.lat = "52.60227"
      routePoint.lng = "39.5737"
      routePoint.route = route
      await routePoint.save()

      var routePoint = new RoutePoints()
      routePoint.lat = "52.61081"
      routePoint.lng = "39.57301"
      routePoint.route = route
      await routePoint.save()
  }
  async removeRoute(routeId){
     await Routes.delete({id: routeId})
  }
  async editRoute(routeId, routeData){
    try{
        var route = await Routes.findOne({id: routeId})
        console.log(route)
        console.log(routeData)
        route.name = routeData.name
        route.tehCount = routeData.tehCount
        route.tehnikPosition_lat = routeData.tehnikPosition.lat
        route.tehnikPosition_len = routeData.tehnikPosition.len
        route.timeWork = routeData.timeWork
        route.typeTeh = routeData.typeTeh.number
        await route.save()
        return{
          error: false,
          message: ''
        }
    }catch(err){
        return{
          error: true,
          message: err
        }
    }
  }
  async editRoutePoints(routeId, points){
     var route = await Routes.findOne({id: routeId})
     RoutePoints.delete({route: route})

     await Promise.all(points.map( async(point) =>{
           var points = new RoutePoints()
         points.lat = point.lat
         points.lng = point.lng
         points.route = route
         await points.save()
     } ))
  }
  async setNewRoutes(){

  }
  async getRoutePoints(route){
      var routePoints = await RoutePoints.find({route: route})
      return routePoints
  }
}
