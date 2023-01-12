import Router from 'next/router'
import React, { useEffect, useState } from 'react'

const isExpired = (token: string) => {
  const jwtRegex = /^(?:[\w-]*\.){2}[\w-]*$/
  if(!jwtRegex.test(token)) return true;

  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf8")
  );

  const clockTimestamp = Math.floor(Date.now() / 1000);
  return clockTimestamp > payload.exp;
}

const useAuth = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const [auth, setAuth] = useState<{isLoggedIn: boolean, isLoading: boolean }>({
    isLoggedIn: false, isLoading: true, 
  })

  useEffect(() => {
    // verifica se tem token armazenado
    if (sessionStorage.getItem("token") === null) {
      setAuth({ isLoading: false, isLoggedIn: false })
      return;
    }

    // verificar se o token está expirado
    if(isExpired(sessionStorage.getItem("token") as string)) {
      setAuth({ isLoading: false, isLoggedIn: false })
      return;
    }

    setAuth({ isLoading: false, isLoggedIn: true })
  }, [])

  const logOff = () => {
    sessionStorage.removeItem("token")
    setAuth({ isLoading: false, isLoggedIn: false })
  }
  
  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || auth.isLoading) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !auth.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && auth.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [auth, redirectIfFound, redirectTo])

  return { auth, logOff }
}

export default useAuth