import React from 'react'

function login() {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
  }
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" />
        <label htmlFor="email">Password</label>
        <input type="password" />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}

export default login
