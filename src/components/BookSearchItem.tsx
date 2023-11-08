import { BookDescription } from "../types/Book";
import { Card, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styled from "@emotion/styled";

interface Props {
  description: BookDescription;
  onBookAdd: (book: BookDescription) => void;
}

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Authors = styled.span`
  font-size: 16px;
  text-align: right;
`;

const Thumbnail = styled.img`
  width: 80%;
  max-height: 250px;
  object-fit: contain;
  margin: 15px auto;
`;

const AddButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const BookSearchItem = ({ description, onBookAdd }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "16px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title>{description.title}</Title>
      <Authors>{description.authors}</Authors>
      {description.thumbnail ? (
        <Thumbnail src={description.thumbnail} alt="" />
      ) : null}
      <AddButtonContainer>
        <Tooltip title="追加">
          <IconButton onClick={() => onBookAdd(description)}>
            <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      </AddButtonContainer>
    </Card>
  );
};

export default BookSearchItem;
