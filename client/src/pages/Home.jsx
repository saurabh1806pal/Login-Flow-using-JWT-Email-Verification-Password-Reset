import React, { useContext } from 'react'
import { AppContext } from '../context/Context';

const Home = () => {
  const { userData } = useContext(AppContext);
  return (
    <>
    <div>{userData ? `Hello, ${userData.firstname} ${userData.lastname}!` : "Hello, Guest!"}</div>
    <div>{userData ? `Email: ${userData.email}` : null}</div>
    <div>{userData ? `Username: ${userData.username}` : null}</div>
    <div>{userData ? `Verified: ${userData.isAccountVerified ? "Yes" : "No"}` : null}</div>
    </>
  )
}

export default Home