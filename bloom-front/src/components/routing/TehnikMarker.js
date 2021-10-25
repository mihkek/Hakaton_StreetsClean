import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";

const createTehnikMarker = (props) =>{
    /*
        Props
        1.Posiniton(lat,len)
        2.MarkerIcon
    */
    const icon  = L.icon({
        iconUrl: props.MarkerIcon,
        // shadowUrl: props.MarkerIconShadow === undefined ? undefined : props,MarkerIconShadow,
        iconSize:     [35, 30], // size of the icon
        shadowSize:   [0, 0], // size of the shadow
        iconAnchor:   [2, 9], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });
    const instance = L.marker([props.Posiniton.lat, props.Posiniton.len], {icon: icon})

    return instance
}

const TehnikMarker = createControlComponent(createTehnikMarker)
export default  TehnikMarker