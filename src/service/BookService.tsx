const apiBase: string = process.env.REACT_APP_API_BASE!;
const apiKey: string = process.env.REACT_APP_API_KEY!;
const bookPlaceholder: string = process.env.REACT_APP_BOOK_PLACEHOLDER!;

const getResource = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} +, reсeived ${res.status}`);
  }
  return await res.json();
};

export const getBookData = async (bookId: string) => {
  const url: string = configUrl(apiBase, bookId, "&", apiKey);
  const res = await getResource(url);

  const book = res.items.find((item: any) => item.id === bookId);

  return transformActiveBookData(book);
};

export const getBooksData = async (
  searchString: string,
  maxResults: number
) => {
  const params: string = `&startIndex=0&maxResults=${maxResults}&`;
  const url: string = configUrl(apiBase, searchString, params, apiKey);

  const res = await getResource(url);
  return res.items.map(transformSearchData);
};

export const getLiveBooksData = async (searchString: string) => {
  const params: string = "&startIndex=0&maxResults=8&";
  const url = configUrl(apiBase, searchString, params, apiKey);

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
    imageLink: (imageLinks && imageLinks.thumbnail) || bookPlaceholder,
  };
};

const transformActiveBookData = (book: any) => {
  const volumeInfo = book.volumeInfo || null;
  const { imageLinks, title, categories, description, publisher } = volumeInfo;

  return {
    title: title,
    publisher: publisher,
    categories: categories || [],
    description: description || null,
    infoLink: (volumeInfo && volumeInfo.infoLink) || null,
    imageLink: (imageLinks && imageLinks.thumbnail) || bookPlaceholder,
  };
};
