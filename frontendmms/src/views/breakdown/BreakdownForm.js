import React, { useState, useEffect } from 'react'
import './Breakdown.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CTimePicker } from '@coreui/react'
import TimePicker from 'react-time-picker'
import 'react-datepicker/dist/react-datepicker.css'

export default function BreakDown() {
  const [usernos, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUserName, setSelectedUserName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFullTime, setIsFullTime] = useState(false)
  const [selectedTime, setSelectedTime] = useState('12:00')

  useEffect(() => {
    // Fetch user data from the server
    axios
      .get('http://192.168.29.93:5000/UserNo')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }, [])
  // Modify the handleUserSelect function
  // const handleUserSelect = (_id) => {
  //   // setno(_id)
  //   return console.log(_id)

  //   // const no = _id
  //   // console.log(no)
  //   // setno(no)
  //   // // console.log(_id)
  //   // const selectedUser = usernos.find((user) => user.phoneNumber === _id)
  //   // // console.log(selectedUser)
  //   // // setSelectedUsers(selectedUser)
  //   // // let number = _id
  //   // // console.log(number)

  //   // if (selectedUser) {
  //   //   // setSelectedUsers(selectedUser)
  //   //   // Check if the user is already selected
  //   //   const isSelected = selectedUsers.some((user) => user.phoneNumber === selectedUser.phoneNumber)
  //   //   // console.log(isSelected)

  //   //   if (!isSelected) {
  //   //     // If not selected, add the user to the array
  //   //     setSelectedUsers([...selectedUsers, selectedUser])
  //   //   }
  //   // }

  // }

  const [selectedUserNumbers, setSelectedUserNumbers] = useState([])

  const handleUserSelect = (selectedValue) => {
    // Check if the user is already selected
    if (selectedUserNumbers.includes(selectedValue)) {
      // If selected, remove from the array
      setSelectedUserNumbers((prevSelected) =>
        prevSelected.filter((userNumber) => userNumber !== selectedValue),
      )
    } else {
      // If not selected, add to the array
      setSelectedUserNumbers((prevSelected) => [...prevSelected, selectedValue])
    }
  }

  // const handleUserSelect = (_id) => {
  //   // console.log(_id)
  //   setSelected(_id)
  //   return _id
  // }

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    MachineName: '',
    BreakdownStartDate: '',
    BreakdownEndDate: '',
    BreakdownStartTime: '',
    BreakdownEndTime: '',
    Shift: '',
    LineName: '',
    StageName: '',
    BreakdownPhenomenons: '',
    BreakdownType: '',
    OCC: '',
    BreakdownTime: '',
    ActionTaken: '',
    WhyWhyAnalysis: '',
    RootCause: '',
    PermanentAction: '',
    TargetDate: '',
    Responsibility: '',
    HD: '',
    Remark: '',
    Status: 'open',
  })
  const [machineNames, setMachineNames] = useState([])
  const [assetNames, setAssetNames] = useState([])
  // const [isFullTime, setIsFullTime] = useState(false)

  useEffect(() => {
    // Fetch asset names from 'http://localhost:5000/getAllData'
    fetch('http://192.168.29.93:5000/api/assets')
      .then((res) => res.json())
      .then((data) => {
        // Extract unique asset names from the data
        const uniqueAssetNames = [...new Set(data.map((item) => item.AssetName))]
        // Set the assetNames state with the unique asset names
        setAssetNames(uniqueAssetNames)
      })
      .catch((error) => {
        console.error('Error fetching asset names: ', error)
      })
  }, [])

  useEffect(() => {
    // Fetch the breakdown data from your API
    fetch('http://192.168.29.93:5000/getBreakdownData')
      .then((res) => res.json())
      .then((data) => {
        // Extract unique machine names from the breakdown data
        const uniqueMachineNames = [...new Set(data.map((item) => item.MachineName))]
        // Set the machineNames state with the unique machine names
        setMachineNames(uniqueMachineNames)
      })
      .catch((error) => {
        console.error('Error fetching breakdown data: ', error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const {
      MachineName,
      Location,
      BreakdownStartDate,
      BreakdownEndDate,
      BreakdownStartTime,
      BreakdownEndTime,
      Shift,
      LineName,
      StageName,
      BreakdownPhenomenons,
      BreakdownType,
      OCC,
      ActionTaken,
      WhyWhyAnalysis,
      RootCause,
      PermanentAction,
      TargetDate,
      Responsibility,
      HD,
      Remark,
      Status = 'open',
    } = formData

    console.log(
      MachineName,
      Location,
      BreakdownStartDate,
      BreakdownEndDate,
      BreakdownStartTime,
      BreakdownEndTime,
      Shift,
      LineName,
      StageName,
      BreakdownPhenomenons,
      BreakdownType,
      OCC,
      ActionTaken,
      WhyWhyAnalysis,
      RootCause,
      PermanentAction,
      TargetDate,
      Responsibility,
      HD,
      Remark,
      Status,
    )

    fetch('http://192.168.29.93:5000/saveBreakdown', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        MachineName,
        Location,
        BreakdownStartDate,
        BreakdownEndDate,
        BreakdownStartTime,
        BreakdownEndTime,
        Shift,
        LineName,
        StageName,
        BreakdownPhenomenons,
        BreakdownType,
        OCC,
        ActionTaken,
        WhyWhyAnalysis,
        RootCause,
        PermanentAction,
        TargetDate,
        Responsibility,
        HD,
        Remark,
        Status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'add breakdown data')
        console.log(MachineName)
        navigate(-1)
      })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const apiKey = 'NDE1MDY2NGM2Mzc3NTI0ZjQzNmE1YTM5NDY0YzZlNzU='
  const numbers = '7020804148' // Replace with the phone numbers
  const data1 = 'test'
  const data2 = 'test'
  const sender = 'AAABRD'

  const sendSMS = (formData, selectedUsers) => {
    const { MachineName, BreakdownStartDate, Shift, LineName, StageName, BreakdownPhenomenons } =
      formData
    // Formulate a simple message
    const message = encodeURIComponent(
      'Breakdown For ' +
        MachineName +
        // 'Date of Breakdown Start' +
        // BreakdownStartDate +
        ' please visit concerned department Details are ' +
        BreakdownPhenomenons +
        ' - Aurangabad Auto Ancillary',
    )

    const phoneNumbers = usernos.map((user) => user.phoneNumber).join(',')
    // console.log(selected)
    // console.log(selectedUserNumbers.join(','))
    const selectedno = selectedUserNumbers.join(',')
    // console.log(selectedno)

    // Create the API URL
    const url = `https://api.textlocal.in/send/?apikey=${apiKey}&sender=${sender}&numbers=${selectedno}&message=${message}`

    // Use fetch to send the SMS
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('SMS sent successfully:', data)
        console.log(selectedno, message)
      })
      .catch((error) => {
        console.error('Error sending SMS:', error)
        console.log(selected)
      })
  }

  const handleButtonClick = () => {
    // Call the SMS sending function
    sendSMS(formData, selectedUsers)
  }
  return (
    <>
      {/* <div
        className="container-lg"
        style={{
          border: '2px solid #ccc',
          backgroundColor: 'lightgrey',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '90%',
        }}
      > */}
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
        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-6">
              <label htmlFor="machineName" style={{ marginBottom: '10px', fontSize: '16px' }}>
                Machine Name:
              </label>
              <select
                className="form-control col-sm-6"
                required
                name="MachineName"
                value={formData.AssetName}
                onChange={handleChange}
                style={{ marginBottom: '10px' }}
              >
                <option value="">Select a machine</option>
                {/* Populate the dropdown options with asset names */}
                {assetNames.map((asset, index) => (
                  <option key={index} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="assetLocation"
                className="form-label"
                style={{ marginBottom: '10px' }}
              >
                Location:
              </label>
              <select
                className="form-control col-sm-6"
                required
                // id="assetLocation"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Plant 1">Plant 1</option>
                <option value="Plant 2">Plant 2</option>
                <option value="Plant 3">Plant 3</option>
                <option value="Plant 4">Plant 4</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="breakdownDate" style={{ marginBottom: '10px' }}>
                Breakdown Start Date:
              </label>
              <input
                type="date"
                required
                className="form-control col-sm-6"
                name="BreakdownStartDate"
                value={formData.BreakdownStartDate}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="shift" style={{ marginBottom: '10px' }}>
                Shift:
              </label>
              <input
                type="text"
                required
                className="form-control col-sm-6"
                name="Shift"
                value={formData.Shift}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="breakdownStartTime" style={{ marginBottom: '10px' }}>
                Breakdown Start Time:
              </label>
              <input
                type="time"
                id="breakdownStartTime"
                className="form-control col-sm-6"
                name="BreakdownStartTime"
                value={formData.BreakdownStartTime}
                onChange={handleChange}
              ></input>
              {/* <label htmlFor="appt-time">Choose an appointment time: </label> */}
              {/* <input id="appt-time" type="time" name="appt-time" value="13:30" /> */}
              {/* <CTimePicker label="Time" locale="en-US" /> */}
              {/* {isFullTime ? (
                <select
                  className="form-control col-sm-6"
                  value={selectedTime}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select time
                  </option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  required
                  className="form-control col-sm-6"
                  name="BreakdownStartTime"
                  value={selectedTime}
                  onChange={() => {}}
                  placeholder=""
                />
              )} */}
              {/* Add a checkbox or some UI element to toggle between full-time and regular input */}
              {/* <label>
                <input
                  type="checkbox"
                  checked={isFullTime}
                  onChange={() => setIsFullTime(!isFullTime)}
                  style={{ marginTop: '10px' }}
                />
                Full Time
              </label> */}
            </div>
            <div className="col-md-6">
              <label htmlFor="lineName" style={{ marginBottom: '10px' }}>
                Line Name:
              </label>
              <input
                type="text"
                required
                name="LineName"
                className="form-control col-sm-6"
                value={formData.LineName}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="stageName" style={{ marginBottom: '10px' }}>
                Stage Name:
              </label>
              <input
                type="text"
                required
                className="form-control col-sm-6"
                name="StageName"
                value={formData.StageName}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="breakdownPhenomen" style={{ marginBottom: '10px' }}>
                Breakdown Phenomenon:
              </label>
              <input
                type="text"
                required
                name="BreakdownPhenomenons"
                className="form-control col-sm-6"
                value={formData.BreakdownPhenomenons}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="row lg-2">
              <div className="col-md-6" style={{ marginTop: '2vh', overflowY: 'auto' }}>
                <label style={{ marginBottom: '10px' }}>Select users:</label>
                <div className="row">
                  {usernos.map((user, index) => (
                    <React.Fragment key={user.phoneNumber}>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`checkbox-${user.phoneNumber}`}
                            checked={selectedUserNumbers.includes(user.phoneNumber)}
                            onChange={() => handleUserSelect(user.phoneNumber)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${user.phoneNumber}`}
                          >
                            {user.name}
                          </label>
                        </div>
                      </div>
                      {/* Insert a new row after every two users */}
                      {index % 2 !== 0 && <div className="w-100"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="col-md-6" style={{ marginTop: '2vh' }}>
                <label>Selected Users:</label>
                <ul>
                  {usernos
                    .filter((user) => selectedUserNumbers.includes(user.phoneNumber))
                    .map((user) => (
                      <li key={user.phoneNumber}>
                        {user.name} - {user.phoneNumber}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="col-xs-12">
                <button
                  type="submit"
                  onClick={handleButtonClick}
                  className="btn btn-primary"
                  style={{
                    marginTop: '20px',
                    fontSize: '16px',
                    backgroundColor: '#3448db',
                    marginBottom: '10px',
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
            {/* </div> */}
          </div>
        </form>
      </div>
      {/* </div> */}
    </>
  )
}
