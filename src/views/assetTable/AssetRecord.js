import React, { useState, useEffect } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton } from '@coreui/react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
// import './table.css'
// import './asset.css'
import './asset.css'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import classNames from 'classnames'
import { MdDashboard } from 'react-icons/md'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

const Inventory = () => {
  const { id } = useParams()
  const [usernos, setUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [assetDetails, setAssetDetails] = useState({})
  const [activeKey, setActiveKey] = useState(1)
  const [slittingData, setSlittingData] = useState([])
  const [pmData, setPmData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [assetNames, setAssetNames] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const loggedInUserrole = useSelector((state) => state.auth.userInfo?.role)
  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await axios.get(`https://backendmaintenx.onrender.com/api/assets/${id}`)
        setAssetDetails(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching asset details:', error)
        setLoading(false)
      }
    }

    fetchAssetDetails()
  }, [id])

  useEffect(() => {
    const fetchPmData = async () => {
      try {
        const response = await axios.get(
          `https://backendmaintenx.onrender.com/api/pm?assetName=${assetDetails.AssetName}`,
        )
        setPmData(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching PM data:', error)
        setLoading(false)
      }
    }

    fetchPmData()
  }, [])

  useEffect(() => {
    if (assetDetails.AssetName) {
      axios
        .get(
          `https://backendmaintenx.onrender.com/api/breakdown?assetName=${assetDetails.AssetName}`,
        )
        .then((response) => {
          setSlittingData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching breakdown data:', error)
        })
    }
  }, [assetDetails.AssetName])

  return (
    <>
      <CNav
        variant="pills"
        role="tablist"
        className="custom-tabs-nav"
        // style={{ marginBottom: '1rem' }}
      >
        <CNavItem role="presentation">
          <CNavLink
            active={activeKey === 1}
            component="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected={activeKey === 1}
            onClick={() => setActiveKey(1)}
            // style={{ marginLeft: '1rem' }}
            className="custom-tab-link"
          >
            Asset Data
          </CNavLink>
        </CNavItem>
        {(loggedInUserrole === 'maintenance' || loggedInUserrole === 'admin') && (
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 2}
              component="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected={activeKey === 2}
              onClick={() => setActiveKey(2)}
              style={{ marginLeft: '1rem' }}
              className="custom-tab-link"
            >
              Breakdown Data
            </CNavLink>
          </CNavItem>
        )}
        {/* {loggedInUserrole === 'production' ||
          (loggedInUserrole === 'admin' && ( */}
        {(loggedInUserrole === 'maintenance' || loggedInUserrole === 'admin') && (
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 3}
              component="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected={activeKey === 3}
              onClick={() => setActiveKey(3)}
              style={{ marginLeft: '1rem' }}
              className="custom-tab-link"
            >
              PM Data
            </CNavLink>
          </CNavItem>
        )}
        {(loggedInUserrole === 'production' || loggedInUserrole === 'admin') && (
          <CNavItem role="presentation">
            <CNavLink
              active={activeKey === 4}
              component="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected={activeKey === 4}
              onClick={() => setActiveKey(4)}
              style={{ marginLeft: '1rem' }}
              className="custom-tab-link"
            >
              Raise Breakdown
            </CNavLink>
          </CNavItem>
        )}
      </CNav>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab-pane" visible={activeKey === 1}>
          <div className="card shadow-sm mx-auto" style={{ marginTop: '2rem' }}>
            {/* <Link
              to="/temperature"
              style={{ position: 'absolute', top: '10px', right: '10px', overflow: 'hidden' }}
            ></Link> */}

            <div style={{ display: '', alignItems: 'center', marginBottom: '20px' }}>
              <div
                // className="d-flex justify-content-center align-items-center"
                className={classNames(
                  'box',
                  'd-flex',
                  'justify-content-center',
                  'align-items-center',
                  'd-flex justify-content-center align-items-center',
                )}
              >
                <MdDashboard
                  className="icon"
                  style={{
                    width: '30px',
                    height: '30px',
                    fill: 'white',
                    marginTop: '1px',
                    marginLeft: '3px',
                  }}
                />
              </div>
              <div style={{ margin: '2rem', paddingLeft: '10%' }}>
                {/* <div className="" style={{ marginLeft: '10px' }}> */}
                <h4>Asset Details</h4>
                <p>
                  <strong>Asset Name:</strong> {assetDetails.AssetName}
                </p>
                <p>
                  <strong>Machine Type:</strong> {assetDetails.MachineType}
                </p>
                <p>
                  <strong>Location:</strong> {assetDetails.Location}
                </p>
                <p>
                  <strong>Controller:</strong> {assetDetails.Controller}
                </p>
                <p>
                  <strong>Power Rating:</strong> {assetDetails.PowerRatting}
                </p>
                <p>
                  <strong>Capacity Spindle:</strong> {assetDetails.CapecitySpindle}
                </p>
                <p>
                  <strong>Axis Travels:</strong> {assetDetails.AxisTravels}
                </p>
                <p>
                  <strong>Installation Date:</strong> {assetDetails.InstallationDate}
                </p>
                {assetDetails.Image && (
                  <div>
                    <p>
                      <strong>Image:</strong>
                    </p>
                    <img src={assetDetails.Image} alt="Asset" width={200} height={200} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab-pane" visible={activeKey === 2}>
          <BreakdownData assetName={assetDetails.AssetName} breakdownData={slittingData} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 3}>
          <PMData assetName={assetDetails.AssetName} pmData={pmData} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab-pane" visible={activeKey === 4}>
          <Breakdown assetName={assetDetails.AssetName} />
        </CTabPane>
      </CTabContent>
    </>
  )
}

