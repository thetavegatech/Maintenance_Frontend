import React, { useEffect, useState } from 'react'
// import editForm from './css/editform.css';
// import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function EditForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [AssetName, setAssetName] = useState('')
  const [Description, setDescription] = useState('')
  const [AssetCategory, setAssetCategory] = useState('') // Default to false
  const [Location, setLocation] = useState('') // Default to false
  const [ManufacturersName, setManufacturersName] = useState('')
  const [ManufacturersAddress, setManufacturersAddress] = useState('')
  const [ManufacturersContactNo, setManufacturersContactNo] = useState('')
  const [SupplierVendorInformation, setSupplierVendorInformation] = useState('')
  const [CurrentOwner, setCurrentOwner] = useState('')
  const [DepartmentResponsible, setDepartmentResponsible] = useState('')
  const [LocationDepartment, setLocationDepartment] = useState('')
  const [PhysicalLocation, setPhysicalLocation] = useState('')
  const [CurrentStatus, setCurrentStatus] = useState('')
  const [ExpectedUsefulLife, setExpectedUsefulLife] = useState('')
  const [DateofLastMaintenance, setDateofLastMaintenance] = useState('')
  const [DetailsofMaintenanceActivities, setDetailsofMaintenanceActivities] = useState('')
  const [ScheduledMaintenanceDatesandIntervals, setScheduledMaintenanceDatesandIntervals] =
    useState('')
  const [ManufacturersEmail, seManufacturersEmail] = useState('')
  const [ModelNumber, setModelNumber] = useState('')
  const [SerialNumber, setSerialNumber] = useState('')
  const [PurchaseCost, setPurchaseCost] = useState('')
  const [PurchaseDate, setPurchaseDate] = useState('')
  const [WarrantyStartDate, setWarrantyStartDate] = useState('')
  const [WarrantyEndDate, seWarrantyEndDate] = useState('')
  const [AcquisitionMethod, setAcquisitionMethod] = useState('')
  const [WarrantyProviderManufacturerContact, setWarrantyProviderManufacturerContact] = useState('')
  const [WarrantyTermsandConditions, setWarrantyTermsandConditions] = useState('')
  const [PMDetails, setPMDetails] = useState('')

  const [StartDateofMaintenance, setStartDateofMaintenance] = useState('') // assuming you need this
  // const [ScheduledMaintenanceDatesandIntervals, setScheduledMaintenanceDatesandIntervals] = useState('');
  const [nextScheduledDate, setNextScheduledDate] = useState('')

  const handleFrequencyChange = (e) => {
    const frequency = e.target.value
    const startDate = StartDateofMaintenance
    const newDate = getNextScheduleDate(startDate, frequency)
    setScheduledMaintenanceDatesandIntervals(frequency)
    setNextScheduledDate(newDate.toISOString().split('T')[0])
  }

  const someFunction = () => {
    const startDate = this.state.StartDateofMaintenance
    const frequency = this.state.ScheduledMaintenanceDatesandIntervals
    const nextDate = this.getNextScheduleDate(startDate, frequency)
    this.setState({ nextScheduledDate: nextDate.toISOString().split('T')[0] })
    console.log(nextDate) // or any other logic you want with nextDate
  }

  function getNextScheduleDate(startDate, frequency) {
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

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.29.93:5000/getId/${id}`)
      console.log(response)
      setAssetName(response.data.AssetName)
      setDescription(response.data.Description)
      setAssetCategory(response.data.AssetCategory)
      setLocation(response.data.Location)
      setManufacturersName(response.data.ManufacturersName)
      setManufacturersAddress(response.data.ManufacturersAddress)
      setManufacturersContactNo(response.data.ManufacturersContactNo)
      setSupplierVendorInformation(response.data.SupplierVendorInformation)
      setCurrentOwner(response.data.CurrentOwner)
      setDepartmentResponsible(response.data.DepartmentResponsible)
      setLocationDepartment(response.data.LocationDepartment)
      setPhysicalLocation(response.data.PhysicalLocation)
      setCurrentStatus(response.data.CurrentStatus)
      setExpectedUsefulLife(response.data.ExpectedUsefulLife)
      setDateofLastMaintenance(response.data.DateofLastMaintenance)
      setDetailsofMaintenanceActivities(response.data.DetailsofMaintenanceActivities)
      setScheduledMaintenanceDatesandIntervals(response.data.ScheduledMaintenanceDatesandIntervals)
      seManufacturersEmail(response.data.ManufacturersEmail)
      setModelNumber(response.data.ModelNumber)
      setSerialNumber(response.data.SerialNumber)
      setPurchaseCost(response.data.PurchaseCost)
      setPurchaseDate(response.data.PurchaseDate)
      setWarrantyStartDate(response.data.WarrantyStartDate)
      setAcquisitionMethod(response.data.AcquisitionMethod)
      seWarrantyEndDate(response.data.WarrantyEndDate)
      setWarrantyProviderManufacturerContact(response.data.WarrantyProviderManufacturerContact)
      setWarrantyTermsandConditions(response.data.WarrantyTermsandConditions)
      setPMDetails(response.data.PMDetails)
      setStartDateofMaintenance(response.data.startDate)
      setNextScheduledDate(response.data.nextDate)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const Update = (e) => {
    e.preventDefault()
    axios
      .put(`http://192.168.29.93:5000/updateRecord/${id}`, {
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
        nextDate: nextScheduledDate,
      })
      .then((result) => {
        console.log(result)
        setAssetName('')
        setDescription('')
        setAssetCategory('')
        setLocation('')
        setStartDateofMaintenance('')
        setScheduledMaintenanceDatesandIntervals('')
        setNextScheduledDate('')

        // Assuming you have a navigate function or useHistory from react-router-dom
        // Navigate back to the previous page
        navigate(-1)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      {/* <div
        className="container-lg"
        style={{
          border: '2px solid #ccc',
          backgroundColor: '',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}
      > */}
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
        {/* Step 1: Asset Identification */}
        <div>
          <form onSubmit={Update}>
            <div className="row g-2">
              <div className="col-md-5">
                <label htmlFor="assetName" style={{ marginBottom: '10px' }}>
                  Asset Name:
                </label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-4"
                  name="AssetName"
                  id="assetName"
                  style={{ marginBottom: '10px' }}
                  // style={{ width: '80%' }}
                  value={AssetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </div>
              {/* <div className="col-md-4">
                <label htmlFor="assetDescription">Description:</label>
                <textarea
                  className="form-control col-sm-6"
                  id="assetDescription"
                  defaultValue={''}
                  name="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div> */}
              <div className="col-md-5">
                <label htmlFor="assetCategory" style={{ marginBottom: '10px' }}>
                  Asset Category:
                </label>
                <input
                  type="text"
                  required
                  style={{ marginBottom: '10px' }}
                  className="form-control col-sm-4"
                  id="assetCategory"
                  name="AssetCategory"
                  value={AssetCategory}
                  onChange={(e) => setAssetCategory(e.target.value)}
                />
              </div>
              {/* <div className="col-md-5">
                <label htmlFor="assetLocation">Location:</label>
                <input
                  type="text"
                  className="form-control col-sm-4"
                  id="assetLocation"
                  name="Location"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div> */}
            </div>
          </form>
        </div>
        <form onSubmit={Update}>
          <div className="row g-2">
            <div className="col-md-5">
              <label htmlFor="PMDetaiils" style={{ marginBottom: '10px' }}>
                Current Status:
              </label>
              <select
                className="form-control col-sm-4"
                required
                style={{ marginBottom: '10px' }}
                id="currentstatus"
                name="CurrentStatus"
                value={CurrentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="Daily">In use</option>
                <option value="Weekly">Under Repair</option>
                <option value="Fifteen Days">In Storage</option>
              </select>
            </div>
            <div className="col-md-5">
              <label htmlFor="usefulLife" style={{ marginBottom: '10px' }}>
                Expected Useful Life:
              </label>
              <input
                type="text"
                required
                style={{ marginBottom: '10px' }}
                className="form-control col-sm-4"
                id="usefulLife"
                name="ExpectedUsefulLife"
                value={ExpectedUsefulLife}
                onChange={(e) => setExpectedUsefulLife(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="lastMaintenanceDate" style={{ marginBottom: '10px' }}>
                Date of Last Maintenance:
              </label>
              <input
                type="date"
                required
                style={{ marginBottom: '10px' }}
                className="form-control col-sm-4"
                id="lastMaintenanceDate"
                name="DateofLastMaintenance"
                value={DateofLastMaintenance}
                onChange={(e) => setDateofLastMaintenance(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="assetLocation" className="form-label">
                Location:
              </label>
              <select
                className="form-control col-sm-6"
                required
                id="assetLocation"
                name="Location"
                value={Location}
                style={{ marginBottom: '10px' }}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Plant 1">Plant 1</option>
                <option value="Plant 2">Plant 2</option>
                <option value="Plant 3">Plant 3</option>
                <option value="Plant 4">Plant 4</option>
              </select>
            </div>
            {/* <div className="col-md-5">
              <label htmlFor="maintenanceActivities">Details of Maintenance Activities:</label>
              <textarea
                className="form-control col-sm-4"
                id="maintenanceActivities"
                defaultValue={''}
                name="DetailsofMaintenanceActivities"
                value={DetailsofMaintenanceActivities}
                onChange={(e) => setDetailsofMaintenanceActivities(e.target.value)}
              />
            </div> */}
            <div className="col-md-5">
              <label htmlFor="PMDetails" style={{ marginBottom: '10px' }}>
                PM Details:
              </label>
              <textarea
                className="form-control col-sm-4"
                required
                id="PMDetails"
                style={{ marginBottom: '10px' }}
                defaultValue={''}
                name="PMDetails"
                value={PMDetails}
                onChange={(e) => setPMDetails(e.target.value)}
              />
            </div>
            {/* <div className="col-md-5">
                <label htmlFor="StartDateofMaintenance">Start From :</label>
                <input
                  type="date"
                  className="form-control col-sm-4"
                  id="StartDateofMaintenance"
                  name="StartDateofMaintenance"
                  value={StartDateofMaintenance}
                  onChange={(e) => setStartDateofMaintenance(e.target.value)}
                />
              </div> */}
            {/* <div className="col-md-5">
                <label htmlFor="scheduledMaintenance">
                  Scheduled Maintenance Dates and Intervals:
                </label>
                <select
                  className="form-control col-sm-4"
                  id="scheduledMaintenance"
                  name="ScheduledMaintenanceDatesandIntervals"
                  value={ScheduledMaintenanceDatesandIntervals}
                  onChange={handleFrequencyChange}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fifteen Days">Fifteen Days</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half Year">Half Year</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div> */}

            {/* <div className="col-md-5">
                <label htmlFor="NextDateofMaintenance">Next Date of Maintenance :</label>
                <input
                  type="date"
                  className="form-control col-sm-4"
                  id="nextScheduledDate"
                  value={nextScheduledDate}
                  readOnly // to make it non-editable
                  onChange={(e) => setNextScheduledDate(e.target.value)}
                />
              </div> */}
            <div className="col-md-5">
              <label htmlFor="assetDescription" style={{ marginBottom: '10px' }}>
                Description:
              </label>
              <textarea
                className="form-control col-sm-4"
                required
                style={{ marginBottom: '10px' }}
                id="assetDescription"
                defaultValue={''}
                name="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="maintenanceActivities" style={{ marginBottom: '10px' }}>
                Details of Maintenance Activities:
              </label>
              <textarea
                className="form-control col-sm-4"
                required
                style={{ marginBottom: '10px' }}
                id="maintenanceActivities"
                defaultValue={''}
                name="DetailsofMaintenanceActivities"
                value={DetailsofMaintenanceActivities}
                onChange={(e) => setDetailsofMaintenanceActivities(e.target.value)}
              />
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ margin: '10px', width: '28%' }}
            type="submit"
          >
            Save
          </button>
          {/* </div> */}
        </form>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  )
}
