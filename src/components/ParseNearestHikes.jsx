import HikeList from "./HikeList";

navigator.geolocation.getCurrentPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
});

hikes = HikeList.hikes;

let nearestHikes = [];

hikes.forEach((hike) => {
  distance = Math.sqrt(
    Math.pow(hike.location.latitude - position.coords.latitude, 2) +
      Math.pow(hike.location.longitude - position.coords.longitude, 2)
  );

  nearestHikes.push({ hike: hike, distance: distance });
});

nearestHikes.sort((a, b) => {
  return a.distance - b.distance;
});

return nearestHikes;