import React from "react";
import { BookToRead } from "../types/Book";
import {
  IconButton,
  Tooltip,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  book: BookToRead;
  onMemoChange: (id: number, memo: string) => void;
  onDelete: (id: number) => void;
}

const BookRow = ({ book, onMemoChange, onDelete }: Props) => {
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMemoChange(book.id, e.target.value);
  };

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  return (
    <TableRow>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.authors}</TableCell>
      <TableCell>
        <TextField
          variant="outlined"
          size="small"
          multiline
          maxRows={4}
          value={book.memo}
          onChange={handleMemoChange}
        />
      </TableCell>
      <TableCell>
        <Tooltip title="削除">
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
