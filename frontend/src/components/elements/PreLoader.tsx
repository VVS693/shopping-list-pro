import Fade from "@mui/material/Fade";
import { animationTimeout } from "../../config-var";
import AutorenewIcon from "@mui/icons-material/Autorenew";

interface IPreLoaderProps {
  isLoaderShow: boolean;
}

export function PreLoader({ isLoaderShow }: IPreLoaderProps) {
  return (
    <div className="container min-w-[360px] mx-auto max-w-md">
      <Fade
        in={isLoaderShow}
        timeout={animationTimeout * 3}
        className="fixed h-full w-full max-w-md min-w-[360px]"
      >
        <div className="absolute flex w-full bottom-[55%] justify-center">
          <div className=" absolute flex w-full  top-1/3 justify-center">
            <AutorenewIcon
              sx={{
                width: "300px",
                height: "300px",
                animation: "spin 1s linear infinite",
              }}
              color="action"
            />
          </div>
        </div>
      </Fade>
    </div>
  );
}
