
// import { Avatar, Button, Input } from "@material-tailwind/react";
import { useRef, useState } from "react";
// import AvatarEditor from "react-avatar-editor";
// import { useForm, SubmitHandler, useFormState } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { SlAvatarEditor } fro../../components/SlAvatarEditortor";
// import { eyeIcon, eyeSlashIcon } fro../Logingin";

// interface IAccountInput {
//   newUserName: string;
//   currentPassword: string;
//   newPassword: string;
// }

// export function UserAccount() {
//   let userName = useRef<string>("Vladimir");
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//     control,
//   } = useForm<IAccountInput>();

//   const { dirtyFields } = useFormState({
//     control
//   });

//   const [editAccount, setEditAccount] = useState(false);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [editAvatar, setEditAvatar] = useState(false);
//   const [imgAva, setImgAva] = useState("avatars/5396784_ava.jpg");
//   const navigate = useNavigate();

//   const editor = useRef<AvatarEditor>(null);

//   const onSaveAvatarHandler = async () => {
//     if (editor.current) {
//       // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
//       // drawn on another canvas, or added to the DOM.
//       const canvas = editor.current.getImage();

//       // If you want the image resized to the canvas size (also a HTMLCanvasElement)
//       const canvasScaled = editor.current.getImageScaledToCanvas();

//       console.log(canvasScaled);
//       console.log(canvas);
//     }
//     if (editor.current) {
//       const dataUrl = editor.current.getImage().toDataURL();

//       const result = await fetch(dataUrl);
//       const blob = await result.blob();

//       const imageURL = window.URL.createObjectURL(blob);

//       console.log(imageURL);
//       setImgAva(`${imageURL}`);
//     }
//   };

//   const onSubmit: SubmitHandler<IAccountInput> = (data) => {
//     console.log(data);
//     if (data.newUserName != "") {
//       userName.current = data.newUserName;
//     }
//     setEditAccount(false);
//     setEditAvatar(false);
//     setShowCurrentPassword(false);
//     setShowNewPassword(false);

//     onSaveAvatarHandler();

//     reset();
//   };

//   // let isPasswordChange = useRef(false);
//   // isPasswordChange.current =
//   //   watch("currentPassword") || watch("newPassword") ? true : false;
//   // isPasswordChange.current =
//   //   dirtyFields.currentPassword || dirtyFields.newPassword ? true : false;

//   let isSaveButtonActiv = useRef(false);
//   // isSaveButtonActiv.current =
//   //   editAvatar || isPasswordChange.current || watch("newUserName")
//   //     ? true
//   //     : false;
//   isSaveButtonActiv.current =
//     editAvatar || dirtyFields.currentPassword || dirtyFields.newPassword || dirtyFields.newUserName
//       ? true
//       : false;

//   return (
//     <div className="container mx-auto max-w-sm flex flex-wrap justify-center pt-10">
//       <div>
//         {!editAvatar ? (
//           <>
//             <Avatar
//               className={editAccount ? "cursor-pointer mb-3 mt-3" : "mb-3 mt-3"}
//               src={imgAva}
//               // alt="USER"
//               variant="circular"
//               size="xxl"
//               onClick={() => {
//                 if (editAccount) {
//                   setEditAvatar(true);
//                 }
//               }}
//             />
//             <h2 className="pt-3 pb-3 text-center text-3xl font-medium text-gray-900">
//               {userName.current}
//             </h2>
//           </>
//         ) : (
//           <SlAvatarEditor imageUrl={imgAva} editor={editor} />
//         )}
//       </div>
//       {!editAccount && (
//         <div className="flex justify-between w-80 pt-3 pb-3">
//           <Button
//             size="md"
//             className="w-48 tracking-wider"
//             onClick={() => setEditAccount(true)}
//           >
//             Edit profile
//           </Button>
//           <Button
//             size="md"
//             variant="outlined"
//             className="w-30 tracking-wider"
//             onClick={() => navigate("/")}
//           >
//             Cancel
//           </Button>
//         </div>
//       )}
//       {editAccount && (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {!editAvatar && (
//             <div>
//               <div className="w-80 pt-3 pb-0">
//                 <Input
//                   label="New username"
//                   type="text"
//                   {...register("newUserName", {
//                     maxLength: {
//                       value: 12,
//                       message: "Maximum username length is twelve characters",
//                     },
//                     pattern: {
//                       value: /^[A-Za-zА-Яа-я]+$/i,
//                       message: "Username is not valid",
//                     },
//                   })}
//                 />
//                 {errors.newUserName ? (
//                   <p className=" pt-1 text-xs text-red-900">
//                     {errors.newUserName.message}
//                   </p>
//                 ) : (
//                   <div className=" block h-5"></div>
//                 )}
//               </div>

//               <div className="w-80 pt-3 pb-0">
//                 <Input
//                   label="Current password"
//                   type={showCurrentPassword ? "text" : "password"}
//                   icon={
//                     <div
//                       onClick={() =>
//                         setShowCurrentPassword(!showCurrentPassword)
//                       }
//                     >
//                       {showCurrentPassword ? eyeIcon : eyeSlashIcon}
//                     </div>
//                   }
//                   {...register("currentPassword", {
//                     required: dirtyFields.currentPassword || dirtyFields.newPassword
//                       ? "Current password is required"
//                       : false,
//                   })}
//                 />
//                 {errors.currentPassword ? (
//                   <p className="pt-1 text-xs text-red-900">
//                     {errors.currentPassword.message}
//                   </p>
//                 ) : (
//                   <div className="block h-5"></div>
//                 )}
//               </div>

//               <div className="w-80 pt-3 pb-0">
//                 <Input
//                   label="New password"
//                   type={showNewPassword ? "text" : "password"}
//                   icon={
//                     <div onClick={() => setShowNewPassword(!showNewPassword)}>
//                       {showNewPassword ? eyeIcon : eyeSlashIcon}
//                     </div>
//                   }
//                   {...register("newPassword", {
//                     required: dirtyFields.currentPassword || dirtyFields.newPassword
//                       ? "New password is required"
//                       : false,
//                     minLength: {
//                       value: 5,
//                       message: "Password should be at-least 5 characters.",
//                     },
//                   })}
//                 />
//                 {errors.newPassword ? (
//                   <p className=" pt-1 text-xs text-red-900">
//                     {errors.newPassword.message}
//                   </p>
//                 ) : (
//                   <div className=" block h-5"></div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div
//             className={`flex w-80 pt-3 pb-3 ${
//               isSaveButtonActiv.current ? "justify-between" : "justify-end"
//             }`}
//           >
//             {isSaveButtonActiv.current && (
//               <Button type="submit" size="md" className="w-48 tracking-wider">
//                 Save
//               </Button>
//             )}

//             <Button
//               size="md"
//               variant="outlined"
//               className="w-30 tracking-wider"
//               onClick={() => {
//                 setEditAccount(false);
//                 setShowCurrentPassword(false);
//                 setShowNewPassword(false);
//                 setEditAvatar(false);
//                 reset();
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
