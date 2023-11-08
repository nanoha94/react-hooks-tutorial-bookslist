import { useState, useEffect, useRef } from "react";
import { BookDescription } from "../types/Book";
import BookSearchItem from "./BookSearchItem";
import { Button, Input } from "@mui/material";
import styled from "@emotion/styled";

interface Props {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
}

const Container = styled.div`
  min-width: 80vw;
  max-width: 80vw;
  min-height: 80vh;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputArea = styled.div`
  padding: 20px;
  min-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Results = styled.div`
  padding: 30px;
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  background-color: #efefef;
`;

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

const BookSearchDialog = ({ maxResults, onBookAdd }: Props) => {
  const [books, setBooks] = useState<BookDescription[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleBookAdd = (book: BookDescription) => {
    onBookAdd(book);
  };

  const handleSearchClick = () => {
    if (!titleRef.current!.value && !authorRef.current!.value) {
      alert("条件を入力してください");
      return;
    }
    // 検索実行
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      const url = buildSearchUrl(
        titleRef.current!.value,
        authorRef.current!.value,
        maxResults
      );
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

  return (
    <Container>
      <SearchArea>
        <InputArea>
          <Input inputRef={titleRef} type="text" placeholder="タイトルで検索" />
          <Input ref={authorRef} type="text" placeholder="著者名で検索" />
        </InputArea>
        <Button variant="contained" onClick={handleSearchClick}>
          検索
        </Button>
      </SearchArea>
      {books.length > 0 && (
        <Results>
          {books.map((book, idx) => (
            <BookSearchItem
              key={idx}
              description={book}
              onBookAdd={(book) => handleBookAdd(book)}
            />
          ))}
        </Results>
      )}
    </Container>
  );
};

export default BookSearchDialog;
