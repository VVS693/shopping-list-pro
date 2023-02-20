import Divider from "@mui/material/Divider";
// import Paper from "@mui/material/Paper";
// import ListItem from "@mui/material/ListItem";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemText from "@mui/material/ListItemText";
// import Check from "@mui/icons-material/Check";
// import { IOSSwitch } from "./IOSSwitch";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import { UserAvatar } from "../user/UserAvatar";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { editList, setCurrentList, setIsShareUsersMenuOpen } from "../../store/reducers/listsSlice";
// import { TransitionGroup } from "react-transition-group";
// import Collapse from "@mui/material/Collapse";
// import Checkbox from "@mui/material/Checkbox";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import { useState } from "react";
// import { IListItem, IUserSharing } from "../../types";
// import { fetchEditList } from "../../store/reducers/actionsListsCreators";

// interface ShareUsersMenuProps {
//   title: string;
// }

// export function ShareUsersMenu() {
//   const dispatch = useAppDispatch();
//   const { user, users } = useAppSelector((state) => state.userReducer);
//   const { currentList } = useAppSelector((state) => state.listsReducer);
//   const [isViewOnly, setIsViewOnly] = useState(false);
//   const [isCanAddPeople, setIsCanAddPeople] = useState(true);
//   const [checked, setChecked] = useState<IUserSharing[]>([]);

//   const onApplyClickHandle = () => {
//     if (checked.length !== 0) {
//     checked.forEach((el) => {
//       el.isViewOnly = isViewOnly;
//       el.isCanAddPeople = isCanAddPeople;
//     });
//     const listData: IListItem = structuredClone(currentList);
//     listData.usersSharing = checked
//     dispatch(fetchEditList(listData))
//     dispatch(setCurrentList(listData))}
//     dispatch(setIsShareUsersMenuOpen());
//   };

  

//   const handleToggle = (value: string) => () => {
//     const currentIndex = checked.findIndex((el) => el.id === value);
//     const newChecked = [...checked];
//     if (currentIndex === -1) {
//       newChecked.push({ id: value });
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }
//     setChecked(newChecked);
//   };

//   return (
//     <Paper
//       className="max-w-md min-w-[360px]  pb-6"
//       elevation={12}
//       sx={{ height: "calc(100vh - 72px)" }}
//     >
//       {/* <div className="fixed top-0 right-0 left-0 bottom-0" /> */}

//       <MenuList>
//         <MenuItem onClick={() => setIsViewOnly(false)}>
//           <ListItemText>Can make changes</ListItemText>
//           {!isViewOnly && <Check color="warning" />}
//         </MenuItem>

//         <MenuItem onClick={() => setIsViewOnly(true)}>
//           <ListItemText>View only</ListItemText>
//           {isViewOnly && <Check color="warning" />}
//         </MenuItem>

//         <Divider />

//         <ListItem sx={{ paddingTop: 0 }}>
//           <ListItemText>Can add people</ListItemText>
//           <IOSSwitch
//             checked={isCanAddPeople}
//             onChange={() => setIsCanAddPeople(!isCanAddPeople)}
//           />
//         </ListItem>

//         <Divider />

//         <List
//           sx={{
//             width: "100%",
//             position: "relative",
//             overflow: "auto",
//             maxHeight: "calc(100vh - 316px)",
//           }}
//         >
//           <TransitionGroup>
//             {users.map((el) => {
//               if (el._id !== currentList.userOwner)
//               return (
//               <Collapse
//                 key={el._id}
//                 timeout={{
//                   appear: 750,
//                   enter: 750,
//                   exit: 750,
//                 }}
//               >
//                 <ListItem disablePadding>
//                   <ListItemButton onClick={handleToggle(el._id)}>
//                     <UserAvatar
//                       isUserActive={false}
//                       userAvatar={el.avatar}
//                       // width={28}
//                       // height={28}
//                     />
//                     <ListItemText
//                       sx={{ paddingX: "16px", wordBreak: "break-all" }}
//                     >
//                       {el.name}
//                     </ListItemText>

//                     <Checkbox
//                       edge="end"
//                       checked={checked.findIndex((e) => e.id === el._id) !== -1}
//                       className="relative right-1"
//                       color="warning"
//                       disableRipple
//                     />
//                     {/* <Check color="warning" /> */}
//                   </ListItemButton>
//                 </ListItem>
//               </Collapse>
//             )}
            
            
//             )}
//           </TransitionGroup>
//         </List>

//         <Divider />
//       </MenuList>
//       <div className="max-w-md min-w-[360px] w-full absolute bottom-6">
//         <ListItemButton autoFocus selected onClick={onApplyClickHandle}>
//           <ListItemText
//             sx={{
//               paddingX: "16px",
//               textAlign: "center",
//               fontSize: "30px",
//               color: "#ed6c02",
//             }}
//           >
//             APPLY
//           </ListItemText>
//         </ListItemButton>
//       </div>
//     </Paper>
//   );
// }
