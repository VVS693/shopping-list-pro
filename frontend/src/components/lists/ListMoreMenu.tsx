import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface ListMoreMenuProps {
  isShared: boolean;
  onEditTitleClick?: () => void;
  onDeleteClick: () => void;
  positionHorisontal: number | "left" | "right" | "center"
}

export function ListMoreMenu({
  isShared,
  onEditTitleClick,
  onDeleteClick,
  positionHorisontal
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

  return (
    <div>
      <IconButton
        id="more-list-button"
        onClick={handleClick}
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <MoreVertIcon color="action" />
      </IconButton>

      <StyledMenu
        id="more-list-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",

        }}
        transformOrigin={{
          vertical: "top",
          horizontal: positionHorisontal
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {!!onEditTitleClick && (
          <MenuItem onClick={onEditTitleClickHandler} disableRipple>
            <EditIcon color="action" />
            Edit Title
          </MenuItem>
        )}

        {isShared ? (
          <MenuItem onClick={handleClose} disableRipple>
            <ShareIcon color="action" />
            Manage Shared List
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose} disableRipple>
            <ShareIcon color="action" />
            Share with Friends
          </MenuItem>
        )}

        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={onDeleteClickHandler}
          disableRipple
          sx={{ color: "#ef5350" }}
        >
          <DeleteIcon sx={{ color: "#ef5350" }} />
          Delete List
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
