const apiBase: string = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey: string = "AIzaSyCk0s2_fiQKK0hX5PB6pYk8srDqOO6-3Ds";
const bookPlaceholder: string =
  "data:image/png;base64,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";

const getResource = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} +, reсeived ${res.status}`);
  }
  return await res.json();
};

export const getBooksData = async (
  searchString: string,
  maxResults: number
) => {
  const params: string = `&startIndex=0&maxResults=${maxResults}&`;
  const url: string = configUrl(apiBase, searchString, params, apiKey);

  const res = await getResource(url);
  return res.items.map(transformSearchBooksData);
};

export const getLiveBooksData = async (searchString: string) => {
  const url = configUrl(
    apiBase,
    searchString,
    `&startIndex=0&maxResults=8&`,
    apiKey
  );

  const res = await getResource(url);
  return res.items.map(transformLiveData);
};

const configUrl = (...arg: string[]) =>
  arg.reduce((a: string, c: string) => a + c);

const transformLiveData = (book: any) => {
  const { volumeInfo } = book;
  return {
    title: volumeInfo.title,
    infoLink: (volumeInfo && volumeInfo.infoLink) || "/",
  };
};

const transformSearchBooksData = (book: any) => {
  const { volumeInfo } = book;
  const { imageLinks, title } = volumeInfo;
  return {
    title: title,
    infoLink: (volumeInfo && volumeInfo.infoLink) || "/",
    imageLinks: (imageLinks && imageLinks.thumbnail) || bookPlaceholder,
    // authors: volumeInfo.authors || [""],
  };
};
