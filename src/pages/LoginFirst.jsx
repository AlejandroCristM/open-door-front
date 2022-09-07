import React from 'react'
import LoginButton from '../components/atoms/LoginButton'

export default function LoginFirst() {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-blue-lt">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Disculpe, aún no se ha logueado
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Lo invitamos a que inicie sesión para poder acceder a esta página o cree su cuenta si aún no la tiene.
          </p>
        </div>
        <LoginButton />
      </div>
    </section>
  )
}
