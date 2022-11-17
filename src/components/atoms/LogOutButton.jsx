import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ButtonAndIcon from "./ButtonAndIcon";
import { BiLogOut } from "react-icons/bi";

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <ButtonAndIcon
      icon={<BiLogOut className="h-5 w-5" />}
      text="Cerrar sesión"
      otherStyles="bg-orange-lt text-white"
      responsive={true}
      onClick={() => logout({returnTo:window.location.origin})}
    />
  );
}
