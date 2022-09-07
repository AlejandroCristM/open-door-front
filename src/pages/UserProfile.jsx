import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'

export default function UserProfile() {

  const { user } = useAuth0();
  console.log(user);
  return (
    <section>
      UserProfile
    </section>
  )
}
