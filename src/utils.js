const parseCoordsArray = (coordsString) => {
  try {
    // coords string always come in from google earth as xml as follows:
    // <coordinates>
    //   -122.0822035425683,37.42228990140251,0 -122.0856545755255,37.42243077405461,0 
    // </coordinates>
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(coordsString, "text/xml");
    const coords = xmlDoc.getElementsByTagName("coordinates")[0].textContent.trim();
    const items = coords.split(' ').map(pair => {
      return pair.split(',').slice(0, 2).map(coord => {
        return parseFloat(coord.trim());
      });
    });
    return items;
  } catch (e) {
    console.error("Error parsing coordinates:", e);
    return [];
  }
}

const parseNearestHikes = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8; // Earth radius miles

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export { parseCoordsArray , parseNearestHikes };