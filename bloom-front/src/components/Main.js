import Map from "./Map"
import axios from "axios";
import L, { point } from "leaflet";
import "leaflet-routing-machine";
import React, { useEffect } from "react";
import ModalCenter from "./show-info/modal-center";
import SidePanel from "./show-info/side-panel";
import { useState } from "react";
import TopPanel from "./action-panels/top-action-panel";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {select_route, edit_selected_route, change_route} from '../state_container/actions'
import Loader from "./library/Loader";
import EditPointsDirection from "./show-info/edit-points_direction";
import { ErrorLoader } from "./library/Loader";
import API from "../functions/API";
import { ConstructRoutsFromServerData } from "../functions/routes-manage";
import { set_routs } from "../state_container/actions";

const Main = () =>{
    const selectedRouteId = useSelector(state => state.selectedRouteId)
    const routs = useSelector(state => state.routs)
    const currentRouteCopy = useSelector(state => state.selectedRouteCopy)
    const isLoad = useSelector(state => state.isLoad)
    const dispatch = useDispatch()


    const [state, setState] = useState({
        showCenter: false,
        showSide: false,
        showEditPointsDialog: false,
        currentRoute: {},
        clicked_lat: 0,
        clicked_lng: 0,
        hasError: false,
        errorMessage: "Not error)"
    })

    useEffect(() => {
        API({
            method: 'post', 
            url: 'get_routes', 
            secure: true,
            headers: {},
            data: {
            }   
        })
        .then(response=> {
            var routes = ConstructRoutsFromServerData(response.data)
            dispatch(
                set_routs({
                    routs: routes
                })
            )
            setState({
                ...state
            })
        }) 
        .catch( err=>{
             setState({
                 ...state,
                 hasError: true,
                 errorMessage: err
             })
        })
    }, [])

    const setCurrentRoute = (params) =>{
        dispatch(select_route({
            selectedRouteId: params.route_id
        }))
        if(currentRouteCopy == undefined)
            return
        setState({
            ...state,
            currentRoute: currentRouteCopy
        })
        showCenter()
    }
    const showCenter = (params) =>{
       // console.log(params)

        setState({
            ...state,
            showCenter: true,
            showSide: false,
            showEditPointsDialog: false
        })
    }
    const showSide = () =>{
        setState({
            ...state,
            showSide: true,
            showCenter: false,
            showEditPointsDialog: false
        })
    }
    const hideAll = () =>{
        setState({
            ...state,
            showSide: false,
            showCenter: false,
            showEditPointsDialog: false
        })
    }
    const saveRouteData = (params) =>{
        if(currentRouteCopy == undefined)
            return 
        var routeCopy = currentRouteCopy
        routeCopy.name = params.route.name
        routeCopy.timeWork = params.route.timeWork
        routeCopy.typeTeh = params.route.typeTeh
        routeCopy.tehCount = params.route.tehCount
         dispatch(edit_selected_route({
             //Это пока так, потому что редачить можно далеко не все параметры роута
             route: routeCopy
         }))
         dispatch(change_route())
         hideAll()
    }
    const findAdress = (adress) =>{
        alert(adress)
    }
    const editControlPoints = () =>{
        setState({
            ...state,
            showSide: false,
            showCenter: false,
            showEditPointsDialog: true,
        })
    }
    const saveNewPointsData = (points) =>{
        if(currentRouteCopy == undefined)
            return 

        var routeCopy = currentRouteCopy
        routeCopy.points = points
        dispatch(edit_selected_route({
            route: routeCopy
        }))
        dispatch(change_route())
        hideAll()
    }
    return(
        <React.Fragment>
            {isLoad && <Loader/>}
            {state.hasError && <ErrorLoader errorMessage={state.errorMessage} />}
            <div className="wrapper">
                <Map
                   onclick={setCurrentRoute}
                />

                <TopPanel 
                    ButtonAction = {findAdress}
                />

                {state.showCenter && <ModalCenter 
                                        route={currentRouteCopy} 
                                        CloseAction={hideAll} 
                                        TargetAction={showSide} />}

                {state.showSide && <SidePanel 
                                        route={currentRouteCopy}  
                                        SaveAction={saveRouteData} 
                                        CloseAction={hideAll} 
                                        EditControlPointsAction={editControlPoints}/> }

                {state.showEditPointsDialog && <EditPointsDirection 
                                                    CloseSaveAction={saveNewPointsData}
                                                    CloseAction={hideAll} 
                                                    Points={currentRouteCopy.points}/>  }
            </div>

        </React.Fragment>

    )
}
export default Main