import React, { useEffect, useRef } from 'react'
import { useAuthActions } from '../../../hooks/useAuth'
import { useAuth } from '../hooks/useDashboard'
import './OutsideDashBoard.css'

const OutsideDashBoard = () => {
  const { handleLogout } = useAuthActions()
  const logout = () => {
    handleLogout()
  }
  const { open, setOpen } = useAuth()
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest('.profile-trigger')
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, setOpen])

  return (
    <div
      ref={dropdownRef}
      className={`profile-dropdown ${open ? 'open' : 'close'}`}
      role="menu"
      aria-label="Profile menu"
      aria-hidden={!open}
    >
      {/* Small arrow pointing up */}
      <div className="dropdown-arrow" />

      {/* Profile section */}
      <div className="dropdown-profile">
        <img
          src="https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA"
          alt="profile"
          className="dropdown-avatar"
        />
        <div className="dropdown-user-info">
          <h3 className="dropdown-user-name">name of user</h3>
          <p className="dropdown-user-email">user@example.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="dropdown-divider" />

      {/* Menu options */}
      <nav className="dropdown-options" role="navigation" aria-label="Profile menu">
        <div className="dropdown-item edit-profile" role="menuitem" tabIndex={open ? 0 : -1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          Edit Profile
        </div>
        <div className="dropdown-item orders" role="menuitem" tabIndex={open ? 0 : -1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          Orders
        </div>
        <div className="dropdown-item cart" role="menuitem" tabIndex={open ? 0 : -1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
          Cart
        </div>
        <div className="dropdown-item wishlist" role="menuitem" tabIndex={open ? 0 : -1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          Wishlist
        </div>

        {/* Divider before logout */}
        <div className="dropdown-divider" />

        <div className="dropdown-item logout" role="menuitem" tabIndex={open ? 0 : -1} onClick={() => logout()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Logout
        </div>
      </nav>
    </div>
  )
}

export default OutsideDashBoard