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
  // SECONDLY, CREATE ALL THE FIELD DECLARATIONS.
  for (const fieldName in notionFieldnames) {
    notionFields.push({
      name: notionFieldnames[fieldName],
      format: '',
      type: typeTranslationNotionToGeoJson(jsonData.results[0]['properties'][notionFieldnames[fieldName]]),
    });
  }
  //console.log(notionFields);

  // THEN COLLECT THE DATA
  for (const row of jsonData.results) {
    for (const field in notionFields) {
      console.log(notionFields[field]);
      //console.log(row.properties[notionFields[field].name]);
      console.log(extractContentOfNotionField(row.properties[notionFields[field].name]));
    }
  }
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

export function extractContentOfNotionField(jsonContent: { type }): string | string[] {
  if (jsonContent.type == null || jsonContent.type == 'null') {
    return '';
  }
  if (jsonContent.type === 'title') {
    return jsonContent[jsonContent.type][0].plain_text;
  }
  if (jsonContent.type === 'email') {
    return jsonContent[jsonContent.type];
  }
  if (jsonContent.type === 'number') {
    return jsonContent[jsonContent.type];
  }
  if (jsonContent.type === 'url') {
    return jsonContent[jsonContent.type];
  }
  if (jsonContent.type === 'date') {
    return jsonContent[jsonContent.type].start;
  }
  if (jsonContent.type === 'created_time') {
    return jsonContent[jsonContent.type];
  }
  if (jsonContent.type === 'phone_number') {
    return jsonContent[jsonContent.type];
  }
  /* todo : need more examples before integrating this.
  if (jsonContent.type==='rich_text'){
    return jsonContent[jsonContent.type];
  }*/
  // todo need more examples
  if (jsonContent.type === 'select') {
    console.log(jsonContent[jsonContent.type]);
    return 'toto';
  }
  if (jsonContent.type === 'multi_select') {
    const multiSelect: string[] = [];
    for (const field in jsonContent[jsonContent.type]) {
      multiSelect.push(jsonContent[jsonContent.type][field].name);
    }
    return multiSelect;
  }
  return 'toto';
}
