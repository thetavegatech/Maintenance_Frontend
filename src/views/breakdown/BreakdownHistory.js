import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { CContainer, CSpinner } from '@coreui/react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'

class BreakdownHistory extends React.Component {
  state = {
    breakdowns: [],
    selectedMachine: '',
    // mtbf: '',
    mttr: '',
    selectedLocation: '',
    searchLocation: '', // New state for the search term
    message: '',
    searchQuery: '',
    isHovered: false,
    loading: true,
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()

    // Filter assets based on the search query
    const filteredAssets = this.state.breakdowns.filter((breakDown) => {
      const taskLocationLower = (breakDown.Location || '').toLowerCase()
      // const taskDescriptionLower = (asset.TaskDescription || '').toLowerCase()
      // const scheduledMaintenanceLower = (
      //   asset.ScheduledMaintenanceDatesandIntervals || ''
      // ).toLowerCase()
      // const statusLower = (asset.status || '').toLowerCase()

      return taskLocationLower.includes(query)
      // taskDescriptionLower.includes(query) ||
      // scheduledMaintenanceLower.includes(query) ||
      // statusLower.includes(query)
    })

    this.setState({
      filteredAssets,
      searchLocation: e.target.value,
      searchQuery: query,
    })
  }

  componentDidMount() {
    const { selectedLocation } = this.state

    const apiUrl = selectedLocation
      ? `https://mms-backend-n2zv.onrender.com/getBreakdownData?location=${selectedLocation}`
      : 'https://mms-backend-n2zv.onrender.com/getBreakdownData'

    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({
          breakdowns: Array.isArray(response.data) ? response.data : [response.data],
          loading: false,
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
      })
  }

  handleLocationChange = (event) => {
    this.setState({ selectedLocation: event.target.value })
  }

  calculateMTTR = () => {
    const { breakdowns, selectedMachine } = this.state

    if (!selectedMachine) {
      this.setState({ mttr: 'Please select a machine.' })
      return
    }

    const filteredBreakdowns = breakdowns.filter(
      (breakdown) => breakdown.MachineName === selectedMachine,
    )

    if (filteredBreakdowns.length === 0) {
      this.setState({ mttr: 'No breakdowns found for selected machine.' })
      return
    }

    let totalRepairTimeMs = 0

    filteredBreakdowns.forEach((breakdown) => {
      const startDate = new Date(breakdown.BreakdownStartDate)
      const endDate = new Date(breakdown.BreakdownEndDate)
      const repairTimeMs = endDate - startDate
      totalRepairTimeMs += repairTimeMs
    })

    const totalRepairTimeHours = totalRepairTimeMs / (1000 * 3600) // Convert milliseconds to hours

    const mttr = totalRepairTimeHours / filteredBreakdowns.length

    this.setState({ mttr })
  }

  calculateMTBF = () => {
    const { breakdowns, selectedMachine } = this.state

    if (!selectedMachine) {
      this.setState({ mtbf: 'Please select a machine.' })
      return
    }

    const filteredBreakdowns = breakdowns.filter(
      (breakdown) => breakdown.MachineName === selectedMachine,
    )

    if (filteredBreakdowns.length === 0) {
      this.setState({ mtbf: 'No breakdowns found for selected machine.' })
      return
    }

    const fixedOperatingTime = 208 * 3600 * 1000 // 8 hours in milliseconds
    const numberOfFailures = filteredBreakdowns.length

    const mtbf = fixedOperatingTime / (numberOfFailures * 1000 * 3600) // Convert milliseconds to hours

    this.setState({ mtbf })
  }

