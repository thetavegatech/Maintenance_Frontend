import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    role: '',
    email: '',
    mobileNO: '',
    password: '',
    plant: '',
  })
  const [address, setAddress] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getuser/${id}`)
      const { name, mobileNO, role, email, password, plant } = response.data
      setUserData({ name, mobileNO, role, email, password, plant })
      setAddress(response.data.role)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:4000/getuser/${id}`, userData)
      // Clear form data after successful update
      setUserData({
        name: '',
        role: '',
        email: '',
        mobileNO: '',
        password: '',
        plant: '',
      })
      // Navigate back to the previous page
      navigate(-1)
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    // <div
    //   className="container-lg"
    //   style={{
    //     border: '2px solid #ccc',
    //     backgroundColor: '',
    //     padding: '20px',
    //     borderRadius: '10px',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //     width: '100%',
    //   }}
    // >
    <div
      className="tab-content1"
      style={{
        border: '2px solid #ccc',
        backgroundColor: '',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '2px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}
    >
      <div>
        <form onSubmit={handleUpdate} style={{ marginLeft: '12%' }}>
          <div className="row g-2">
            <div className="col-md-5">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                required
                className="form-control col-sm-4"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="name">Phone No:</label>
              <input
                type="text"
                required
                className="form-control col-sm-4"
                name="mobileNO"
                id="mobileNO"
                value={userData.mobileNO}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="name">Email:</label>
              <input
                type="text"
                required
                className="form-control col-sm-4"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="name">Role:</label>
              <select
                name="role"
                id="role"
                className="form-select"
                value={userData.role}
                onChange={handleInputChange}
                required
              >
                <option value="">Select User Role</option>
                <option value="admin">Admin</option>
                <option value="production">Production</option>
                <option value="maintenance">Maintenance</option>
                <option value="PremativeMaintenance">Premative Maintenance</option>
              </select>
            </div>
            <div className="col-md-5">
              <label htmlFor="name">Plant:</label>
              {/* <input
                type="text"
                required
                className="form-control col-sm-4"
                name="plant"
                id="plant"
                value={userData.plant}
                onChange={handleInputChange}
              /> */}
              <select
                className="form-control col-sm-6"
                required
                id="plant"
                name="plant"
                style={{ marginBottom: '10px' }}
                value={userData.plant}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Plant 1">Plant 1</option>
                <option value="Plant 2">Plant 2</option>
                <option value="Plant 3">Plant 3</option>
                <option value="Plant 4">Plant 4</option>
              </select>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '30%', marginBottom: '10px' }}
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </div>
  )
}
