import React from 'react'
import ButtonAndIcon from "../components/atoms/ButtonAndIcon";
import { AiFillHome } from "react-icons/ai";

export default function UserDataNotFounded() {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-blue-lt">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Disculpe, aún no se ha registrado completamente
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Lo invitamos a terminar su registro para poder acceder a esta página.
          </p>

          <a
            className="flex w-full justify-center"
            rel="noopener noreferrer"
            href="/profile"
          >
            <ButtonAndIcon
              text="Ir a registro"
              icon={<AiFillHome className="h-5 w-5" />}
              otherStyles="bg-orange-lt text-white"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
