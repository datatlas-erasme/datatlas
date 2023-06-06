// takes notionJson return GeoJson
export function notion(jsonData: { object: string; results: Array<{ properties: object }> }): {
  fields: Array<{ name; format; type }>;
  rows: string[];
} {
  const notionFieldnames: Array<string> = [];
  const notionFields: Array<{ name; format; type }> = [];
  const rows = [];

  // FIRST, GRAB ALL THE FIELD NAMES.
  for (const row of jsonData.results) {
    const keys = Object.keys(row.properties);
    for (const key in keys) {
      if (!notionFieldnames.includes(keys[key])) {
        notionFieldnames.push(keys[key]);
      }
    }
  }
  // SECONDLY, CREATE ALL THE FIELD DECLARATION.
  for (const fieldName in notionFieldnames) {
    notionFields.push({
      name: notionFieldnames[fieldName],
      format: '',
      type: typeTranslationNotionToGeoJson(jsonData.results[0]['properties'][notionFieldnames[fieldName]]),
    });
  }

  console.log(notionFields);
  /*
  // THEN GRAB THE DATA
  for (const row of jsonData.results) {
    for (const field in notionFields){
      console.log(notionFields[field]);
      console.log(row.properties[notionFields[field]]);
    }
  }*/ /*
  return {
    fields: notionFields,
    rows,
  };*/
  return {
    fields: notionFields,
    rows: [],
  };
}

export function typeTranslationNotionToGeoJson(notionData: object): string {
  // Might be more complete later ?
  if (notionData['type'] === 'number') {
    return 'real';
  }
  return 'string';
}
