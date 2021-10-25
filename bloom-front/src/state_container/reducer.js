import { initial_state } from "./initial_state";
import * as CREATORS from './action_creator'
import * as LocalStorage from '../functions/local_storage'
import {getRouteById} from '../functions/routes-manage'

export function app_reducer(state = initial_state, action){
    switch(action.type){
        case CREATORS.SET_LOAD:
            return{
                ...state,
                isLoad: action.params.isLoad
            }

        case CREATORS.SET_ROUTS:
            LocalStorage.setArray('routs', action.params.routs)
            return{
                ...state,
                routs: action.params.routs
            }

        case CREATORS.UNSET_ROUTS:
                LocalStorage.setArray('routs', action.params.routs)
                return{
                    ...state,
                    routs: action.params.routs
                }

        case CREATORS.SELECT_ROUTE:
                LocalStorage.setNumber('selectedRouteId', action.params.selectedRouteId)
                var currentRoute = getRouteById(action.params.selectedRouteId, state.routs)
                return{
                    ...state,
                    selectedRouteId: action.params.selectedRouteId,
                    selectedRouteCopy: currentRoute
                }
        case CREATORS.CHANGE_ROUTE:
            const routs = state.routs
            routs[state.selectedRouteId] = state.selectedRouteCopy
            return{
                ...state,
                routs
            }
        case CREATORS.EDIT_SELECTED_ROUTE:
            return{
                ...state,
                selectedRouteCopy: action.params.route
            }
        default: 
           return state
    }
    
}
export default app_reducer