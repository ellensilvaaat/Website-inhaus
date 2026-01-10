export function suburbsToGeoJSON(projectsBySuburb) {
  return {
    type: 'FeatureCollection',
    features: projectsBySuburb.map(suburb => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: suburb.coordinates,
      },
      properties: {
        name: suburb.suburb,
        slug: suburb.slug,
        count: suburb.projects.length,
      },
    })),
  }
}