  exportToExcel = () => {
    const { breakdowns, searchLocation } = this.state

    // Filter data based on the selected plant
    const filteredData = searchLocation
      ? breakdowns.filter((breakdown) => breakdown.Location === searchLocation)
      : breakdowns
    // const dataToExport = searchQuery ? filteredBreakdowns : breakdowns
    const dataToExport = breakdowns
    // const exportData = dataToExport.map((item) => ({
    const exportData = filteredData.map((item) => ({
      Date: format(new Date(item.BreakdownStartDate), 'dd-MM-yyyy HH:mm:ss'),
      MachineName: item.MachineName,
      BreakdownStartDate: item.BreakdownStartDate,
      BreakdownType: item.BreakdownType,
      BreakdownEndDate: item.BreakdownEndDate,
      Shift: item.Shift,
      Operations: item.Operations,
      BreakdownPhenomenons: item.BreakdownPhenomenons,
      WhyWhyAnalysis: item.WhyWhyAnalysis,
      // OCC: item.OCC,
      RootCause: item.RootCause,
      PreventiveAction: item.PreventiveAction,
      CorrectiveAction: item.CorrectiveAction,
      TargetDate: item.TargetDate,
      Responsibility: item.Responsibility,
      HD: item.HD,
      Status: item.Status,
      SpareParts: item.SpareParts,
      Cost: item.Cost,
      Location: item.Location,
      LineName: item.LineName,
      Remark: item.Remark,
      // Status: item.Status,
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'ReportData')
    XLSX.writeFile(wb, 'reportdata.xlsx')
  }

  render() {
    // const { breakdowns, selectedMachine, mttr } = this.state;
    const { breakdowns, selectedMachine, mtbf, mttr, filteredAssets, searchLocation, loading } =
      this.state
    const openBreakdowns = breakdowns.filter((breakdown) => breakdown.Status === 'close')

    const validatedAssets = breakdowns.filter(
      (breakdowns) => breakdowns.Location && breakdowns.Location.trim() !== '',
    )

    const { isHovered } = this.state

    return (
      <>
        <div className="container" style={{ marginTop: '0px' }}>
          <div>
            <label htmlFor="searchTask" style={{ marginLeft: '0%' }}>
              <span role="img" aria-label="search-icon"></span>
            </label>
            <select
              value={this.searchQuery}
              onChange={this.handleSearchChange}
              style={{
                // display: 'flex',
                marginBottom: '0px',
                padding: '8px',
                border: '1px solid',
                borderRadius: '4px',
                transition: 'border-color 0.3s ease-in-out',
                backgroundColor: isHovered ? '#f0f0f0' : 'transparent',
              }}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <option>Search by Plant</option>
              <option value="AAAPL-27">AAAPL-27</option>
              <option value="AAAPL-29">AAAPL-29</option>
              <option value="AAAPL- 89">AAAPL- 89</option>
              <option value="DPAPL - 236">DPAPL - 236</option>
              <option value=" DPAPL- GN"> DPAPL- GN</option>
            </select>
            <CButton
              color="info"
              type="button"
              style={{ margin: '1rem' }}
              onClick={this.exportToExcel}
            >
              Export to Excel
            </CButton>
          </div>
          <CTable
            bordered
            striped
            hover
            responsive
            style={{
              marginTop: '20px',
              borderCollapse: 'collapse',
              width: '100%',
            }}
          >
            <CTableHead color="dark">
              <tr>
                <th style={{ textAlign: 'center' }}>Machine Code</th>
                <th style={{ textAlign: 'center' }}>BreakDown Start Date</th>
                <th style={{ textAlign: 'center' }}>BreakDown End Date</th>
                <th style={{ textAlign: 'center' }}>Shift</th>
                <th style={{ textAlign: 'center' }}>Line Name</th>
                <th style={{ textAlign: 'center' }}>Location</th>
                <th style={{ textAlign: 'center' }}>End Date</th>
                <th style={{ textAlign: 'center' }}>Status</th>
                <th style={{ textAlign: 'center' }}>Edit</th>
                <th>Images</th>
              </tr>
            </CTableHead>
            <tbody>
              {this.state.message && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    {this.state.message}
                  </td>
                </tr>
              )}
              {(this.state.searchQuery
                ? filteredAssets.filter((breakdown) => openBreakdowns.includes(breakdown))
                : validatedAssets.filter((breakdown) => openBreakdowns.includes(breakdown))
              ).map((breakdown) => (
                <tr key={breakdown._id}>
                  <td style={{ textAlign: 'center' }}>{breakdown.MachineName}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.BreakdownStartDate}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.BreakdownEndDate}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.Shift}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.LineName}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.Location}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.BreakdownEndDate}</td>
                  <td style={{ textAlign: 'center' }}>{breakdown.Status}</td>
                  <td style={{ textAlign: 'center' }}>
                    <NavLink to={`/pbdStatus/${breakdown._id}`} style={{ color: '#000080' }}>
                      <FaEdit />
                    </NavLink>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <NavLink to={`/breakDownRecord/${breakdown._id}`}>
                      <img src={breakdown.Image} height={50} width={50} />
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </CTable>
          {loading && (
            <div className="loader-container">
              {/* <div className="loader">Loading...</div> */}
              <CSpinner color="primary" />
              <div className="loader">Loading...</div>
            </div>
          )}

