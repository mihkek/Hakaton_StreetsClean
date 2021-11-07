import { Injectable } from '@nestjs/common';
import Routes from './models/route';
import RoutePoints from './models/route-points';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getRoutes(){
      
  }
  addRoute(){

  }
  removeRoute(){

  }
  setNewRoutes(){

  }
}
