import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Contacts from './pages/Contacts'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import auth from './auth'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
    isActive
      ? 'bg-primary/15 text-primary'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }`

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(auth.getUserFromToken())
    const onAuth = () => setUser(auth.getUserFromToken())
    window.addEventListener('authChanged', onAuth)
    return () => window.removeEventListener('authChanged', onAuth)
  }, [])

  const logout = () => {
    auth.removeToken()
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="app-bg min-h-screen text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight no-underline"
          >
            <span className="gradient-text">MyContacts</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            {user && (
              <NavLink to="/contacts" className={navLinkClass}>
                Contacts
              </NavLink>
            )}
            {!user && (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={navLinkClass}>
                  Register
                </NavLink>
              </>
            )}
          </nav>

          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Hi, <span className="font-medium text-foreground">{user.username}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted/80 hover:text-foreground"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        MyContacts — your private address book
      </footer>
    </div>
  )
}
