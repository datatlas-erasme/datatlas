export const isValidHttpURL = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const isImageURL = (url: string) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
