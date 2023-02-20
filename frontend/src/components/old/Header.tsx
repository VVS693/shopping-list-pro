import { ReactNode, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../hooks/redux";
// import { UserAvatar } from "../user/UserAvatar";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import Fade from "@mui/material/Fade";
// import Divider from "@mui/material/Divider";
// import { ListLabelMark } from "../lists/ListLabelMark";

// interface HeaderProps {
//   title?: ReactNode
//   isLoading?: boolean;
//   isUserActive?: boolean;
//   created?: {
//     createdAt?: string;
//     timeStyle?: "full" | "long" | "medium" | "short" | undefined;
//     dateStyle?: "full" | "long" | "medium" | "short" | undefined;
//   };

//   updated?: {
//     updatedAt?: string;
//     timeStyle?: "full" | "long" | "medium" | "short" | undefined;
//     dateStyle?: "full" | "long" | "medium" | "short" | undefined;
//   };

//   itemsAmount?: number;
//   isShared?: boolean;
// }

// export function Header({
//   isLoading,
//   title,
//   isUserActive,
//   created,
//   updated,
//   itemsAmount,
//   isShared
// }: HeaderProps) {
//   const navigate = useNavigate();
//   const { user } = useAppSelector((state) => state.userReducer);
//   const [isLoaderShow, setIsLoaderShow] = useState(isLoading);
//   const animationTimeout: number = 750;

//   useEffect(() => {
//     if (!isLoading) {
//       setTimeout(() => setIsLoaderShow(false), animationTimeout);
//     } else {
//       setIsLoaderShow(true);
//     }
//   }, [isLoading]);

//   const bottomUp: string =
//     !!created || !!updated || !!itemsAmount ? "bottom-2" : "";

//   return (
//     <div className="z-50 sticky max-w-md min-w-[360px] top-0 bg-white">
//       <div className="flex  w-full items-center justify-between  py-2 px-6">
//         <div className="min-w-[250px]">
//           <Fade in={!!title} timeout={animationTimeout}>
//             <div
//               className={`relative text-left min-w-[250px] px-1 py-2 text-blue-gray-800 font-bold text-2xl select-none break-words ${bottomUp}`}
//             >
//               {title}
              
//             </div>
//           </Fade>
//           <Fade
//             in={!!created || !!updated || !!itemsAmount}
//             timeout={animationTimeout}
//           >
//             <div>
//               {(!!created || !!updated || !!itemsAmount) && (
//                 <div className="absolute bottom-1">
//                   <ListLabelMark
//                     updated={{
//                       updatedAt: updated?.updatedAt,
//                       timeStyle: updated?.timeStyle,
//                       dateStyle: updated?.dateStyle,
//                     }}
//                     created={{
//                       createdAt: created?.createdAt,
//                       timeStyle: created?.timeStyle,
//                       dateStyle: created?.dateStyle,
//                     }}
//                     itemsAmount={itemsAmount}
//                     isShared={isShared}
//                   />
//                 </div>
//               )}
//             </div>
//           </Fade>
//         </div>

//         <div className="flex w-12 h-12 relative ml-9 items-center">
//           <Fade
//             in={isLoaderShow}
//             timeout={animationTimeout}
//             unmountOnExit
//             className="absolute right-0"
//           >
//             <AutorenewIcon
//               sx={{
//                 width: "48px",
//                 height: "48px",
//                 animation: "spin 1s linear infinite",
//               }}
//               color="action"
//             />
//           </Fade>
//           <Fade
//             in={!isLoaderShow}
//             timeout={animationTimeout}
//             className=" absolute right-0 cursor-pointer"
//             onClick={() => navigate("/useraccount")}
//           >
//             <div>
//               <UserAvatar
//                 isUserActive={isUserActive}
//                 userAvatar={user.avatar}
//                 width={48}
//                 height={48}
//               />
//             </div>
//           </Fade>
//         </div>

//       </div>
//       <Divider/>
//     </div>
//   );

  // return (
  //   <div className="z-50 sticky max-w-md min-w-[375px] top-0 bg-white">
  //     <div className="flex w-full items-center justify-between  pt-2 pb-2 px-4 border-b">
  //       <div className="text-left min-w-[250px] pr-3 text-blue-gray-800 font-bold text-2xl select-none break-words">
  //         {title}
  //       </div>

  //       {isLoaderShow ? (
  //         <Fade in={isLoaderShow}>
  //         <AutorenewIcon
  //           sx={{
  //             width: "40px",
  //             height: "40px",
  //             animation: "spin 1s linear infinite",
  //           }}
  //           color="action"
  //         />
  //         </Fade>
  //       ) : (
  //         <div
  //           className=" cursor-pointer"
  //           onClick={() => navigate("/useraccount")}
  //         >
  //           <UserAvatar isUserActive={isUserActive} userAvatar={user.avatar} />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
// }
