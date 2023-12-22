import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyFormComponent = () => {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    AssetName: '',
    MachineNo: '',
    SrNo: '',
    MachineType: '',
    Make: '',
    Controller: '',
    PowerRatting: '',
    CapecitySpindle: '',
    AxisTravels: '',
    Ranking: '',
    InstallationDate: '',
    Location: '',
  })
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Destructure form data from the state
      const {
        AssetName,
        MachineNo,
        SrNo,
        MachineType,
        Make,
        Controller,
        PowerRatting,
        CapecitySpindle,
        AxisTravels,
        Ranking,
        Location,
        InstallationDate,
      } = formData

      console.log('Asset Name:', AssetName)
      console.log('MachineNo:', MachineNo)
      console.log('SrNo:', SrNo)
      console.log('Location:', Location)
      console.log('MachineType:', MachineType)
      console.log('Make:', Make)
      console.log('Controller:', Controller)
      console.log('PowerRatting:', PowerRatting)
      // ... continue with other fields

      // Your fetch logic here
      const response = await fetch('https://mms-backend-n2zv.onrender.com/api/assets', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formData),
      })
      navigate(-1)

      const data = await response.json()
      console.log('Response from server:', data)
    } catch (error) {
      console.error('Error:', error)
      // navigate(-1)
    }
  }

  // Handle changes in form inputs
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }

  // Calculate the next scheduled date based on frequency
  // const getNextScheduleDate = (startDate, frequency) => {
  //   let newDate = new Date(startDate)

  //   switch (frequency.toLowerCase()) {
  //     case 'daily':
  //       newDate.setDate(newDate.getDate() + 1)
  //       break
  //     case 'weekly':
  //       newDate.setDate(newDate.getDate() + 7)
  //       break
  //     case 'fifteen days':
  //       newDate.setDate(newDate.getDate() + 15)
  //       break
  //     case 'monthly':
  //       newDate.setMonth(newDate.getMonth() + 1)
  //       break
  //     case 'quarterly':
  //       newDate.setMonth(newDate.getMonth() + 3)
  //       break
  //     case 'half year':
  //       newDate.setMonth(newDate.getMonth() + 6)
  //       break
  //     case 'yearly':
  //       newDate.setFullYear(newDate.getFullYear() + 1)
  //       break
  //     default:
  //       throw new Error('Unsupported frequency')
  //   }

  //   console.log('New Scheduled Date:', newDate)
  //   return newDate
  // }

  return (
    // <div
    //   className="container-lg"
    //   style={{
    //     border: '2px solid #ccc',
    //     backgroundColor: '',
    //     padding: '20px',
    //     borderRadius: '10px',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //     height: '50%',
    //     width: '80%',
    //   }}
    // >
    <div
      className="container"
      style={{
        border: '1px solid #ccc',
        padding: '5px',
        backgroundColor: '',
        borderRadius: '10px',
        boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.1)',
        height: '50%',
        width: '80%',
      }}
    >
      <form onSubmit={handleSubmit} style={{ margin: '3%' }}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="assetName" style={{ marginBottom: '10px' }}>
              Machine Name:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="assetName"
              // value={''}
              onChange={(e) => setFormData({ ...formData, AssetName: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="machineNo" style={{ marginBottom: '10px' }} className="form-label">
              Machine No:
            </label>
            <input
              className="form-control col-sm-6"
              required
              type="number"
              id="MachineNo"
              value={formData.MachineNo}
              // value={''}
              onChange={(e) => setFormData({ ...formData, MachineNo: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="srno" style={{ marginBottom: '10px' }}>
              Sr No:
            </label>
            <input
              required
              type="number"
              className="form-control col-sm-6"
              id="srno"
              onChange={(e) => setFormData({ ...formData, SrNo: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="assetmachinetype" style={{ marginBottom: '10px' }}>
              Machine Type:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="assetmachinetype"
              onChange={(e) => setFormData({ ...formData, MachineType: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="make" style={{ marginBottom: '10px' }}>
              Make:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="make"
              onChange={(e) => setFormData({ ...formData, Make: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="controller" style={{ marginBottom: '10px' }}>
              Controller:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="controller"
              onChange={(e) => setFormData({ ...formData, Controller: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="powerRatting" style={{ marginBottom: '10px' }}>
              Power Ratting:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="powerRatting"
              onChange={(e) => setFormData({ ...formData, PowerRatting: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="capecitySpindle" style={{ marginBottom: '10px' }}>
              Capecity Spindle:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="capecitySpindle"
              onChange={(e) => setFormData({ ...formData, CapecitySpindle: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="axistravels" style={{ marginBottom: '10px' }}>
              Axis Travels:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="axistravels"
              onChange={(e) => setFormData({ ...formData, AxisTravels: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="assetLocation" className="form-label">
              Location:
            </label>
            <select
              className="form-control col-sm-6"
              required
              id="assetLocation"
              name="assetLocation"
              style={{ marginBottom: '10px' }}
              onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
            >
              <option value="">Select an option</option>
              <option value="Plant 1">Plant 1</option>
              <option value="Plant 2">Plant 2</option>
              <option value="Plant 3">Plant 3</option>
              <option value="Plant 4">Plant 4</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="ranking" className="form-label">
              Ranking:
            </label>
            <select
              className="form-control col-sm-6"
              required
              id="ranking"
              name="ranking"
              style={{ marginBottom: '10px' }}
              onChange={(e) => setFormData({ ...formData, Ranking: e.target.value })}
            >
              <option value="">Select an option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="installationDate" style={{ marginBottom: '10px' }}>
              Insatallation Date:
            </label>
            <input
              required
              type="date"
              className="form-control col-sm-6"
              id="installationDate"
              onChange={(e) => setFormData({ ...formData, InsatllationDate: e.target.value })}
            />
          </div>
          <div className="col-xs-12">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                marginTop: '20px',
                marginBottom: '10px',
                fontSize: '16px',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#009bff')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    // </div>
  )
}

export default MyFormComponent
