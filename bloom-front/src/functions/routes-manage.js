import L from "leaflet";
import * as tehTypes from '../components/constants/tehnikTypes'

export function getRouteById(id, routs){
    for(var i = 0;i<routs.length; i++){
        if(routs[i].routeId === id)
            return routs[i]
    }
    return undefined
}
export const ConstructRoutsFromServerData = (serverData) => {
    const routs = []
    serverData.routes.map(route => {
        var points = []
        route.routePoints.map(point => {
            points.push(L.latLng(point.lat, point.lng))
        })
        routs.push({
                    routeId: route.routeData.id,
                    name:  route.routeData.name,
                    points: points,
                    tehnikPosition: {lat: route.routeData.tehnikPosition_lat, len: route.routeData.tehnikPosition_len},
                    line_color: route.routeData.line_color,
                    typeTeh: tehTypes.getByNumber(route.routeData.typeTeh),
                    timeWork: route.routeData.timeWork,
                    tehCount: route.routeData.tehCount,
        })
    })
   return routs
}