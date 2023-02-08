import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AlertDialog } from "../components/elements/AlertDialog";
import { eyeIcon, eyeSlashIcon } from "../components/icons";
import { useAppDispatch } from "../hooks/redux";
import { fetchUserLogin } from "../store/reducers/actionUserCreators";

interface ILoginInput {
  name: string;
  password: string;
}

export function Login() {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogText, setAlertDialogText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginInput>();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const sendData: ILoginInput = {
        name: data.name.trim(),
        password: data.password.trim(),
      };
      const dataUser = await dispatch(fetchUserLogin(sendData)).unwrap();
      if (dataUser.token) {
        window.localStorage.setItem("token", dataUser.token);
      }
    } catch (error) {
      setAlertDialogOpen(true);
      setAlertDialogText("Login or password is incorrect...");
    }
  };
  const okFuncHandler = () => {
    setAlertDialogOpen(false);
    reset();
  };

  return (
    <div className="container mx-auto max-w-sm flex flex-wrap justify-center pt-6">
      <h2 className="pt-3 pb-3 text-3xl font-medium text-gray-900">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-80 pt-3 pb-0">
          <Input
            label="Username*"
            type="text"
            autoFocus
            {...register("name", {
              required: "Login is required",
            })}
          />
          {errors.name ? (
            <p className=" pt-1 text-xs text-red-900">{errors.name.message}</p>
          ) : (
            <div className=" block h-5"></div>
          )}
        </div>

        <div className="w-80 pt-3 pb-0">
          <Input
            label="Password*"
            type={showPassword ? "text" : "password"}
            icon={
              <div onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? eyeIcon : eyeSlashIcon}
              </div>
            }
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password ? (
            <p className="pt-1 text-xs text-red-900">
              {errors.password.message}
            </p>
          ) : (
            <div className="block h-5"></div>
          )}
        </div>
        <div className="text-center pt-3 pb-3">
          <Button type="submit" size="sm" className="w-80 tracking-wider">
            SUBMIT
          </Button>
        </div>
      </form>

      <AlertDialog
        isOpen={isAlertDialogOpen}
        text={alertDialogText}
        okFunc={okFuncHandler}
      />
    </div>
  );
}
