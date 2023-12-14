import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyFormComponent = () => {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    AssetName: '',
    Description: '',
    AssetCategory: '',
    Location: '',
    ManufacturersName: '',
    ManufacturersAddress: '',
    ManufacturersContactNo: '',
    ManufacturersEmail: '',
    ModelNumber: '',
    SerialNumber: '',
    PurchaseDate: '',
    WarrantyStartDate: '',
    WarrantyEndDate: '',
    PurchaseCost: '',
    AcquisitionMethod: '',
    WarrantyProviderManufacturerContact: '',
    WarrantyTermsandConditions: '',
    SupplierVendorInformation: '',
    CurrentOwner: '',
    DepartmentResponsible: '',
    LocationDepartment: '',
    PhysicalLocation: '',
    CurrentStatus: '',
    ExpectedUsefulLife: '',
    DateofLastMaintenance: '',
    DetailsofMaintenanceActivities: '',
    ScheduledMaintenanceDatesandIntervals: '',
    PMDetails: '',
    StartDateofMaintenance: '',
    NextScheduledDate: '',
  })
  const navigate = useNavigate()

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
        ModelNumber,
        SerialNumber,
        PurchaseDate,
        WarrantyStartDate,
        WarrantyEndDate,
        PurchaseCost,
        AcquisitionMethod,
        WarrantyProviderManufacturerContact,
        WarrantyTermsandConditions,
        SupplierVendorInformation,
        CurrentOwner,
        DepartmentResponsible,
        LocationDepartment,
        PhysicalLocation,
        CurrentStatus,
        ExpectedUsefulLife,
        DateofLastMaintenance,
        DetailsofMaintenanceActivities,
        ScheduledMaintenanceDatesandIntervals,
        PMDetails,
        StartDateofMaintenance,
        NextScheduledDate,
      } = formData

      console.log('Asset Name:', AssetName)
      console.log('Description:', Description)
      console.log('Asset Category:', AssetCategory)
      console.log('Location:', Location)
      console.log('Manufacturers Name:', ManufacturersName)
      console.log('Manufacturers Address:', ManufacturersAddress)
      console.log('Manufacturers Contact No:', ManufacturersContactNo)
      console.log('Manufacturers Email:', ManufacturersEmail)
      // ... continue with other fields

      // Your fetch logic here
      const response = await fetch('http://localhost:5000/api/assets', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          AssetName,
          Description,
          AssetCategory,
          Location,
          ManufacturersName,
          ManufacturersAddress,
          ManufacturersContactNo,
          ManufacturersEmail,
          ModelNumber,
          SerialNumber,
          PurchaseDate,
          WarrantyStartDate,
          WarrantyEndDate,
          PurchaseCost,
          AcquisitionMethod,
          WarrantyProviderManufacturerContact,
          WarrantyTermsandConditions,
          SupplierVendorInformation,
          CurrentOwner,
          DepartmentResponsible,
          LocationDepartment,
          PhysicalLocation,
          CurrentStatus,
          ExpectedUsefulLife,
          DateofLastMaintenance,
          DetailsofMaintenanceActivities,
          ScheduledMaintenanceDatesandIntervals,
          PMDetails,
          startDate: StartDateofMaintenance,
          nextDate: NextScheduledDate,
          // Add other form data here as needed
        }),
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

  // Calculate the next scheduled date based on frequency
  const getNextScheduleDate = (startDate, frequency) => {
    let newDate = new Date(startDate)

    switch (frequency.toLowerCase()) {
      case 'daily':
        newDate.setDate(newDate.getDate() + 1)
        break
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7)
        break
      case 'fifteen days':
        newDate.setDate(newDate.getDate() + 15)
        break
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1)
        break
      case 'quarterly':
        newDate.setMonth(newDate.getMonth() + 3)
        break
      case 'half year':
        newDate.setMonth(newDate.getMonth() + 6)
        break
      case 'yearly':
        newDate.setFullYear(newDate.getFullYear() + 1)
        break
      default:
        throw new Error('Unsupported frequency')
    }

    console.log('New Scheduled Date:', newDate)
    return newDate
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
          <div className="col-md-5">
            <label htmlFor="assetName" style={{ marginBottom: '10px' }}>
              Machine Name:
            </label>
            <input
              required
              type="text"
              className="form-control col-sm-6"
              id="assetName"
              onChange={(e) => setFormData({ ...formData, AssetName: e.target.value })}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="description" style={{ marginBottom: '10px' }} className="form-label">
              Description:
            </label>
            <input
              className="form-control col-sm-6"
              required
              id="assetDescription"
              defaultValue={''}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
            />
          </div>
          {/* <div className="col-md-5">
              <label htmlFor="location" className="form-label">
                Location:
              </label>
              <input
                type="text"
                required
                className="form-control col-sm-6"
                id="assetLocation"
                style={{ marginBottom: '10px' }}
                onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
              />
            </div> */}
          <div className="col-md-5">
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
          <div className="col-md-5">
            <label htmlFor="assetCategory" className="form-label">
              Asset Category:
            </label>
            <select
              className="form-control col-sm-6"
              required
              id="assetCategory"
              name="assetCategory"
              style={{ marginBottom: '10px' }}
              onChange={(e) => setFormData({ ...formData, AssetCategory: e.target.value })}
            >
              <option value="">Select an option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
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
