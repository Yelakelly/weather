export function getPosition(
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  },
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      err => {
        reject(err);
      },
      options,
    );
  });
}
