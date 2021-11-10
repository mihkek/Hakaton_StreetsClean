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
import { set_load } from "../state_container/actions";

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
        getRoutes()
    }, [])

    const getRoutes = () =>{
        hideAll()
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
                ...state,
                showSide: false,
                showCenter: false,
                showEditPointsDialog: false
            })
        }) 
        .catch( err=>{
             setState({
                 ...state,
                 hasError: true,
                 errorMessage: err
             })
        })
    }
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
        var routeCopy = currentRouteCopy
        routeCopy.name = params.route.name
        routeCopy.timeWork = params.route.timeWork
        routeCopy.typeTeh = params.route.typeTeh
        routeCopy.tehCount = params.route.tehCount

        dispatch(set_load({
            isLoad: true
        }))
        API({
            method: 'post', 
            url: 'edit_route', 
            secure: true,
            headers: {},
            data: {
                'routeId': currentRouteCopy.routeId,
                'routeData': routeCopy,
            }   
        })
        .then( response => {
            dispatch(set_load({
                isLoad: false
            }))
            getRoutes()
        })
        .catch( err=>{
             console.log(err)
             dispatch(set_load({
                isLoad: false
            }))
        })
         hideAll()
    }
    const editControlPoints = () =>{
        setState({
            ...state,
            showSide: false,
            showCenter: false,
            showEditPointsDialog: true,
        })
    }
    const deleteRoute = () =>{
        if(currentRouteCopy == undefined)
            return 
        hideAll()
        dispatch(set_load({
                isLoad: true
            }))
        API({
                method: 'post', 
                url: 'remove_route', 
                secure: true,
                headers: {},
                data: {
                    'routeId': currentRouteCopy.routeId,
                }   
            })
            .then( response => {
                dispatch(set_load({
                    isLoad: false
                }))
               
                getRoutes()
            })
            .catch( err=>{
                 console.log(err)
                 hideAll()
                 dispatch(set_load({
                    isLoad: false
                }))
            })  
    }
    const saveNewPointsData = (points) =>{
        if(currentRouteCopy == undefined)
            return 
             hideAll()
             dispatch(set_load({
                isLoad: true
        }))
        API({
            method: 'post', 
            url: 'edit_route_poins', 
            secure: true,
            headers: {},
            data: {
                'routeId': currentRouteCopy.routeId,
                'points': points,
            }   
        })
        .then( response => {
            dispatch(set_load({
                isLoad: false
            }))
            getRoutes()
        })
        .catch( err=>{
             console.log(err)
             hideAll()
             dispatch(set_load({
                isLoad: false
            }))
        })
        // var routeCopy = currentRouteCopy
        // routeCopy.points = points
        // dispatch(edit_selected_route({
        //     route: routeCopy
        // }))
        // dispatch(change_route())
    }
    return(
        <React.Fragment>
            {isLoad && <Loader/>}
            {state.hasError && <ErrorLoader errorMessage={state.errorMessage} />}
            <div className="wrapper">
                <a href="map.html" target="_blank"> <button className="map_button">Поиск координат</button></a>
                <Map
                   onclick={setCurrentRoute}
                />

                <TopPanel 
                    RefreshAction = {getRoutes}
                />

                {state.showCenter && <ModalCenter 
                                        route={currentRouteCopy} 
                                        CloseAction={hideAll} 
                                        TargetAction={showSide} />}

                {state.showSide && <SidePanel 
                                        route={currentRouteCopy}  
                                        SaveAction={saveRouteData} 
                                        CloseAction={hideAll} 
                                        DeleteAction={deleteRoute}
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