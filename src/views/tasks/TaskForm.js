import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyFormComponent = () => {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    AssetName: '',
    ScheduledMaintenanceDatesandIntervals: '',
    // PMDetails: '',
    StartDateofMaintenance: '',
    NextScheduledDate: '',
    TaskName: '',
    TaskDescription: '',
    startDate: '',
    nextDate: '',
    status: 'Pending',
  })
  const navigate = useNavigate()
  const [assetNames, setAssetNames] = useState([])

  useEffect(() => {
    // Fetch asset names when the component mounts
    axios
      .get('https://mms-backend-n2zv.onrender.com/api/assets')
      .then((response) => {
        const names = Array.from(new Set(response.data.map((asset) => asset.AssetName)))
        setAssetNames(names)
      })
      .catch((error) => {
        console.error('Error fetching asset names:', error)
      })
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Destructure form data from the state
      const {
        AssetName,
        Description,
        AssetCategory,
        Location,
        ManufacturersName,
        ManufacturersAddress,
        ManufacturersContactNo,
        ManufacturersEmail,
        ScheduledMaintenanceDatesandIntervals,
        PMDetails,
        StartDateofMaintenance,
        NextScheduledDate,
        TaskName,
        TaskDescription,
        status = 'Pending',
      } = formData

      console.log('Asset Name:', AssetName)
      console.log('Description:', Description)
      console.log('Asset Category:', AssetCategory)
      console.log('Location:', Location)
      console.log('Manufacturers Name:', ManufacturersName)
      console.log('Manufacturers Address:', ManufacturersAddress)
      console.log('Manufacturers Contact No:', ManufacturersContactNo)
      console.log('Manufacturers Email:', ManufacturersEmail)
      console.log('Task Name:', TaskName)
      console.log('status', status)
      console.log(formData)

      // ... continue with other fields

      // Your fetch logic here
      const response = await fetch('https://mms-backend-n2zv.onrender.com/saveAsset', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          AssetName,
          ScheduledMaintenanceDatesandIntervals,
          // PMDetails,
          TaskName,
          TaskDescription,
          startDate: StartDateofMaintenance,
          nextDate: NextScheduledDate,
          // Add other form data here as needed
          status,
        }),
      })
      navigate(-1)

      const data = await response.json()
      console.log('Response from server:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const someFunction = () => {
    const startDate = this.state.StartDateofMaintenance
    const frequency = this.state.ScheduledMaintenanceDatesandIntervals
    const nextDate = this.getNextScheduleDate(startDate, frequency)
    this.setState({ NextScheduledDate: nextDate.toISOString().split('T')[0] })
    console.log(nextDate) // or any other logic you want with nextDate
  }

  // Handle frequency change
  const handleFrequencyChange = (e) => {
    const frequency = e.target.value
    const startDate = formData.StartDateofMaintenance
    const nextDate = getNextScheduleDate(startDate, frequency)
    setFormData({
      ...formData,
      ScheduledMaintenanceDatesandIntervals: frequency,
      NextScheduledDate: nextDate.toISOString().split('T')[0],
    })
  }

  const getNextScheduleDate = (startDate, frequency) => {
    let newDate = new Date(startDate)

    const skipSundays = () => {
      while (newDate.getDay() === 0) {
        newDate.setDate(newDate.getDate() + 1)
      }
    }

    const addWeekdays = (numDays) => {
      let count = 0
      while (count < numDays) {
        newDate.setDate(newDate.getDate() + 1)
        if (newDate.getDay() !== 0) {
          // Count only weekdays (excluding Sundays)
          count++
        }
      }
    }

    switch (frequency.toLowerCase()) {
      case 'daily':
        newDate.setDate(newDate.getDate() + 1)
        skipSundays()
        break
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7)
        skipSundays()
        break
      case 'fifteen days':
        addWeekdays(15)
        break
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1)
        // newDate.setDate(1)
        addWeekdays(4)
        skipSundays()
        break
      case 'quarterly':
        // Move to the first day of the next month
        newDate.setMonth(newDate.getMonth() + 3)
        // newDate.setDate(1)
        addWeekdays(14)
        skipSundays()
        break
      case 'half year':
        newDate.setMonth(newDate.getMonth() + 6)
        // newDate.setDate(1)
        addWeekdays(28)
        skipSundays()
        break
      case 'yearly':
        newDate.setFullYear(newDate.getFullYear() + 1)
        // newDate.setMonth(0)
        // newDate.setDate(1)
        addWeekdays(52)
        skipSundays()
        break
      default:
        throw new Error('Unsupported frequency')
    }

    console.log('New Scheduled Date:', newDate)
    return newDate
  }

  const handleAssetNameChange = (e) => {
    const selectedAssetName = e.target.value
    setFormData({ ...formData, AssetName: selectedAssetName })
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
      {/* <div className="container1" style={{ border: '2px' }}> */}
      <div className="container">
        <form onSubmit={handleSubmit} style={{ marginLeft: '%' }}>
          <div className="row g-3">
            <div className="col-md-5">
              <label htmlFor="assetName">Asset Name:</label>
              <select
                required
                className="form-control col-sm-6"
                id="AssetName"
                onChange={handleAssetNameChange}
                style={{ maxHeight: '50px', overflowY: 'auto' }}
              >
                <option value="">Select an asset</option>
                {assetNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <label htmlFor="taskName">Task Name:</label>
              <input
                type="text"
                required
                className="form-control col-sm-6"
                id="TaskName"
                onChange={(e) => setFormData({ ...formData, TaskName: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="description" className="form-label">
                Task Description:
              </label>
              <input
                className="form-control col-sm-6"
                required
                id="taskDescription"
                defaultValue={''}
                onChange={(e) => setFormData({ ...formData, TaskDescription: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="StartDateofMaintenance">Start From :</label>
              <input
                type="date"
                required
                className="form-control col-sm-6"
                id="StartDateofMaintenance"
                onChange={(e) =>
                  setFormData({ ...formData, StartDateofMaintenance: e.target.value })
                }
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="scheduledMaintenance">
                Scheduled Maintenance Dates and Intervals:
              </label>
              <select
                className="form-control col-sm-6"
                required
                id="scheduledMaintenance"
                name="ScheduledMaintenanceDatesandIntervals"
                onChange={handleFrequencyChange}
              >
                <option value="">Select an option</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="fifteen Days">Fifteen Days</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half Year">Half Year</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="col-md-5">
              <label htmlFor="NextDateofMaintenance">Next Date of Maintenance :</label>
              <input
                type="date"
                required
                className="form-control col-sm-6"
                id="nextScheduledDate"
                value={formData.NextScheduledDate}
                readOnly // to make it non-editable
                onChange={(e) => setFormData({ ...formData, NextScheduledDate: e.target.value })}
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
      {/* </div> */}
    </div>
  )
}

export default MyFormComponent
