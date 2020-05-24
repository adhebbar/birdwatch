export const INVALIDATE_BIRDS = 'INVALIDATE_SUBREDDIT'
export const REQUEST_BIRDS = 'REQUEST_BIRDS'
export const RECEIVE_BIRDS = 'RECEIVE_BIRDS'
export const REQUEST_BIRD_DETAILS = 'REQUEST_BIRD_DETAILS'
export const RECEIVE_BIRD_DETAILS = 'RECEIVE_BIRD_DETAILS'
export const REQUEST_HOTSPOTS = 'REQUEST_HOTSPOTS'
export const RECEIVE_HOTSPOTS = 'RECEIVE_HOTSPOTS'
export const SET_CENTER = 'SET_CENTER'
export const SET_ZOOM = 'SET_ZOOM'


export function invalidateBirds(coordinates) {
  return {
    type: INVALIDATE_BIRDS,
    coordinates
  }
}

function requestBirds(coordinates) {
  return {
    type: REQUEST_BIRDS,
    coordinates
  }
}

function receiveBirds(coordinates, json) {
  return {
    type: RECEIVE_BIRDS,
    coordinates,
    birds: json,
    receivedAt: Date.now()
  }
}

function requestBirdDetails(scientificName) {
  return {
    type: REQUEST_BIRD_DETAILS,
    scientificName
  }
}

function receiveBirdDetails(scientificName, json) {
  return {
    type: RECEIVE_BIRD_DETAILS,
    scientificName,
    birdDetails: json,
    receivedAt: Date.now()
  }
}

function requestHotspots(coordinates) {
  return {
    type: REQUEST_HOTSPOTS,
    coordinates
  }
}
  
function receiveHotspots(coordinates, json) {
  return {
    type: RECEIVE_HOTSPOTS,
    coordinates,
    items: json,
    receivedAt: Date.now()
  }
}

export function setCenter(coordinates) {
  return {
    type: SET_CENTER,
    coordinates
  }
}

export function setZoom(zoom) {
  return {
    type: SET_ZOOM,
    zoom
  }
}

// 'thunk' action creator
export function fetchBirds (coordinates) { 
  return function (dispatch) { 
    dispatch(requestBirds(coordinates));

    var headers = new Headers();
    // to do, put api key into a CONFIG
    headers.append('X-eBirdApiToken', 'dv0ogeeak7mo');

    // to do, put both endpoints into a CONFIG (hotspots,recent obs)
    var url = 'https://api.ebird.org/v2/data/obs/geo/recent';
    url += `?lat=${coordinates.lat}&lng=${coordinates.lng}`;

    console.log(url);
    const request = new Request(url, {
      method: 'GET',
      headers: headers,
    });

    return fetch(request)
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        // console.log(json),
        dispatch(receiveBirds(coordinates, json)),
      )
  }
}

export function fetchBirdDetails (scientificName) { 
  return function (dispatch) { 
    dispatch(requestBirdDetails(scientificName));

    // to do, put both endpoints into a CONFIG (hotspots,recent obs)
    var url = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
    url += encodeURI(scientificName);

    console.log(url);
    const request = new Request(url, {
      method: 'GET',
    });

    return fetch(request)
      .then(
        response => response.json()
        // Do not use catch, because errors occured during rendering
        // should be handled by React Error Boundaries
        // https://reactjs.org/docs/error-boundaries.html
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        // console.log(json),
        dispatch(receiveBirdDetails(scientificName, json))
      )
  }
}

function shouldFetchBirdDetails(state, scientificName) {
  const birdDetails = state.birdDetailsByScientificName[scientificName]
  if (!birdDetails) {
    return true
  } else if (birdDetails.isFetching) {
    return false
  } else {
    return birdDetails.didInvalidate
  }
}

export function fetchBirdDetailsIfNeeded(scientificName) {
  return (dispatch, getState) => {
    if (shouldFetchBirdDetails(getState(), scientificName)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchBirdDetails(scientificName))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}
