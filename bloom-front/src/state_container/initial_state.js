import * as LocalStorage from '../functions/local_storage'
import L from "leaflet";
import * as tehTypes from '../components/constants/tehnikTypes'

export const initial_state = {
    isLoad: false,
    //Это я должен получать с бэка!
    routs: [
        {
            routeId: 1,
            name: "Тестовый маршрут 1",
            points: [L.latLng(52.60227, 39.5737), L.latLng(52.61081, 39.57301)],
            tehnikPosition: {lat: 52.60227, len: 39.5737},
            line_color: "red",
            typeTeh: tehTypes.tractor,
            timeWork: "8.00",
            tehCount: 5,
        },
        {
            routeId: 2,
            name: "Тестовый маршрут 2",
            points: [ L.latLng(52.60373, 39.58426), L.latLng(52.60346, 39.60297), L.latLng(52.59637, 39.59953)],
            tehnikPosition: {lat: 52.60373, len: 39.58426},
            line_color: "green",
            typeTeh: tehTypes.kamaz,
            timeWork: "9.00",
            tehCount: 5,
        },
        {
            routeId: 3,
            name: "Тестовый маршрут 3",
            points: [
                L.latLng(52.59741652487582,39.57396277866162),
                L.latLng(52.59661948861498,39.572997183416255),
                L.latLng(52.59661948861498,39.572997183416255),
                L.latLng(52.596815482489234,39.57527169666087),
                L.latLng(52.59597923581843,39.57748183688914),
                L.latLng(52.59600536876969,39.57821139774119),
                L.latLng(52.59571790544415,39.58022841892039),
                L.latLng(52.595992302296025,39.58143004855906),
                L.latLng(52.59380345756655,39.56932283931085),
                L.latLng(52.59321543267655,39.571168199113075),
                L.latLng(52.59260126487983,39.57329250865288),
                L.latLng(52.593097826746884,39.5741079001934),
                L.latLng(52.5935943829587,39.57464434199639),
                L.latLng(52.5938687931759,39.57462288432426),
                L.latLng(52.59385572606186,39.57816340022392),
                L.latLng(52.59439147452597,39.57816340022392),
                L.latLng(52.59446987618802,39.579429402878944),
            ],
            line_color: "blue",
            tehnikPosition: {lat: 52.595992302296025, len: 39.58143004855906},
            typeTeh: tehTypes.kamaz,
            timeWork: "8.30",
            tehCount: 5,
        }

    ],
    selectedRouteId: LocalStorage.getNumber("selectedRouteId"),
    selectedRouteCopy:{} 
}