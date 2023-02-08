import { useEffect, useRef, useState } from "react";

// interface CommentEditProps {
//   title?: string;
//   editHandler: (el: string) => void;
//   delHandler: () => void;
// }

// export function CommentEdit({
//   title,
//   editHandler,
//   delHandler,
// }: CommentEditProps) {
//   const [value, setValue] = useState(title);

//   const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };

//   let isDel = useRef(false);
//   const submitHandler = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!isDel.current) {
//       if (typeof value === "string") {
//         if (value.trim().length !== 0) {
//           editHandler(value);
//         } else {
//           delHandler()
//         }
//       }
//     }
//   };

//   const inputReference: any = useRef(null);
//   useEffect(() => {
//     inputReference.current.focus();
//   }, []);

//   const onFocusHandler = () => {
//     // console.log("Focus")
//     isDel.current = true;
//     delHandler();
//   };
//   const onClickHandler = () => {
//     // console.log("Click")
//     isDel.current = true;
//     delHandler();
//   };

//   return (
//     <>
//       <div className="fixed top-0 right-0 left-0 bottom-0" />
//       <div className="w-full pb-0  bg-white relative flex flex-nowrap justify-between">
//         <form onSubmit={submitHandler} className="w-full pr-2">
//           <input
//             type="text"
//             ref={inputReference}
//             className="w-full ml-2 pl-2 pr-12 px-2 text-base select-text outline-none"
//             onBlur={(el) => {
//               setTimeout(() => {
//                 submitHandler(el);
//               }, 0);
//             }}
//             value={value}
//             onChange={changeHandler}
//           />
//         </form>
//         <button
//           className="absolute top-0 bottom-1 right-1"
//           onFocus={onFocusHandler}
//           onClick={onClickHandler}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//     </>
//   );
// }
