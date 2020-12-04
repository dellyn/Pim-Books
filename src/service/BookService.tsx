export const apiBase: string = "https://www.googleapis.com/books/v1/volumes?q=";
export const apiKey: string = "AIzaSyCk0s2_fiQKK0hX5PB6pYk8srDqOO6-3Ds";

export const getResource = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} +, reсived ${res.status}`);
  }
  return await res.json();
};

const configUrl = (...arg: any) =>
  arg.reduce((a: string, c: string) => a + c, "");

export const getSearchBooksData = async (
  searchString: string,
  maxResults: number,
  startIndex: number
) => {
  const params = `&startIndex=${startIndex}&maxResults=${maxResults}&`;

  const url = configUrl(apiBase, searchString, params, apiKey);

  const res = await getResource(url);
  return res.items.map(transformSearchBooksData);
};

export const getLiveBooksData = async (searchString: string) => {
  const url = configUrl(
    apiBase,
    searchString,
    `&startIndex=0&maxResults=7&`,
    apiKey
  );
  const res = await getResource(url);
  return res.items.map(transformLiveData);
};
export const transformLiveData = (book: any) => {
  return {
    title: book.volumeInfo.title,
  };
};
export const transformSearchBooksData = (book: any) => {
  const { id, etag, searchInfo, selfLink, volumeInfo } = book;
  const { imageLinks, title } = volumeInfo;
  return {
    id: id,
    etag: etag,
    title: title,
    selfLink: selfLink,
    authors: volumeInfo.authors || [""],
    textSnippet: searchInfo && searchInfo.textSnippet,
    imageLinks: (imageLinks && imageLinks.thumbnail) || "/",
  };
};
