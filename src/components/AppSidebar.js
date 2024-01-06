import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/logo.svg'
import {
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'

import { CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// Sidebar navigation config
import navigation from '../_nav'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from 'src/slices/usersApiSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.custom.sidebarUnfoldable) // Update 'custom' based on your actual reducer key
  const sidebarShow = useSelector((state) => state.custom.sidebarShow) // Update 'custom' based on your actual reducer key
  const userrole = useSelector((state) => state.auth.userInfo?.role)

  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    // Show a confirmation dialog
    const confirmLogout = window.confirm('Are you sure you want to logout?')

    // If the user clicks "OK", proceed with logout
    if (confirmLogout) {
      try {
        // Your logout API call and logic
        await logoutApiCall().unwrap()
        // Dispatch the logout action
        dispatch(logout())
        // Navigate to the login page
        navigate('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    } else {
      // If the user clicks "Cancel", do nothing or handle accordingly
      console.log('Logout canceled')
    }
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-md-none">
        <img src={logo} className="logo1" alt="Before Logo" style={{ height: '45px' }} />
        <h4 style={{ fontSize: '25px', color: 'orange' }}>Thetavega Tech</h4>
      </CSidebarBrand>
      <CSidebarBrand className="d-none d-md-flex">
        <img
          src={logo}
          className="logo1"
          alt="Before Logo"
          style={{ marginRight: '20px', height: '45px', marginLeft: '-10%' }}
        />
        <h4 style={{ fontSize: '25px', color: 'orange' }}>Thetavega Tech</h4>
      </CSidebarBrand>
      <CSidebarNav>
        {(() => {
          if (userrole === 'admin') {
            return (
              <>
                <CNavItem component={NavLink} to="/dashboard">
                  <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                  Dashboard
                </CNavItem>
                <CNavItem component={NavLink} to="/assetTable">
                  <CIcon customClassName="nav-icon" icon={cilCalculator} />
                  AssetTable
                </CNavItem>
                <CNavItem component={NavLink} to="/production">
                  <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                  Production
                </CNavItem>
                <CNavItem component={NavLink} to="/breakdown">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  Breakdown
                </CNavItem>
                <CNavItem component={NavLink} to="/breakdownHistory">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  Breakdown History
                </CNavItem>
                {/* <CNavItem component={NavLink} to="/taskTable">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  PM Schedule
                </CNavItem> */}
                <CNavItem component={NavLink} to="/pmSchedule">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  PM Schedule
                </CNavItem>
                <CNavItem component={NavLink} to="/users">
                  <CIcon customClassName="nav-icon" icon={cilNotes} />
                  Users
                </CNavItem>
              </>
            )
          } else if (userrole === 'production') {
            return (
              <>
                <CNavItem component={NavLink} to="/production">
                  <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                  Production
                </CNavItem>
              </>
            )
          } else if (userrole === 'maintenance') {
            return (
              <>
                <CNavItem component={NavLink} to="/breakdown">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  Breakdown
                </CNavItem>
                <CNavItem component={NavLink} to="/breakdownHistory">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  Breakdown History
                </CNavItem>
                <CNavItem component={NavLink} to="/taskTable">
                  <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                  PM Schedule
                </CNavItem>
              </>
            )
          } else {
            return
            ;<></>
          }
        })()}
      </CSidebarNav>
      <button type="button" className="btn btn-info" onClick={logoutHandler}>
        {' '}
        Logout
      </button>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