const BreakdownData = ({ assetName, breakdownData }) => {
  const navigate = useNavigate()
  const [expandedItems, setExpandedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const filteredData = breakdownData.filter((item) => item.MachineName === assetName)

  const handleProductionPageNavigation = (id) => {
    navigate(`/productionBD/${id}`)
  }

  const toggleExpand = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index))
    } else {
      setExpandedItems([...expandedItems, index])
    }
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ marginTop: '2rem' }}>
      {/* <Link
              to="/temperature"
              style={{ position: 'absolute', top: '10px', right: '10px', overflow: 'hidden' }}
            ></Link> */}

      <div style={{ display: '', alignItems: 'center', marginBottom: '20px' }}>
        <div
          // className="d-flex justify-content-center align-items-center"
          className={classNames(
            'box',
            'd-flex',
            'justify-content-center',
            'align-items-center',
            'd-flex justify-content-center align-items-center',
          )}
        >
          <MdDashboard
            className="icon"
            style={{
              width: '30px',
              height: '30px',
              fill: 'white',
              marginTop: '1px',
              marginLeft: '3px',
            }}
          />
        </div>
        <div style={{ margin: 'rem', paddingLeft: '10px' }}>
          <h5>{assetName} Breakdown</h5>
          <div className="table-container  mobile-wide" style={{ marginTop: '10px' }}>
            <Table className="custom-table" style={{ width: '100%' }}>
              <Thead style={{ backgroundColor: '#000026', color: 'white' }}>
                <Tr>
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>Machine Name</Th>
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>Line Name</Th>
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>Operations</Th>
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>Location</Th>
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>
                    Breakdown Start Date
                  </Th>
                  {/* <Th style={{ backgroundColor: '#002244', color: 'white' }}>Breakdown End Date</Th> */}
                  <Th style={{ backgroundColor: '#002244', color: 'white' }}>Status</Th>
                  <Th style={{ backgroundColor: '#002244', textAlign: 'center' }}>Edit </Th>
                  {/* <Th style={{ textAlign: 'center' }}>Delete</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {filteredData
                  .filter((item) => item.Status === 'open' || item.Status === 'pending') // Filter for 'Open' and 'Pending' status
                  .map((item) => (
                    <tr key={item._id}>
                      <td>{item.MachineName}</td>
                      <td>{item.LineName}</td>
                      <td>{item.Operations}</td>
                      <td>{item.Location}</td>
                      <td>{item.BreakdownStartDate}</td>
                      {/* <td>{item.BreakdownEndDate}</td> */}
                      <td>{item.Status}</td>
                      <td style={{ textAlign: 'center' }}>
                        <NavLink to={`/productionBD/${item._id}`} style={{ color: '#000080' }}>
                          <FaEdit />
                        </NavLink>
                      </td>
                      {/* <td style={{ textAlign: 'center' }}>
                        <button className="btn" style={{ color: 'red' }}>
                          <img src={dlt} alt="" width={30} height={30} />
                          <MdDelete />
                        </button>
                      </td> */}
                    </tr>
                  ))}
              </Tbody>
            </Table>
            <div className="list-view">
              {/* {loading ? (
                <p>Loading...</p>
              ) : ( */}
              <>
                {/* {this.message && (
                  <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'red' }}>
                    {this.message}
                  </p>
                )} */}
                {/* {filteredAssets */}
                {filteredData
                  .filter((item) => item.Status === 'open' || item.Status === 'pending') // Filter for 'Open' and 'Pending' status
                  .map((item, index) => (
                    <div
                      key={item._id}
                      className={`list-item ${expandedItems.includes(index) ? 'expanded' : ''}`}
                    >
                      <div className="expand">
                        {expandedItems.includes(index) ? (
                          <FaChevronUp onClick={() => toggleExpand(index)} />
                        ) : (
                          <FaChevronDown onClick={() => toggleExpand(index)} />
                        )}
                      </div>
                      <div>
                        <span>{item.MachineName}</span> - <span>{item.Location}</span>
                      </div>
                      <div
                        className={`expanded-content ${
                          expandedItems.includes(index) ? 'visible' : 'hidden'
                        }`}
                      >
                        <div className="table-like">
                          <div className="table-row">
                            <div className="table-cell">
                              <strong>BreakdownStartDate:</strong>
                            </div>
                            <div className="table-cell">
                              {new Date(item.BreakdownStartDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="table-row">
                            <div className="table-cell">
                              <strong>Shift:</strong>
                            </div>
                            <div className="table-cell">{item.Shift}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-cell">
                              <strong>LineName:</strong>
                            </div>
                            <div className="table-cell">{item.LineName}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-cell">
                              <strong>Operations:</strong>
                            </div>
                            <div className="table-cell">{item.Operations}</div>
                          </div>
                          <div className="table-row">
                            <div className="table-cell">
                              <strong>status:</strong>
                            </div>
                            <div className="table-cell">{item.Status}</div>
                          </div>
                        </div>
                      </div>
                      <div className="actions">
                        <NavLink to={`/productionBD/${item._id}`} style={{ color: '#000080' }}>
                          <FaEdit />
                        </NavLink>
                        {/* <button
                          className="btn"
                          onClick={() => deleteData(cbm._id)}
                          style={{ color: 'red' }}
                        >
                          <MdDelete />
                        </button> */}
                      </div>
                    </div>
                  ))}
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PMData = ({ assetName, pmData }) => {
  const [expandedItems, setExpandedItems] = useState([])

  const filteredData = pmData.filter((item) => item.AssetName === assetName)

  const deleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://backendmaintenx.onrender.com/api/pm/${id}`)
        .then((response) => {
          console.log('Data deleted:', response.data)
          // Add logic to remove the deleted item from the frontend if necessary
        })
        .catch((error) => {
          console.error('Error deleting data:', error)
        })
    }
  }

  // Toggle expand/collapse for mobile list view
  const toggleExpand = (index) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter((item) => item !== index)
        : [...prevExpandedItems, index],
    )
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ marginTop: '2rem' }}>
      <div className={classNames('box', 'd-flex', 'justify-content-center', 'align-items-center')}>
        <MdDashboard
          className="icon"
          style={{
            width: '30px',
            height: '30px',
            fill: 'white',
            marginTop: '1px',
            marginLeft: '3px',
          }}
        />
      </div>
      <h5>{assetName} PM Data</h5>

      {/* Table view for desktop */}
      <div className="table-container mobile-wide" style={{ margin: '2rem', paddingLeft: '10px' }}>
        <table className="custom-table" style={{ width: '100%' }}>
          <thead className="table-dark">
            <tr>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Asset Name</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Task Name</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Location</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>PM Schedule Date</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Next Schedule Date</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Scheduled Frequency</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Edit</th>
              <th style={{ backgroundColor: '#002244', color: 'white' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{item.AssetName}</td>
                <td>{item.TaskName}</td>
                <td>{item.Location}</td>
                <td>{item.startDate}</td>
                <td>{item.nextDate}</td>
                <td>{item.ScheduledMaintenanceDatesandIntervals}</td>
                <td style={{ textAlign: 'center' }}>
                  <NavLink to={`/editPM/${item._id}`} style={{ color: '#000080' }}>
                    <FaEdit />
                  </NavLink>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn"
                    onClick={() => deleteData(item._id)}
                    style={{ color: 'red' }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* List view for mobile */}
      <div className="list-view" style={{ margin: '2rem', paddingLeft: '10px' }}>
        {filteredData.map((item, index) => (
          <div
            key={item._id}
            className={`list-item ${expandedItems.includes(index) ? 'expanded' : ''}`}
            style={{
              borderBottom: '1px solid #ccc',
              marginBottom: '10px',
              paddingBottom: '10px',
            }}
          >
            <div className="expand" style={{ cursor: 'pointer' }}>
              {expandedItems.includes(index) ? (
                <FaChevronUp onClick={() => toggleExpand(index)} />
              ) : (
                <FaChevronDown onClick={() => toggleExpand(index)} />
              )}
            </div>
            <div>
              <strong>{item.AssetName}</strong> - <span>{item.TaskName}</span>
            </div>
            {expandedItems.includes(index) && (
              <div className="expanded-content" style={{ marginTop: '10px' }}>
                <p>
                  <strong>Location:</strong> {item.Location}
                </p>
                <p>
                  <strong>PM Schedule Date:</strong> {item.startDate}
                </p>
                <p>
                  <strong>Next Schedule Date:</strong> {item.nextDate}
                </p>
                <p>
                  <strong>Scheduled Frequency:</strong> {item.ScheduledMaintenanceDatesandIntervals}
                </p>
                <div className="actions" style={{ textAlign: 'center', marginTop: '10px' }}>
                  <NavLink
                    to={`/editPM/${item._id}`}
                    style={{ color: '#000080', marginRight: '15px' }}
                  >
                    <FaEdit />
                  </NavLink>
                  <button
                    className="btn"
                    onClick={() => deleteData(item._id)}
                    style={{ color: 'red' }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Breakdown = ({ assetName }) => {
  const [usernos, setUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()
  const [selectedUsers, setSelectedUsers] = useState([])
  // const filteredData = breakdown.filter((item) => item.MachineName === assetName)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const [formData, setFormData] = useState({
    MachineName: assetName,
    BreakdownStartDate: '',
    BreakdownEndDate: '',
    BreakdownStartTime: '',
    BreakdownEndTime: '',
    Shift: '',
    LineName: '',
    Operations: '',
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

  const username = useSelector((state) => state.auth.userInfo?.name)

  const apiKey = 'NDE1MDY2NGM2Mzc3NTI0ZjQzNmE1YTM5NDY0YzZlNzU='
  const numbers = '6020804148' // Replace with the phone numbers
  const data1 = 'test'
  const data2 = 'test'
  const sender = 'AAABRD'

  const sendSMS = (formData, selectedUsers, loggedInUsername) => {
    const { MachineName, BreakdownStartDate, Shift, LineName, Operations, BreakdownPhenomenons } =
      formData
    // Formulate a simple message
    const message = encodeURIComponent(
      'Breakdown For ' +
        MachineName +
        // 'Date of Breakdown Start' +
        // BreakdownStartDate +
        ' please visit concerned department Details are ' +
        loggedInUsername +
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
        // console.log(selected)
      })
  }
  const handleButtonClick = () => {
    // Call the SMS sending function
    sendSMS(formData, selectedUsers, username)
  }

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
      Operations,
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
    setSuccessMessage('Form submitted successfully!')

    console.log(
      MachineName,
      Location,
      BreakdownStartDate,
      BreakdownEndDate,
      BreakdownStartTime,
      BreakdownEndTime,
      Shift,
      LineName,
      Operations,
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
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)

    fetch('https://backendmaintenx.onrender.com/api/breakdown', {
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
        Operations,
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
  return (
    <div className="card shadow-sm mx-auto" style={{ marginTop: '2rem' }}>
      {/* <Link
              to="/temperature"
              style={{ position: 'absolute', top: '10px', right: '10px', overflow: 'hidden' }}
            ></Link> */}

      <div style={{ display: '', alignItems: 'center', marginBottom: '20px' }}>
        <div
          // className="d-flex justify-content-center align-items-center"
          className={classNames(
            'box',
            'd-flex',
            'justify-content-center',
            'align-items-center',
            'd-flex justify-content-center align-items-center',
          )}
        >
          <MdDashboard
            className="icon"
            style={{
              width: '30px',
              height: '30px',
              fill: 'white',
              marginTop: '1px',
              marginLeft: '3px',
            }}
          />
        </div>
        <div style={{ margin: '2rem', paddingLeft: '10px' }}>
          <div
          // className="container"
          // style={{
          //   border: '2px solid #ccc',
          //   backgroundColor: '',
          //   padding: '20px',
          //   borderRadius: '10px',
          //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          //   width: '95%',
          // }}
          >
            {/* Display success message if it exists */}
            {successMessage && (
              <div className="alert alert-success" role="alert" style={{ marginTop: '10px' }}>
                {successMessage}
              </div>
            )}

            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-md-6">
                  <label htmlFor="machineName" style={{ marginBottom: '10px', fontSize: '16px' }}>
                    Machine Name:
                  </label>
                  <input
                    type="string"
                    id="assetName"
                    className="form-control col-sm-6"
                    // name="BreakdownStartTime"
                    value={assetName}
                    onChange={handleChange}
                  ></input>
                  {/* <Select
              className="form-control col-sm-6"
              required
              name="MachineName"
              value={assetNames.find((asset) => asset === formData.AssetName)}
              onChange={(selectedOption) =>
                handleChange({ target: { name: 'MachineName', value: selectedOption.value } })
              }
              options={assetNames.map((asset) => ({ label: asset, value: asset }))}
              isSearchable
              placeholder="Select a machine"
              styles={{
                control: (provided) => ({
                  ...provided,
                  marginBottom: '10px',
                }),
              }}
            /> */}
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
                </div>
                <div className="col-md-6">
                  <label htmlFor="lineName" style={{ marginBottom: '10px' }}>
                    Line Name:
                  </label>
                  <select
                    className="form-control col-sm-6"
                    required
                    name="LineName"
                    value={formData.LineName}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="BOSSES">BOSSES</option>
                    <option value="ARMATURE SHAFT/ RCI GEAR SHAFT">
                      ARMATURE SHAFT/ RCI GEAR SHAFT
                    </option>
                    <option value="SPROCKET">SPROCKET</option>
                    <option value="WORM SHAFT">WORM SHAFT</option>
                    <option value="K B CELL">K B CELL</option>
                    <option value="SSP TSP">SSP TSP</option>
                    <option value="HEAT TREATMENT">HEAT TREATMENT</option>
                    <option value="FORGING">FORGING</option>
                    <option value="CHANGE ARM/ BRACKET">CHANGE ARM/ BRACKET</option>
                    <option value="BSC">BSC</option>
                    <option value="SECTOR LEVER">SECTOR LEVER</option>
                    <option value="SLIDER BLOCK">SLIDER BLOCK</option>
                    <option value="CAM SHAFT GRINDING">CAM SHAFT GRINDING</option>
                    <option value="CAM SHAFT SOFT">CAM SHAFT SOFT</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="operations" style={{ marginBottom: '10px' }}>
                    Operations:
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control col-sm-6"
                    name="Operations"
                    value={formData.Operations}
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
                {/* <div className="row lg-2">
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
                                // checked={selectedUserNumbers.includes(user.phoneNumber)}
                                // onChange={() => handleUserSelect(user.phoneNumber)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`checkbox-${user.phoneNumber}`}
                              >
                                {user.name}
                              </label>
                            </div>
                          </div>
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
                </div> */}
                {/* </div> */}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

BreakdownData.propTypes = {
  assetName: PropTypes.string.isRequired,
  breakdownData: PropTypes.array.isRequired,
}

PMData.propTypes = {
  assetName: PropTypes.string.isRequired,
  pmData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      AssetName: PropTypes.string.isRequired,
      Location: PropTypes.string.isRequired,
      TaskName: PropTypes.string.isRequired,
      TaskDescription: PropTypes.string.isRequired,
      ScheduledMaintenanceDatesandIntervals: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      nextDate: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

Breakdown.propTypes = {
  assetName: PropTypes.string.isRequired,
  Breakdown: PropTypes.string.isRequired,
}

export default Inventory
