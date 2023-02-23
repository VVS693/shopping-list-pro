import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
import { animationTimeout } from "../../config-var";

export function Greeting() {
  return (
    <Zoom in={true} timeout={animationTimeout * 2}>
      <div className="fixed h-full w-full max-w-md min-w-[360px]">
        <div className=" absolute flex w-full  bottom-[55%] justify-center">
          <Paper elevation={20} sx={{ p: "56px 16px", width: "80%" }}>
            <div className=" text-center text-2xl font-semibold text-blue-gray-800 animate-bounce">
              Add your first List...
            </div>
          </Paper>
        </div>
      </div>
    </Zoom>
  );
}
