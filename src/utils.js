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

export { parseCoordsArray };