          <div
            className="container"
            style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
            }}
          >
            <div className="row g-2">
              <div className="col-md-6" style={{ marginBottom: '10px' }}>
                <label>Select Machine: </label>
                <select
                  onChange={(e) => {
                    this.setState({ selectedMachine: e.target.value }, this.calculateMTBF)
                  }}
                  value={selectedMachine}
                  style={{ marginLeft: '10px', padding: '5px' }}
                >
                  <option value="">Select Machine</option>
                  {Array.from(new Set(breakdowns.map((breakdown) => breakdown.MachineName))).map(
                    (machineName) => (
                      <option key={machineName} value={machineName}>
                        {machineName}
                      </option>
                    ),
                  )}
                </select>
                {/* <button
                  onClick={this.calculateMTBF}
                  style={{
                    marginLeft: '10px',
                    padding: '8px',
                    // backgroundColor: 'darkgrey',
                    color="info",
                    shape="rounded-pill"
                    // border: '1px solid black',
                    // cursor: 'pointer',
                  }}
                >
                  Calculate MTBF
                </button> */}
                <CButton
                  color="info"
                  onClick={this.calculateMTBF}
                  // shape="rounded-pill"
                  className="mb-2"
                  marginLeft="20px"
                  padding="8px"
                  style={{ marginTop: '5px', marginLeft: '10px' }}
                >
                  Calculate MTBF
                </CButton>
              </div>
              <div className="col-md-6" style={{ marginBottom: '10px' }}>
                <label style={{ marginLeft: '' }}>MTBF (hours): </label>
                <input
                  type="text"
                  value={mtbf}
                  readOnly
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </div>

              <div className="col-md-6" style={{ marginBottom: '10px' }}>
                <label>Select Machine: </label>
                <select
                  onChange={(e) => {
                    this.setState({ selectedMachine: e.target.value }, this.calculateMTTR)
                  }}
                  value={selectedMachine}
                  style={{ marginLeft: '10px', padding: '5px' }}
                >
                  <option value="">Select Machine</option>
                  {Array.from(new Set(breakdowns.map((breakdown) => breakdown.MachineName))).map(
                    (machineName) => (
                      <option key={machineName} value={machineName}>
                        {machineName}
                      </option>
                    ),
                  )}
                </select>
                {/* <button
                  onClick={this.calculateMTTR}
                  style={{
                    marginLeft: '10px',
                    padding: '8px',
                    // backgroundColor: 'darkgrey',
                    color: '',
                    border: '1px solid black',
                    cursor: 'pointer',
                  }}
                >
                  Calculate MTTR
                </button> */}
                <CButton
                  color="info"
                  onClick={this.calculateMTTR}
                  // shape="rounded-pill"
                  className="mb-2"
                  marginLeft="20px"
                  padding="8px"
                  style={{ marginTop: '5px', marginLeft: '10px' }}
                >
                  Calculate MTTR
                </CButton>
              </div>
              <div className="col-md-6" style={{ marginBottom: '10px' }}>
                <label style={{ marginLeft: '' }}>MTTR (hours): </label>
                <input
                  type="text"
                  value={mttr}
                  readOnly
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default BreakdownHistory
