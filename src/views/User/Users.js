import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import dlt from '../User/delete.png'
import { CTable, CTableHead, CButton } from '@coreui/react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
<<<<<<< HEAD
// import loadingGif from '../assetTable/loader.gif'
=======
import loadingGif from '../assetTable/loader.gif'
>>>>>>> 949afd1a54e6fbc893a9449452ba44e3c42ced7f

export default function Users() {
  const [usernos, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user data from the server
    axios
      .get('https://mms-backend-n2zv.onrender.com/userInfo')
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
        setLoading(false)
      })
  }, [])

  const deleteData = (id) => {
    // Send DELETE request to the server to delete the user
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://mms-backend-n2zv.onrender.com/UserInfo/${id}`)
        .then((response) => {
          console.log('User deleted successfully:', response.data)
          // Update the user list after deletion
          setUsers(usernos.filter((user) => user._id !== id))
        })
        .catch((error) => {
          console.error('Error deleting user:', error)
        })
    }
  }

  return (
    <div className="container">
      <NavLink to="/userForm">
        <CButton color="info" className="mb-2" style={{ marginTop: '5px' }}>
          Add New
        </CButton>
      </NavLink>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
<<<<<<< HEAD
          <img alt="Loading..." />
=======
          <img src={loadingGif} alt="Loading..." />
>>>>>>> 949afd1a54e6fbc893a9449452ba44e3c42ced7f
          <p>Loading...</p>
        </div>
      ) : (
        <CTable bordered striped hover responsive>
          <CTableHead color="dark">
            <tr>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Phone Number</th>
              <th style={{ textAlign: 'center' }}>Address</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Location</th>
              <th style={{ textAlign: 'center' }}>Edit</th>
              <th style={{ textAlign: 'center' }}>Delete</th>
            </tr>
          </CTableHead>
          <tbody>
            {usernos.map((user) => (
              <tr key={user.phoneNumber}>
                <td style={{ textAlign: 'center' }}>{user.name}</td>
                <td style={{ textAlign: 'center' }}>{user.phoneNumber}</td>
                <td style={{ textAlign: 'center' }}>{user.address}</td>
                <td style={{ textAlign: 'center' }}>{user.email}</td>
                <td style={{ textAlign: 'center' }}>{user.Location}</td>
                <td style={{ textAlign: 'center' }}>
                  <NavLink to={`/editUser/${user._id}`} style={{ color: '#000080' }}>
                    <FaEdit />
                  </NavLink>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn"
                    onClick={() => deleteData(user._id)}
                    style={{ color: 'red' }}
                  >
                    <MdDelete />
                    {/* <img src={dlt} alt="" width={30} height={25} /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </CTable>
      )}
    </div>
  )
}
