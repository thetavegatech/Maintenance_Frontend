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
    Location: '',
  })
  const navigate = useNavigate()
  const [assetNames, setAssetNames] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [file, setFile] = useState(null)

  const [Image, setImage] = useState('')
  function convertToBse64(e) {
    console.log(e)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result) // base64encoded string
      setImage(reader.result)
    }
    reader.onerror = (err) => {
      console.log(err)
    }
  }

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
      setSuccessMessage('Form submitted successfully!')

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
          Location,
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

      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
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

  // JavaScript
  function uploadFile() {
    const fileInput = document.getElementById('fileInput')
    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append('file', file)

    fetch('https://mms-backend-n2zv.onrender.com/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log(data.message)
      })
      .catch((error) => {
        console.error('Error:', error.message)
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      await axios.post('https://mms-backend-n2zv.onrender.com/upload', formData)

      // File uploaded successfully
      console.log('File uploaded')
    } catch (error) {
      console.error('Error uploading file', error)
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
      {/* Display success message if it exists */}
      {successMessage && (
        <div className="alert alert-success" role="alert" style={{ marginTop: '10px' }}>
          {successMessage}
        </div>
      )}
      {/* <div className="container1" style={{ border: '2px' }}> */}
      <div className="container">
        <form onSubmit={handleSubmit} style={{ marginLeft: '%' }}>
          <div className="row g-3">
            <div className="col-md-5">
              <label htmlFor="assetName">Machine Code:</label>
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
              <label htmlFor="Location">Location:</label>
              <select
                className="form-control col-sm-6"
                required
                id="Location"
                name="Location"
                onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
              >
                <option value="">Select an option</option>
                <option value="AAAPL-27">AAAPL-27</option>
                <option value="AAAPL-29">AAAPL-29</option>
                <option value="AAAPL- 89">AAAPL- 89</option>
                <option value="DPAPL - 236">DPAPL - 236</option>
                <option value=" DPAPL- GN"> DPAPL- GN</option>
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
              <label htmlFor="description">Task Description:</label>
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
            <div className="col-md-5">
              <label htmlFor="attachment">Attachment:</label>
              <input
                type="file"
                id="Image"
                name="Image"
                className="form-control col-sm-6"
                onChange={convertToBse64}
              ></input>
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
