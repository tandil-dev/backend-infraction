
import LocationErrorCodes from '~/errors/Location';

export function transformCoordsForGoogle(coordinates) {
  const [long, lat] = coordinates;
  return [lat, long];
}

export function transformCoordsFromGoogle(coordinates) {
  const [lat, long] = coordinates;
  return [long, lat];
}

export function transformLocation(location) {
  if (!Array.isArray(location) || location.length < 2) {
    throw new Error(LocationErrorCodes.INVALID_LOCATION);
  }
  return {
    type: 'point',
    coordinates: transformCoordsFromGoogle(location),
    crs: { type: 'name', properties: { name: 'EPSG:4326' } },
  };
}
