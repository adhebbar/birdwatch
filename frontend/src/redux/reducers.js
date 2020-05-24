// state design:

// const initialState = {
//   locations: [
//     {
//       lat: 0,
//       lng: 0,
//       radius: 0,
//       lastUpdated: 123123123,
//       birds: {  
//         isFetching: true,
//         didInvalidate: false,
//         items: []
//       },
//       hotSpots: {
//         isFetching: true,
//         didInvalidate: false,
//         items: []
//       }
//     }
//   ]
//   to do: here is where we save the UI stuff map positions/etc!
// }

import { combineReducers } from 'redux'
import _ from 'lodash'
import {
  REQUEST_BIRDS,
  REQUEST_HOTSPOTS,
  RECEIVE_BIRDS,
  RECEIVE_HOTSPOTS,
  SET_CENTER,
  SET_ZOOM
} from './actions'

function center ( state = {lat:0,lng:0}, action)
{
  switch (action.type){
    case SET_CENTER:
      return {lat: action.coordinates.lat, lng: action.coordinates.lng};
    default: 
      return state;
  }
}

function zoom ( state = 500, action)
{
  switch (action.type){
    case SET_ZOOM:
      return action.zoom;
    default: 
      return state;
  }
}


function birds ( 
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_BIRDS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_BIRDS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.birds
      })
    default:
      return state;
  }
}

function locations (state = [], action) { 
  switch (action.type) { 
    case RECEIVE_BIRDS:
      // find matching location from request, add birds
      var newState = state.slice()
      var matchingIndex = _.findIndex(newState,
         function(loc) { 
           return loc.lat == action.coordinates.lat &&
                  loc.lng == action.coordinates.lng &&
                  loc.radius == action.coordinates.radius;
         })
      var newLocation = {
        lat: action.coordinates.lat,
        lng: action.coordinates.lng,
        radius: action.coordinates.radius,
        lastUpdated: Date.now(),
        birds: birds({}, action)
      }
      newState.splice(matchingIndex, 1, newLocation)
      return newState;
    case REQUEST_BIRDS:
      var newState = state.slice()
      var newLocation = {
        lat: action.coordinates.lat,
        lng: action.coordinates.lng,
        radius: action.coordinates.radius,
        lastUpdated: Date.now(),
        birds: birds({}, action)
      }
      newState.splice(0, 0, newLocation)
      return newState;
    default:
      return state;
  }
}

// const rootReducer = locations;
const rootReducer = combineReducers({
  locations: locations, 
  zoom: zoom, 
  center: center
});

export default rootReducer