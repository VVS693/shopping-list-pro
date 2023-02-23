import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { eyeIcon, eyeSlashIcon } from "../components/icons";
import { fetchUserRegister } from "../store/reducers/actionUserCreators";
import { AlertDialog } from "../components/elements/AlertDialog";
import { IUserLogin } from "../types";

interface IAccountInput {
  userName: string;
  password: string;
  confirmPassword: string;
}

export function UserRegistration() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.userReducer);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<IAccountInput>({
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [isAlertDialogErrorOpen, setAlertDialogErrorOpen] = useState(false);
  const [isAlertDialogSuccessOpen, setAlertDialogSuccessOpen] = useState(false);
  const [alertDialogText, setAlertDialogText] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data: IAccountInput) => {
    
    if (data.password !== data.confirmPassword) {
      setAlertDialogText("Passwords don't match!");
      setAlertDialogErrorOpen(true);
    }
    if (data.password === data.confirmPassword) {
      try {
        const userData: IUserLogin = {
          name: data.userName.trim(),
          password: data.password.trim(),
        };
        const res = await dispatch(fetchUserRegister(userData)).unwrap();

        if (res.token) {
          setAlertDialogText("Registration has been successfully completed!");
          setAlertDialogSuccessOpen(true);
        }
      } catch (err) {
        if (typeof err === "string") {
          setAlertDialogText(err);
          setAlertDialogErrorOpen(true);
        }
      }
    }
    
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    reset();
  };

  const cancelHandler = () => {
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setAlertDialogErrorOpen(false);
    setAlertDialogSuccessOpen(false);
    reset();
    navigate("/login");
  };

  const userApproveModalSuccess = async () => {
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setAlertDialogErrorOpen(false);
    setAlertDialogSuccessOpen(false);
    reset();
    navigate("/mylists");
  };

  return (
    <div className="container mx-auto max-w-sm flex flex-wrap justify-center pt-6">
      <AlertDialog
        isOpen={isAlertDialogErrorOpen}
        text={alertDialogText}
        cancelFunc={cancelHandler}
      />
      <AlertDialog
        isOpen={isAlertDialogSuccessOpen}
        text={alertDialogText}
        okFunc={userApproveModalSuccess}
      />

      <div className="pt-3 pb-3 text-3xl font-medium text-gray-900">
        Sign in
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <div>
            <div className="w-80 pt-3 pb-0">
              <Input
                autoFocus
                label="Username"
                type="text"
                {...register("userName", {
                  required: "Username is required",
                  maxLength: {
                    value: 12,
                    message: "Maximum username length is twelve characters",
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-я0-9]+$/i,
                    message: "Username is not valid",
                  },
                })}
              />
              {errors.userName ? (
                <p className=" pt-1 text-xs text-red-900">
                  {errors.userName.message}
                </p>
              ) : (
                <div className=" block h-5"></div>
              )}
            </div>

            <div className="w-80 pt-3 pb-0">
              <Input
                label="Password"
                type={showCurrentPassword ? "text" : "password"}
                icon={
                  <div
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {!showCurrentPassword ? eyeIcon : eyeSlashIcon}
                  </div>
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password should be at-least 5 characters.",
                  },
                })}
              />
              {!!errors.password &&
              (!!dirtyFields.password || !!dirtyFields.confirmPassword) ? (
                <p className="pt-1 text-xs text-red-900">
                  {errors.password.message}
                </p>
              ) : (
                <div className="block h-5"></div>
              )}
            </div>

            <div className="w-80 pt-3 pb-0">
              <Input
                label="Confirm password"
                type={showNewPassword ? "text" : "password"}
                icon={
                  <div onClick={() => setShowNewPassword(!showNewPassword)}>
                    {!showNewPassword ? eyeIcon : eyeSlashIcon}
                  </div>
                }
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  minLength: {
                    value: 5,
                    message: "Password should be at-least 5 characters.",
                  },
                })}
              />
              {!!errors.confirmPassword &&
              (!!dirtyFields.confirmPassword || !!dirtyFields.password) ? (
                <p className=" pt-1 text-xs text-red-900">
                  {errors.confirmPassword.message}
                </p>
              ) : (
                <div className=" block h-5"></div>
              )}
            </div>
          </div>

          <div className={"flex w-80 pt-3 pb-3 justify-between"}>
            <Button type="submit" size="sm" className="w-48 tracking-wider">
              Submit
            </Button>
            <Button
              size="sm"
              variant="outlined"
              className="w-28 tracking-wider"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </>
      </form>
    </div>
  );
}
