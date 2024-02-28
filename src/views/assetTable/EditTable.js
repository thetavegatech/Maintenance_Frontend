import React, { useEffect, useState } from 'react'
// import editForm from './css/editform.css';
// import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function EditForm() {
  const { assetId, setId } = useParams()
  const navigate = useNavigate()
  const [AssetName, setAssetName] = useState('')
  const [MachineNo, setMachineNo] = useState('')
  const [Location, setLocation] = useState('') // Default to false
  const [SrNo, setSrNo] = useState('')
  const [CMDFrequency, setCMDFrequency] = useState('')
  const [TMDFrequency, setTMDFrequency] = useState('')
  const [TMD, setTMD] = useState('')
  const [CMD, setCMD] = useState('')

  const [StartDateofMaintenance, setStartDateofMaintenance] = useState('') // assuming you need this
  // const [ScheduledMaintenanceDatesandIntervals, setScheduledMaintenanceDatesandIntervals] = useState('');
  const [nextScheduledDate, setNextScheduledDate] = useState('')
  const [Image, setImage] = useState('')
  const frequencyOptions = [
    'Daily',
    'Weekly',
    'Fifteen days',
    'Monthly',
    'Quarterly',
    'Half year',
    'Yearly',
  ]
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
      const response = await axios.get(
        `http://localhost:5000/assets/${assetId}/maintenance/${setId}`,
      )
      console.log(response)

      setAssetName(response.data.AssetName)
      setMachineNo(response.data.MachineNo)
      setSrNo(response.data.SrNo)
      setLocation(response.data.Location)
      setCMD(response.data.CMD)
      setTMD(response.data.TMD)
      setTMDFrequency(response.data.TMDFrequency)
      setCMDFrequency(response.data.CMDFrequency) // Corrected line
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const Update = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/assets/${assetId}/maintenance/${setId}`, {
        AssetName,
        MachineNo,
        SrNo,
        CMD,
        TMD,
        CMDFrequency,
        TMDFrequency,
      })
      .then((result) => {
        console.log(result)
        setAssetName('')
        setImage('')

        // Assuming you have a navigate function or useHistory from react-router-dom
        // Navigate back to the previous page
        navigate(-1)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
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
                <label htmlFor="CMD" style={{ marginBottom: '10px' }}>
                  CBM:
                </label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-4"
                  name="CMD"
                  id="CMD"
                  style={{ marginBottom: '10px' }}
                  // style={{ width: '80%' }}
                  value={CMD}
                  onChange={(e) => setCMD(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="CMDFrequency" style={{ marginBottom: '10px' }}>
                  CBM Frequency:
                </label>
                <select
                  className="form-control col-sm-4"
                  id="CMDFrequency"
                  name="CMDFrequency"
                  value={CMDFrequency}
                  onChange={(e) => setCMDFrequency(e.target.value)}
                >
                  <option value="">Select Frequency</option>
                  {frequencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-md-5">
                <label htmlFor="TMD" style={{ marginBottom: '10px' }}>
                  TBM:
                </label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-4"
                  name="TMD"
                  id="TMD"
                  style={{ marginBottom: '10px' }}
                  // style={{ width: '80%' }}
                  value={TMD}
                  onChange={(e) => setTMD(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="TMDFrequency" style={{ marginBottom: '10px' }}>
                  TBM Frequency:
                </label>
                <select
                  className="form-control col-sm-4"
                  id="TMDFrequency"
                  name="TMDFrequency"
                  value={TMDFrequency}
                  onChange={(e) => setTMDFrequency(e.target.value)}
                >
                  <option value="">Select Frequency</option>
                  {frequencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ margin: '10px', width: '28%' }}
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  )
}
