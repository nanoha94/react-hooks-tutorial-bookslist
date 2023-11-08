import React, { useEffect, useState } from "react";
import { BookDescription } from "../types/Book";

// 検索URLを生成する
const buildSearchUrl = (
  title: string,
  author: string,
  maxResults: number
): string => {
  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = [];

  title && conditions.push(`initile:${title}`);
  author && conditions.push(`inauthor: ${author}`);

  return url + conditions.join("+") + `&maxResults=${maxResults}`;
};

// jsonデータを解析する
const extractBooks = (json: any): BookDescription[] => {
  const items = json.items;
  return items.map((item: any) => {
    const volumeInfo = item.volumeInfo;
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(", ") : "",
      thumbnail: volumeInfo.imageLinks
        ? volumeInfo.imageLinks.smallThumbnail
        : "",
    };
  });
};

const useBookData = (title: string, author: string, maxResults: number) => {
  const [books, setBooks] = useState<BookDescription[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isSearching) {
      const url = buildSearchUrl(title, author, maxResults);
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          return extractBooks(json);
        })
        .then((books) => {
          setBooks(books);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setIsSearching(false);
  }, [isSearching]);

  return [books, setIsSearching];
};

export default useBookData;
