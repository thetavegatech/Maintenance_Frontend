import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '', // Assuming you have an address field in your form
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/UserNo', formData)
      console.log('User created successfully:', response.data)
      navigate(-1)
      // You can handle further actions here, such as displaying a success message or redirecting the user.
    } catch (error) {
      console.error('Error creating user:', error.response.data.error)
      // Handle error cases, such as displaying an error message to the user.
    }
  }

  return (
    <div
      className="container-lg"
      style={{
        border: '2px solid #ccc',
        backgroundColor: '',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '90%',
      }}
    >
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-6">
              <label htmlFor="name">Name:</label>
              <input
                className="form-control col-sm-6"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                className="form-control col-sm-6"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control col-sm-6"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control col-sm-6"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-xs-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm
