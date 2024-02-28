// AppHeader.js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { useLogoutMutation } from 'src/slices/usersApiSlice'
import { logout } from '../slices/authSlice'

const AppHeader = () => {
  const sidebarShow = useSelector((state) => state.custom.sidebarShow) // Assuming 'custom' is the key for your reducer
  const userrole = useSelector((state) => state.auth.userInfo?.role) || ''
  const username = useSelector((state) => state.auth.userInfo?.name)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          {/* Other navigation items */}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <h6>Welcome, {username} </h6>
            <h6>Role : {userrole}</h6>
            {/* <p>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={logoutHandler}
                style={{ borderRadius: '30px' }}
              >
                LogOut
              </button>
            </p> */}
            {/* <CNavLink href="#" style={{ fontSize: '25px', color: 'orange' }}>
              {username}
            </CNavLink> */}
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
