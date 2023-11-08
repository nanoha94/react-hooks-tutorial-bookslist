import "./App.css";
import Modal from "react-modal";
import { BookDescription, BookToRead } from "./types/Book";
import BookRow from "./components/BookRow";
import Header from "./components/Header";
import { TableContainer, Table, TableBody } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import BookSearchDialog from "./components/BookSearchDialog";

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: "",
  },
];

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const [books, setBooks] = useState<BookToRead[]>(dummyBooks);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id);
    setBooks(newBooks);
  };

  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id ? { ...b, memo: memo } : b;
    });
    setBooks(newBooks);
  };

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: "" };
    const newBooks = [...books, newBook];
    setBooks(newBooks);
    setModalIsOpen(false);
  };

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <Container>
      <Header onClickAddBooks={handleAddClick} />
      <main>
        <TableContainer>
          <Table>
            <TableBody>
              {books.map((book) => (
                <BookRow
                  key={book.id}
                  book={book}
                  onMemoChange={handleBookMemoChange}
                  onDelete={handleBookDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={handleBookAdd} />
      </Modal>
    </Container>
  );
}

export default App;
