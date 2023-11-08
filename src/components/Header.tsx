import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  onClickAddBooks: () => void;
}

const Header = ({ onClickAddBooks }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          読みたい本リスト
        </Typography>
        <Button color="inherit" onClick={onClickAddBooks}>
          本を追加
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
