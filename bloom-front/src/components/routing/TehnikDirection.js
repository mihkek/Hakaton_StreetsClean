import React from "react"
import RoutingMachine from "./Routing"
import TehnikMarker from "./TehnikMarker"
import { useSelector } from "react-redux"


const TehnikDirection = (props) =>{
    /*
       Props
       RouteId
      1.Line_color
      2.Route_name
      3.SendRouteDataAction 
      4.TehnikMarkerPosiniton(lat,len)
      5.TehnikMarkerIcon
      6.TehnikMarkerIconShadow
      7.IsSelect

    */
    const selectedRouteId = useSelector(state => state.selectedRouteId)
    return(
        <React.Fragment>
            <RoutingMachine
                     RouteId={props.RouteId}
                     Routs={props.Routs}
                     Line_color={props.Line_color}
                     Route_name={props.Route_name}
                     SendRouteParams={props.SendRouteParams}
                     IsSelect = {props.RouteId == selectedRouteId}
            />
            <TehnikMarker 
                     Posiniton = {props.TehnikMarkerPosiniton}
                     MarkerIcon = {props.TypeTeh.image}
            />
        </React.Fragment>
    )

}
export default TehnikDirection