import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";



const createRoutineMachineLayer = (props) => {

  /*
      Props
       RouteId
      1.Line_color
      2.Route_name
      3.SendRouteDataAction 
  */

  const SendRouteParams = (params) =>{
     props.SendRouteParams( {route_name: props.Route_name, route_id: props.RouteId , clickPointData: params})
  }
  const instance = L.Routing.control({
    waypoints: props.Routs,
     lineOptions: {
      //styles: props.IsSelect ? [{ color: "white", weight: 5 }] : [{ color: props.Line_color, weight: 4, opacity: 0.5 }],
      styles: [{ color: props.Line_color, weight: 4, opacity: 0.8 }]
    },
    routeLine: function(route, options) {
      var line = L.Routing.line(route, options);
      line.eachLayer(function(l) {
        l.on('click', function(e) {
            SendRouteParams(e)
        });
    });
      return line;
    },
    
     createMarker: function() {
        if(!props.isLast)
          return null; 
      } ,
    //Отключаем разные опции, в частности тут отключается ручное добавление маркеров
      routeWhileDragging: false,
      autoRoute: true,
      useZoomParameter: false,
      draggableWaypoints: false,
      show:false,
      addWaypoints:false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;