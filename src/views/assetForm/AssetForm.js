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
    ManufacturingYear: '',
    Image: '',
  })
  const navigate = useNavigate()

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
        // InstallationDate,
        InstallationDate,
        ManufacturingYear,
        Image,
      } = formData
      setImage('')
      console.log('Asset Name:', AssetName)
      console.log('MachineNo:', MachineNo)
      console.log('SrNo:', SrNo)
      console.log('Location:', Location)
      console.log('MachineType:', MachineType)
      console.log('Make:', Make)
      console.log('Controller:', Controller)
      console.log('PowerRatting:', PowerRatting)
      console.log('Image:', setImage)
      console.log('InstallationDate:', InstallationDate)
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
              type="number"
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
          {/* <div className="col-md-6">
            <label htmlFor="attachment">Attachment:</label>
            <input
              type="file"
              id="Image"
              name="Image"
              className="form-control col-sm-6"
              onChange={convertToBse64}
            ></input>
          </div> */}
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
