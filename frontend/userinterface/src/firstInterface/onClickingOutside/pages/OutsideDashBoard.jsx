import React from 'react'
import { useAuthActions } from '../../../hooks/useAuth'

const OutsideDashBoard = () => {
  const {handleLogout}= useAuthActions()
  const logout=()=>{
          handleLogout()
        }
  return (
    <div className='dashboard-menu'>
      .
      <div className="profile-image">
        <img src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F54%2F72%2Fd1%2F5472d1b09d3d724228109d381d617326.jpg&sp=1784362005T72e04c5e34e838036b5ba980167d796859e748ee885ca236065d4b4186defbdd" alt="" />
        <h1>name of user </h1>
      </div>
      <div className="options">
        <div className="edit-profile">edit menu</div>
        <div className="orders">orders</div>
        <div className="cart">cart</div>
        <div className="wishlist">wishlist</div>
        <div className="logout" onClick={()=>logout()}>logout</div>

      </div>

    </div>
  )
}

export default OutsideDashBoard