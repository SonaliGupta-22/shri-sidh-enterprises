import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// A tiny router: real addresses like /products, no extra library. Netlify serves index.html for every path (see public/_redirects).
const RouterCtx = createContext(null)
const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'

// Category chosen on the home page (orbit badges) that the Products page should open with.
export const pending = { category: null }

const TITLES = {
  '/': 'Shri Sidh Enterprises | Peetal Bartan & Utensils, Kotla Kangra',
  '/products': 'Products | Shri Sidh Enterprises, Kotla Kangra',
  '/products/range': 'Full Range of Kitchen Items | Shri Sidh Enterprises',
  '/offers': 'Festival Offers & Gift Ideas | Shri Sidh Enterprises',
  '/about': 'About, How to Order & FAQ | Shri Sidh Enterprises',
  '/contact': 'Contact & Directions | Shri Sidh Enterprises, Kotla Kangra',
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => norm(window.location.pathname))

  useEffect(() => {
    const onPop = () => setPath(norm(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title = TITLES[path] ?? TITLES['/']
  }, [path])

  const navigate = useCallback((to) => {
    const next = norm(to)
    if (next !== norm(window.location.pathname)) {
      window.history.pushState({}, '', next)
      setPath(next)
    }
    window.scrollTo(0, 0)
  }, [])

  return <RouterCtx.Provider value={{ path, navigate }}>{children}</RouterCtx.Provider>
}

export const useRoute = () => useContext(RouterCtx)

// Works like <a>, but changes the page without a full reload. Ctrl/Cmd-click still opens a new tab.
export function Link({ to, onClick, children, ...rest }) {
  const { path, navigate } = useRoute()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} onClick={handle} aria-current={path === norm(to) ? 'page' : undefined} {...rest}>
      {children}
    </a>
  )
}
