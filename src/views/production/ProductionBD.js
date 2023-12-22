import React, { useEffect, useState } from 'react'
// import './Breakdown.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function BreakDown() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [MachineName, setMachineName] = useState('')
  const [BreakdownStartDate, setBreakdownStartDate] = useState('')
  const [BreakdownEndDate, setBreakdownEndDate] = useState('')
  const [BreakdownStartTime, setBreakdownStartTime] = useState('')
  const [BreakdownEndTime, setBreakdownEndTime] = useState('')
  const [Shift, setShift] = useState('') // Default to false
  const [LineName, setLineName] = useState('') // Default to false
  const [Operations, setOperations] = useState('')
  const [BreakdownPhenomenons, setBreakdownPhenomenons] = useState('')
  const [BreakdownType, setBreakdownType] = useState('')
  const [DetectOCC, setOCC] = useState('')
  // const [BreakdownTime, setBreakdownTime] = useState('')
  const [ActionTaken, setActionTaken] = useState('')
  // const [WhyWhyAnalysis, setWhyWhyAnalysis] = useState('')
  const [RootCause, setRootCause] = useState('')
  const [PreventiveAction, setPreventiveAction] = useState('')
  const [CorrectiveAction, setCorrectiveAction] = useState('')
  const [TargetDate, setTargetDate] = useState('')
  const [Responsibility, setResponsibility] = useState('')
  const [HD, setHD] = useState('')
  const [Remark, setRemark] = useState('')
  const [Status, setStatus] = useState('')
  const [Location, setLocation] = useState('')
  const [SpareParts, setSpareParts] = useState('')
  const [Cost, setCost] = useState('')
  const [WhyWhyAnalysis, setWhyWhyAnalysis] = useState('')
  const [whyWhyAnalysisList, setWhyWhyAnalysisList] = useState([])
  const [formData, setFormData] = useState({})
  // const [WhyWhyAnalysis, setWhyWhyAnalysis] = useState([''])
  //   let status = 'pending'

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://mms-backend-n2zv.onrender.com/getBreakdownDataId/${id}`,
      )
      console.log(response)
      setMachineName(response.data.MachineName)
      setBreakdownStartDate(response.data.BreakdownStartDate)
      setBreakdownStartTime(response.data.BreakdownStartTime)
      setBreakdownEndDate(response.data.BreakdownEndDate)
      setBreakdownEndTime(response.data.BreakdownEndTime)
      setShift(response.data.Shift)
      setLineName(response.data.LineName)
      setOperations(response.data.Operations)
      setBreakdownPhenomenons(response.data.BreakdownPhenomenons)
      setStatus(response.data.Status)
      setLocation(response.data.Location)
      setSpareParts(response.data.SpareParts)
      setCost(response.data.Cost)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const [Image, setImage] = useState('')
  //   let status = 'pending'

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

  const Update = (e) => {
    e.preventDefault()

    // Create a FormData object to append the file data
    const formData = new FormData()
    formData.append('attachment', attachment)

    // Append other data to the FormData object
    formData.append('MachineName', MachineName)
    formData.append('BreakdownStartDate', BreakdownStartDate)
    formData.append('attachment', attachment)
    // ... (append other data)
    axios
      .put(`https://mms-backend-n2zv.onrender.com/updateBreakdownRecord/${id}`, {
        MachineName,
        BreakdownStartDate,
        BreakdownEndDate,
        BreakdownStartTime,
        BreakdownEndTime,
        Shift,
        LineName,
        Operations,
        BreakdownPhenomenons,
        BreakdownType,
        DetectOCC,
        // BreakdownTime,
        ActionTaken,
        // WhyWhyAnalysis,
        WhyWhyAnalysis,
        RootCause,
        PreventiveAction,
        CorrectiveAction,
        TargetDate,
        Responsibility,
        HD,
        Remark,
        Status: 'pending',
        attachment,
        Location,
        Image,
        SpareParts,
        Cost,
        whyWhyAnalysisList,
      })
      .then((result) => {
        console.log(result)
        setMachineName('')
        setBreakdownStartDate('')
        setBreakdownEndDate('')
        setBreakdownStartTime('')
        setBreakdownEndTime('')
        setShift('')
        setLineName('')
        setOperations('')
        setBreakdownPhenomenons('')
        setStatus('pending')
        setLocation('')
        setImage('')
        setPreventiveAction('')
        setCorrectiveAction('')
        setCost('')
        setSpareParts('')
        setWhyWhyAnalysis('')
        setWhyWhyAnalysisList('')
        // setAttachment('')

        // Assuming you have a navigate function or useHistory from react-router-dom
        // Navigate back to the previous page
        navigate(-1)
      })
      .catch((err) => console.log(err))
  }

  const handleWhyWhyAnalysisChange = (e, index) => {
    const newWhyWhyAnalysis = [...WhyWhyAnalysis]
    newWhyWhyAnalysis[index] = e.target.value
    setWhyWhyAnalysis(newWhyWhyAnalysis)
  }

  const addWhyWhyAnalysisField = () => {
    setWhyWhyAnalysis([...WhyWhyAnalysis, ''])
  }

  const removeWhyWhyAnalysisField = (index) => {
    const newWhyWhyAnalysis = [...WhyWhyAnalysis]
    newWhyWhyAnalysis.splice(index, 1)
    setWhyWhyAnalysis(newWhyWhyAnalysis)
  }

  const [attachment, setAttachment] = useState(null)

  return (
    <>
      <div>
        <div
          className="container"
          style={{
            border: '2px solid #ccc',
            backgroundColor: '',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '90%',
          }}
        >
          <form method="post" onSubmit={Update}>
            {/* Add Breakdown Detail Fields */}
            {/* <h3>Add Breakdown Detail</h3> */}
            <div className="row g-2">
              <div className="col-md-6">
                <label htmlFor="machineName">Machine Name:</label>
                <input
                  type="text"
                  className="form-control col-sm-6"
                  name="MachineName"
                  value={MachineName}
                  disabled // This makes the input read-only
                  onChange={(e) => setMachineName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="breakdownStartDate">Breakdown Start Date:</label>
                <input
                  type="date"
                  className="form-control col-sm-6"
                  name="BreakdownDate"
                  value={BreakdownStartDate}
                  disabled
                  onChange={(e) => setBreakdownStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  className="form-control col-sm-6"
                  name="Location"
                  value={Location}
                  disabled
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="shift">Shift:</label>
                <input
                  type="text"
                  className="form-control col-sm-6"
                  name="Shift"
                  value={Shift}
                  disabled
                  onChange={(e) => setShift(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lineName">Line Name:</label>
                <input
                  type="text"
                  name="LineName"
                  className="form-control col-sm-6"
                  value={LineName}
                  disabled
                  onChange={(e) => setLineName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="operations">Operations:</label>
                <input
                  type="text"
                  className="form-control col-sm-6"
                  name="Operations"
                  value={Operations}
                  disabled
                  onChange={(e) => setOperations(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="breakdownPhenomen">Breakdown Phenomenon:</label>
                <input
                  type="text"
                  name="BreakdownPhenomenons"
                  className="form-control col-sm-6"
                  value={BreakdownPhenomenons}
                  disabled
                  onChange={(e) => setBreakdownPhenomenons(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="breakdownStartTime">Breakdown Start Time:</label>
                <input
                  type="text"
                  disabled
                  className="form-control col-sm-6"
                  name="BreakdownTime"
                  value={BreakdownStartTime}
                  onChange={(e) => setBreakdownStartTime(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="breakdownType">Breakdown Type:</label>

                <select
                  className="form-control col-sm-6"
                  required
                  id="BreakdownType"
                  name="BreakdownType"
                  value={BreakdownType}
                  onChange={(e) => setBreakdownType(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Production Setting">Production Setting</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="occ">Detect OCC:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="DetectOCC"
                  value={DetectOCC}
                  onChange={(e) => setOCC(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="spareparts">Spare Parts:</label>
                <input
                  type="text"
                  required
                  name="SpareParts"
                  className="form-control col-sm-6"
                  value={SpareParts}
                  onChange={(e) => setSpareParts(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cost">Cost:</label>
                <input
                  type="text"
                  required
                  name="Cost"
                  className="form-control col-sm-6"
                  value={Cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="whyWhy">Why-Why Analysis:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="WhyWhyAnalysis"
                  value={WhyWhyAnalysis}
                  onChange={(e) => setWhyWhyAnalysis(e.target.value)}
                />
              </div>
              {/* {WhyWhyAnalysis.map((value, index) => (
                <div className="col-md-6" key={index}>
                  <label htmlFor={`whyWhy${index}`}>Why-Why Analysis:</label>
                  <input
                    type="text"
                    required
                    className="form-control col-sm-6"
                    name={`WhyWhyAnalysis_${index}`}
                    value={value}
                    onChange={(e) => handleWhyWhyAnalysisChange(e, index)}
                  />
                </div>
              ))} */}
              {/* <button
                className="btn btn-primary"
                style={{ width: '20%', marginBottom: '10px' }}
                type="button"
                onClick={addWhyWhyAnalysisField}
              >
                Add Why-Why Analysis
              </button> */}
              <div className="col-md-6">
                <label htmlFor="rootCause">Root Cause:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="RootCause"
                  value={RootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="PreventiveAction">Preventive Action:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="PreventiveAction"
                  value={PreventiveAction}
                  onChange={(e) => setPreventiveAction(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="correctiveAction">Corrective Action:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="CorrectiveAction"
                  value={CorrectiveAction}
                  onChange={(e) => setCorrectiveAction(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="targetDate">Target Date:</label>
                <input
                  type="date"
                  required
                  className="form-control col-sm-6"
                  name="TargetDate"
                  value={TargetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="responsibility">Responsibility:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="Responsibility"
                  value={Responsibility}
                  onChange={(e) => setResponsibility(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="hd">HD:</label>
                <input
                  type="text"
                  required
                  name="HD"
                  className="form-control col-sm-6"
                  value={HD}
                  onChange={(e) => setHD(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="remark">Remark:</label>
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="Remark"
                  value={Remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="BreakdownEndDate">BreakdownEndDate:</label>
                <input
                  type="date"
                  required
                  className="form-control col-sm-6"
                  name="BreakdownEndDate"
                  value={BreakdownEndDate}
                  onChange={(e) => setBreakdownEndDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="BreakdownEndTime">BreakdownEndTime:</label>
                <input
                  type="time"
                  required
                  className="form-control col-sm-6"
                  name="BreakdownEndTime"
                  value={BreakdownEndTime}
                  onChange={(e) => setBreakdownEndTime(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="attachment">Attachment:</label>
                <input
                  type="file"
                  className="form-control col-sm-6"
                  onChange={convertToBse64}
                ></input>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '20%', marginBottom: '10px' }}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
