import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { manageSharedList, shareWithFriends } from "../../config-var";

interface ListMoreMenuProps {
  isShared: boolean;
  isMyList?: boolean;
  onEditTitleClick?: () => void;
  onDeleteClick: () => void;
  onShareClick?: () => void;
  positionHorisontal: number | "left" | "right" | "center";
}

export function ListMoreMenu({
  isShared,
  isMyList,
  onEditTitleClick,
  onDeleteClick,
  onShareClick,
  positionHorisontal,
}: ListMoreMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditTitleClickHandler = () => {
    setAnchorEl(null);
    onEditTitleClick && onEditTitleClick();
  };

  const onDeleteClickHandler = () => {
    setAnchorEl(null);
    onDeleteClick();
  };

  const onShareHandle = () => {
    setAnchorEl(null);
    onShareClick && onShareClick();
  };

  return (
    <div>
      <IconButton id="more-list-button" onClick={handleClick}>
        <MoreVertIcon color="action" />
      </IconButton>

      <Menu
        id="more-list-menu"
        elevation={5}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: positionHorisontal,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!!onEditTitleClick && isMyList && (
          <MenuItem onClick={onEditTitleClickHandler} disableRipple>
            <EditIcon color="action" sx={{ fontSize: 20, marginRight: 2 }} />
            Edit Title
          </MenuItem>
        )}

        {isShared ? (
          <MenuItem onClick={onShareHandle} disableRipple>
            <ShareIcon color="action" sx={{ fontSize: 20, marginRight: 2 }} />
            {manageSharedList}
          </MenuItem>
        ) : (
          <MenuItem onClick={onShareHandle} disableRipple>
            <ShareIcon color="action" sx={{ fontSize: 20, marginRight: 2 }} />
            {shareWithFriends}
          </MenuItem>
        )}

        {isMyList && <Divider />}
        {isMyList && (
          <MenuItem
            onClick={onDeleteClickHandler}
            disableRipple
            sx={{ color: "#ef5350" }}
          >
            <DeleteIcon
              sx={{
                color: "#ef5350",
                fontSize: 20,
                marginRight: 2,
                position: "relative",
                bottom: "1px",
              }}
            />
            Delete List
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
