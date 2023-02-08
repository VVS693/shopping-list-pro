import { useEffect, useRef, useState } from "react";
// import { CheckBox } from "./Checkbox";
// import TextField from "@mui/material/TextField";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
// import { animateScroll } from "react-scroll";

// interface AddItemProps {
//   onAdd: (value: string) => void;
// }

// export function AddItem({ onAdd }: AddItemProps) {
//   const [value, setValue] = useState("");
//   const [isAddFormVisible, setIsAddFormVisible] = useState(false);

//   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };

//   const submitHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsAddFormVisible(false);

//     animateScroll.scrollToBottom({
//       duration: 750,
//       smooth: "easeInQuad",
//     });

//     if (value.trim().length === 0) {
//       return setIsAddFormVisible(false);
//     }
//     onAdd(value.trim());
//     setValue("");
//   };

//   const addClickHandler = () => {
//     animateScroll.scrollToBottom({
//       duration: 750,
//       smooth: "easeInQuad",
//     });
//     setIsAddFormVisible(true);
//   };

//   return (
//     <>
//       {!isAddFormVisible ? (
//         <>
//           <div className="py-3 w-full h-14" />
//           <div className="flex w-full justify-end">
//             <div className=" fixed bottom-20 max-w-md h-14 px-3 py-2">
//               <Fab size="small" onClick={addClickHandler}>
//                 <AddIcon className=" text-blue-gray-800" />
//               </Fab>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="flex w-full px-4 items-center">
//             <CheckBox isCompleted={false} onChangeCheckBox={() => {}} />
//             <div className="fixed top-0 right-0 left-0 bottom-0" />
//             <div className="w-full py-[2px] bg-white flex flex-nowrap items-center justify-between">
//               <form onSubmit={submitHandler} className="w-full items-end">
//                 <TextField
//                   id="edit-input"
//                   variant="standard"
//                   multiline
//                   maxRows={10}
//                   sx={{
//                     pl: "16px",
//                     pr: "8px",
//                     pt: "6px",
//                     pb: "5px",
//                     width: "100%",
//                   }}
//                   placeholder="Add element..."
//                   autoFocus
//                   value={value}
//                   onChange={changeHandler}
//                   onBlur={submitHandler}
//                   onKeyDown={(el) => {
//                     el.code === "Enter" && el.preventDefault();
//                     setTimeout(() => {
//                       el.code === "Enter" && submitHandler(el);
//                     }, 0);
//                   }}
//                   InputProps={{
//                     disableUnderline: true,
//                     style: {
//                       fontSize: "20px",
//                       lineHeight: "28px",
//                       letterSpacing: 0,
//                     },
//                   }}
//                 />
//               </form>
//             </div>
//           </div>
//           <div className="w-full" />
//         </>
//       )}
//     </>
//   );
// }
