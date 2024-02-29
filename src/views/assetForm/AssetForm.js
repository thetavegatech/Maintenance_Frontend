import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MyFormComponent = () => {
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    AssetName: '',
    CMD: '',
    TMD: '',
    TMDFrequency: '',
    CMDFrequency: '',
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
    ManufacturingYear: '',
    Image: '',
    maintenanceData: [],
    // maintenanceData: [
    //   { CMD: 'CMD', TMD: '', CMDFrequency: '', TMDFrequency: '' },
    //   { CMD: '1', TMD: '', CMDFrequency: '', TMDFrequency: '' },
    //   // Add more maintenance sets as needed...
    // ],
  })

  const [maintenanceData, setMaintenanceData] = useState([])

  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('')

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

  const updateMaintenanceData = (index, field, value) => {
    const updatedMaintenanceData = [...maintenanceData]
    updatedMaintenanceData[index] = {
      ...updatedMaintenanceData[index],
      [field]: value,
    }
    setMaintenanceData(updatedMaintenanceData)
  }

  const handleMaintenanceChange = (index, field, value) => {
    const updatedMaintenanceData = [...formData.maintenanceData]

    if (index >= 0 && index < updatedMaintenanceData.length) {
      updatedMaintenanceData[index][field] = value
      setFormData({ ...formData, maintenanceData: updatedMaintenanceData })
    } else {
      console.error('Invalid index:', index)
    }
  }

  const addMaintenanceSet = () => {
    setFormData({
      ...formData,
      maintenanceData: [
        ...formData.maintenanceData,
        { CMD: '', TMD: '', CMDFrequency: '', TMDFrequency: '' },
      ],
    })
  }

  const removeMaintenanceSet = (index) => {
    const updatedMaintenanceData = [...maintenanceData]
    updatedMaintenanceData.splice(index, 1)
    setMaintenanceData(updatedMaintenanceData)
  }

  const { id } = useParams()
  const uploadImage = (e, id) => {
    e.preventDefault()
    axios
      .put(`https://mms-backend-n2zv.onrender.com/api/assets/${id}`, {
        // AssetName,
        // MachineNo,
        // SrNo,
        // MachineType,
        // Make,
        // Controller,
        // PowerRatting,
        // CapecitySpindle,
        // AxisTravels,
        // Ranking,
        // Location,
        // InstallationDate,
        // ManufacturingYear,
        Image,
      })
      .then((result) => {
        console.log(result)
        // setAssetName('')
        setImage('')

        // Assuming you have a navigate function or useHistory from react-router-dom
        // Navigate back to the previous page
        // navigate(-1)
      })
      .catch((err) => console.log(err))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Destructure form data from the state
      const {
        AssetName,
        // CMD,
        // TMD,
        // CMDFrequency,
        // TMDFrequency,
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
        // InstallationDate,
        InstallationDate,
        ManufacturingYear,
        Image,
        maintenanceData: maintenanceData,
        // Image,
      } = formData

      // const dataToSend = {
      //   AssetName,
      //   // ... (other fields)
      //   Image,
      //   maintenanceData: maintenanceData, // Include maintenanceData in formData
      // }
      console.log(maintenanceData)
      // setImage('')
      console.log('Asset Name:', AssetName, maintenanceData)
      // console.log('CMD:', CMD, CMDFrequency)
      // console.log('TMD:', TMD, TMDFrequency)
      console.log('MachineNo:', MachineNo)
      console.log('SrNo:', SrNo)
      console.log('Location:', Location)
      console.log('MachineType:', MachineType)
      console.log('Make:', Make)
      console.log('Controller:', Controller)
      console.log('PowerRatting:', PowerRatting)
      console.log('Image:', Image)
      console.log('InstallationDate:', InstallationDate)
      // ... continue with other fields
      setSuccessMessage('Form submitted successfully!')

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
      // console.log(CMD, TMD)
      uploadImage(e, data._id)
      // navigate(-1)

      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (error) {
      console.error('Error:', error)
      // navigate(-1)
    }
  }

  return (
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
      {/* Display success message if it exists */}
      {successMessage && (
        <div className="alert alert-success" role="alert" style={{ marginTop: '10px' }}>
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ margin: '3%' }}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="assetName" style={{ marginBottom: '10px' }}>
              Machine Code:
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
              M/C No:
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
              MKG Sr No:
            </label>
            <input
              required
              type="string"
              className="form-control col-sm-6"
              id="srno"
              onChange={(e) => setFormData({ ...formData, SrNo: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="assetmachinetype" style={{ marginBottom: '10px' }}>
              M/C Type:
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
              <option value="AAAPL-27">AAAPL-27</option>
              <option value="AAAPL-29">AAAPL-29</option>
              <option value="AAAPL- 89">AAAPL- 89</option>
              <option value="DPAPL - 236">DPAPL - 236</option>
              <option value=" DPAPL- GN"> DPAPL- GN</option>
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
              {/* <option value="5">5</option> */}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="installationDate" style={{ marginBottom: '10px' }}>
              Insatallation Date:
            </label>
            <input
              // required
              type="date"
              className="form-control col-sm-6"
              id="InstallationDate"
              name="InstallationDate"
              onChange={(e) => setFormData({ ...formData, InstallationDate: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="manufacturingyear" style={{ marginBottom: '10px' }}>
              Manufacturing Year:
            </label>
            <input
              required
              type="year"
              // min="2000"
              className="form-control col-sm-6"
              id="manufacturingyear"
              onChange={(e) => setFormData({ ...formData, ManufacturingYear: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="attachment" style={{ marginBottom: '10px' }}>
              Attachment:
            </label>
            <input
              type="file"
              id="Image"
              name="Image"
              className="form-control col-sm-6"
              onChange={convertToBse64}
            ></input>
          </div>

          {/* Maintenance sets */}
          <div style={{ marginTop: '20px' }}>
            <h5>Maintenance Sets</h5>
            {formData.maintenanceData.map((set, index) => (
              <div key={index}>
                {/* ... (your existing code) */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor={`cmd${index}`} style={{ marginBottom: '10px' }}>
                      CBM:
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control col-sm-6"
                      id={`cmd${index}`}
                      value={set.CMD}
                      onChange={(e) => handleMaintenanceChange(index, 'CMD', e.target.value)}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor={`tmd${index}`} style={{ marginBottom: '10px' }}>
                      TBM:
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control col-sm-6"
                      id={`tmd${index}`}
                      value={set.TMD}
                      onChange={(e) => handleMaintenanceChange(index, 'TMD', e.target.value)}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor={`cmdFrequency${index}`} style={{ marginBottom: '10px' }}>
                      CBM Frequency:
                    </label>
                    <select
                      className="form-control col-sm-6"
                      required
                      id={`cmdFrequency${index}`}
                      value={set.CMDFrequency}
                      onChange={(e) =>
                        handleMaintenanceChange(index, 'CMDFrequency', e.target.value)
                      }
                    >
                      <option value="">Select Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="fifteen Days">Fifteen Days</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="half Year">Half Year</option>
                      <option value="yearly">Yearly</option>
                      {/* ... (your existing code for options) */}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`tmd${index}`} style={{ marginBottom: '10px' }}>
                      TBM:
                    </label>
                    <input
                      // required
                      type="text"
                      className="form-control col-sm-6"
                      id={`tmd${index}`}
                      value={set.TMD}
                      onChange={(e) => handleMaintenanceChange(index, 'TMD', e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor={`tmdFrequency${index}`} style={{ marginBottom: '10px' }}>
                      TBM Frequency:
                    </label>
                    <select
                      className="form-control col-sm-6"
                      // required
                      id={`tmdFrequency${index}`}
                      value={set.TMDFrequency}
                      onChange={(e) =>
                        handleMaintenanceChange(index, 'TMDFrequency', e.target.value)
                      }
                    >
                      <option value="">Select Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="fifteen Days">Fifteen Days</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="half Year">Half Year</option>
                      <option value="yearly">Yearly</option>
                      {/* ... (your existing code for options) */}
                    </select>
                  </div>
                  {/* ... (your existing code) */}
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={addMaintenanceSet}>
              Add Maintenance Set
            </button>
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
