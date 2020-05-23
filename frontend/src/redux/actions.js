export const INVALIDATE_BIRDS = 'INVALIDATE_SUBREDDIT'
export const REQUEST_BIRDS = 'REQUEST_BIRDS'
export const RECEIVE_BIRDS = 'RECEIVE_BIRDS'
export const REQUEST_HOTSPOTS = 'REQUEST_HOTSPOTS'
export const RECEIVE_HOTSPOTS = 'RECEIVE_HOTSPOTS'

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