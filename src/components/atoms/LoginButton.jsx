import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonAndIcon from "./ButtonAndIcon";
import { BiLogIn } from "react-icons/bi";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <ButtonAndIcon
      icon={<BiLogIn className="h-5 w-5" />}
      text="Iniciar sesión"
      otherStyles="bg-orange-lt text-white"
      responsive={true}
      onClick={() => {
        loginWithRedirect();
      }}
    />
  );
}
