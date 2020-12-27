const apiBase: string = process.env.REACT_APP_API_BASE!;
const apiKey: string = process.env.REACT_APP_API_KEY!;
// const bookPlaceholder: string = process.env.REACT_APP_BOOK_PLACEHOLDER!;
const apiSearchQuery = "?q=";

const getResource = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} +, reсeived ${res.status}`);
  }
  return await res.json();
};

export const getBookData = async (bookId: string) => {
  const url: string = `${apiBase}/${bookId}`;
  const res = await getResource(url);
  return transformActiveBookData(res);
};

export const getBooksData = async (
  searchString: string,
  maxResults: number
) => {
  const params: string = `&startIndex=0&maxResults=${maxResults}&`;
  const url: string = configUrl(
    apiBase,
    apiSearchQuery,
    searchString,
    params,
    apiKey
  );

  const res = await getResource(url);
  return res.items.map(transformSearchData);
};

export const getLiveBooksData = async (searchString: string) => {
  const params: string = "&startIndex=0&maxResults=8&";
  const url = configUrl(apiBase, apiSearchQuery, searchString, params, apiKey);

  const res = await getResource(url);
  return res.items.map(transformLiveData);
};

const configUrl = (...arg: string[]) => arg.reduce((a, c) => a + c);

const transformLiveData = (book: any) => {
  const { volumeInfo, id } = book;
  return {
    id: id,
    title: volumeInfo.title,
    infoLink: (volumeInfo && volumeInfo.infoLink) || null,
  };
};

const transformSearchData = (book: any) => {
  const { volumeInfo, id } = book;
  const { imageLinks, title } = volumeInfo;
  return {
    id: id,
    title: title,
    infoLink: (volumeInfo && volumeInfo.infoLink) || null,
    imageLink: (imageLinks && imageLinks.thumbnail) || null,
  };
};

const transformActiveBookData = (book: any) => {
  const { volumeInfo, id } = book || null;
  const {
    title,
    description,
    publisher,
    infoLink,
    authors,
    publishedDate,
    printedPageCount,
    categories,
    language,
  } = volumeInfo;
  const imageLinkConfig = `https://books.google.com/books/content/images/frontcover/${id}?fife=w400-h600`;

  return {
    title: title || "Unknown",
    publisher: publisher || "Unknown",
    description: description || "See more info by link",
    infoLink: infoLink || "",
    publishedDate: publishedDate || "Unknown",
    pageCount: printedPageCount || "Unknown",
    categories: categories || ["Unknown"],
    authors: authors || ["Unknown"],
    language: language || "Unknown",
    imageLink: imageLinkConfig || null,
  };
};
