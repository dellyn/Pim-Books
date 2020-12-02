export default class SwapiService {
  _apiBase = "https://www.googleapis.com/books/v1/volumes?q=";
  _apiKey = "AIzaSyCk0s2_fiQKK0hX5PB6pYk8srDqOO6-3Ds";

  getResource = async (url: string) => {
    console.log(url);

    const res = await fetch(url, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} +, reived ${res.status}`);
    }
    return await res.json();
  };
  getSearchBooksData = async (searchString: string) => {
    const params: string = "+inauthor:keyes&";
    const url: string = this._apiBase + searchString + params + this._apiKey;

    const res = await this.getResource(url);
    return res.items.map(this._transformSearchBooksData);
  };
  _transformSearchBooksData = (book: any) => {
    console.log(book.volumeInfo);

    return {
      id: book.id,
      etag: book.etag,
      selfLink: book.selfLink,
      textSnippet: book.searchInfo.textSnippet,
      authors: book.volumeInfo.authors,
      imageLinks: book.volumeInfo.imageLinks.thumbnail,
      title: book.volumeInfo.title,
    };
  };
}
