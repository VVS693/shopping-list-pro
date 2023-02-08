import AvatarEditor from "react-avatar-editor";
// import Slider from "@mui/material/Slider";
// import React, { useRef, useState } from "react";
// import { Button } from "@material-tailwind/react";

// interface SlAvatarEditorProps {
//   imageUrl: string;
//   onEditAvatar: (data: FormData) => void;
//   onCancelAvatar: () => void;
// }

// export function SlAvatarEditor({
//   imageUrl,
//   onEditAvatar,
//   onCancelAvatar,
// }: SlAvatarEditorProps) {
  
//   const [zoomValue, setZoomValue] = useState<number | number[]>(20);
//   const [rotatuonValue, setRotationValue] = useState<number | number[]>(0);
//   const [newImage, setNewImage] = useState<string | File>(imageUrl);

//   const editor = useRef<AvatarEditor>(null);
//   const onSaveAvatarHandler = async () => {
//     if (editor.current) {
//       // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
//       // drawn on another canvas, or added to the DOM.
//       // const canvas = editor.current.getImage();
//       // If you want the image resized to the canvas size (also a HTMLCanvasElement)
//       // const canvasScaled = editor.current.getImageScaledToCanvas();

//       const dataUrl = editor.current.getImage().toDataURL("image/jpeg");
//       const result = await fetch(dataUrl);
//       const blob = await result.blob();

//       const formData = new FormData();
//       formData.append("image", blob, `${Date.now()}.jpg`);
//       onEditAvatar(formData);
//       return formData;
//     }
//   };

//   const onZoomChangeValue = (event: Event, newValue: number | number[]) => {
//     setZoomValue(newValue);
//   };

//   const onRotationChangeValue = (event: Event, newValue: number | number[]) => {
//     setRotationValue(newValue);
//   };

//   const uploadClick = useRef<HTMLInputElement>(null);

//   const handleUploadClick = () => {
//     uploadClick.current?.click();
//   };

//   const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewImage(event.target.files![0]);
//   };

//   return (
//     <div>
//       <AvatarEditor
//         ref={editor}
//         image={newImage}
//         width={260}
//         height={260}
//         borderRadius={130}
//         border={30}
//         color={[255, 255, 255, 0.7]} // RGBA
//         scale={typeof zoomValue === "number" ? (zoomValue + 100) / 100 : 1.2}
//         rotate={typeof rotatuonValue === "number" ? rotatuonValue : 0}
//       />

//       <Button
//         onClick={handleUploadClick}
//         type="button"
//         size="md"
//         className="w-80 tracking-wider mt-6"
//       >
//         Upload new image
//         <input
//           ref={uploadClick}
//           hidden
//           type="file"
//           accept="image/*"
//           onChange={handleUploadChange}
//         />
//       </Button>

//       <div className="pt-6 pb-3">
//         <span className=" text-blue-500 text-xl">{`Zoom: ${zoomValue}%`}</span>
//         <Slider
//           size="medium"
//           sx={{
//             color: "#2196f3",
//           }}
//           onChange={onZoomChangeValue}
//           value={zoomValue}
//           min={0}
//           max={200}
//           defaultValue={20}
//           aria-labelledby="zoom"
//           valueLabelDisplay="auto"
//         />
//       </div>
//       <div className="pt-3 pb-3">
//         <span className=" text-blue-500 text-xl">{`Rotation: ${rotatuonValue}°`}</span>
//         <Slider
//           size="medium"
//           sx={{
//             color: "#2196f3",
//           }}
//           onChange={onRotationChangeValue}
//           value={rotatuonValue}
//           min={-180}
//           max={180}
//           defaultValue={0}
//           track={false}
//           aria-labelledby="rotation"
//           valueLabelDisplay="auto"
//         />
//       </div>

//       <div className="flex w-80 pt-3 pb-3 justify-between">
//         <Button
//           size="md"
//           className="w-48 tracking-wider"
//           onClick={onSaveAvatarHandler}
//         >
//           Save
//         </Button>

//         <Button
//           size="md"
//           variant="outlined"
//           className="w-30 tracking-wider"
//           onClick={onCancelAvatar}
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }
