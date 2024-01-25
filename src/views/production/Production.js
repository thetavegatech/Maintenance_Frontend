import React from 'react'
import { format } from 'date-fns'
import * as XLSX from 'xlsx'

// import BDList from './BDList';
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import loadingGif from '../assetTable/loader.gif'

class BDList extends React.Component {
  state = {
    breakdowns: [],
    selectedLocation: '',
    searchLocation: '', // New state for the search term
    message: '',
    searchQuery: '',
    isHovered: false,
    startDate: '',
    endDate: '',
    loading: true, // New state for loading
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
    // const filteredAssets = this.state.breakdowns.filter((breakDown) => {
    // const taskLocationLower = (breakDown.Location || '').toLowerCase()

    const filteredAssets = this.state.breakdowns.filter((breakDown) => {
      const taskLocationLower = (breakDown.Location || '').toLowerCase()
      const startDateMatch =
        !this.state.startDate ||
        (breakDown.BreakdownStartDate && breakDown.BreakdownStartDate >= this.state.startDate)
      const endDateMatch =
        !this.state.endDate ||
        (breakDown.BreakdownStartDate && breakDown.BreakdownStartDate <= this.state.endDate)

      // return taskLocationLower.includes(query)
      return (
        taskLocationLower.includes(query) && startDateMatch && endDateMatch
        // ... other conditions if needed
      )
    })

    this.setState({
      filteredAssets,
      // searchLocation: e.target.value,
      searchQuery: query,
    })
  }

  handleDateChange = (field, value) => {
    this.setState({
      [field]: value,
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
        this.setState({ loading: false })
      })
  }

  handleLocationChange = (event) => {
    this.setState({ selectedLocation: event.target.value })
  }

  exportToExcel = () => {
    const { breakdowns } = this.state
    // const dataToExport = searchQuery ? filteredBreakdowns : breakdowns
    const dataToExport = breakdowns
    const exportData = dataToExport.map((item) => ({
      Date: format(new Date(item.BreakdownStartDate), 'HH:mm:ss dd-MM-yyyy'),
      MachineName: item.MachineName,
      BreakdownStartDate: item.BreakdownStartDate,
      BreakdownType: item.BreakdownType,
      BreakdownEndDate: item.BreakdownEndDate,
      Shift: item.Shift,
      Operations: item.Operations,
      BreakdownPhenomenons: item.BreakdownPhenomenons,
      WhyWhyAnalysis: item.WhyWhyAnalysis,
      OCC: item.OCC,
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
    // const { breakdowns, selectedLocation } = this.state
    const { breakdowns, filteredAssets, searchLocation, searchQuery, loading } = this.state
    const openBreakdowns = breakdowns.filter((breakdown) => breakdown.Status === 'pending')

    const validatedAssets = breakdowns.filter(
      (breakdowns) => breakdowns.Location && breakdowns.Location.trim() !== '',
    )

    const { isHovered } = this.state

    return (
      <>
        <div className="container">
          {/* </div> */}
          {/* <div className="table-controls"> */}

          <div>
            <NavLink to="/breakdownForm">
              {' '}
              <CButton
                color="info"
                // shape="rounded-pill"
                className="mb-2"
                style={{ marginTop: '5px' }}
              >
                Add New
              </CButton>
            </NavLink>
            <CButton
              color="info"
              type="button"
              style={{ margin: '1rem' }}
              onClick={this.exportToExcel}
            >
              Export to Excel
            </CButton>
            <label htmlFor="searchTask" style={{ marginTop: 'rem' }}>
              <span role="img" aria-label="search-icon"></span>
            </label>
            <select
              value={this.searchQuery}
              onChange={this.handleSearchChange}
              style={{
                marginLeft: '20rem',
                marginBottom: '10px',
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
              <option value="Plant 1">Plant 1</option>
              <option value="Plant 2">Plant 2</option>
              <option value="Plant 3">Plant 3</option>
            </select>

            {/* <div style={{ marginTop: '1rem' }}> */}
            <label
              htmlFor="startDate"
              style={{
                marginLeft: '1rem',
                marginRight: '0.2rem',
                fontSize: '16px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                '@media (max-width: 750px)': {
                  // marginLeft: '3rem',
                  // marginRight: '0.8rem',
                  fontSize: '14px',
                },
              }}
            >
              From Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={this.state.startDate}
              onChange={(e) => this.handleDateChange('startDate', e.target.value)}
              style={{
                padding: '6px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '10px',
                fontSize: '14px',
              }}
            />
            <label
              htmlFor="endDate"
              style={{
                marginRight: 'px',
                fontSize: '16px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
            >
              To Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={this.state.endDate}
              onChange={(e) => this.handleDateChange('endDate', e.target.value)}
              style={{
                padding: '6px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '10px',
                fontSize: '14px',
                marginBottom: '0.5rem',
              }}
            />
            {/* </div> */}
            {/* <h5>Search By Plant</h5> */}
            {/* <label htmlFor="searchTask" style={{ marginTop: '2rem' }}>
              <span role="img" aria-label="search-icon"></span>
            </label>
            <select
              value={this.searchQuery}
              onChange={this.handleSearchChange}
              style={{
                // marginLeft: '70%',
                marginBottom: '10px',
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
              <option value="Plant 1">Plant 1</option>
              <option value="Plant 2">Plant 2</option>
              <option value="Plant 3">Plant 3</option>
            </select> */}
          </div>
          <CTable bordered striped hover responsive style={{ marginTop: '1rem' }}>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Machine Name</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>
                  BreakDown Start Date
                </CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Breakdown Type</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Location</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Line Name</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Remark</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Status</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Edit</CTableHeaderCell>
                {/* <CTableHeaderCell style={{ textAlign: 'center' }}>excel</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loading ? ( // Show loader when loading is true
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    {/* Use an image tag for the loading GIF */}
                    <img src={loadingGif} alt="Loading..." />
                    <p>Loading...</p>
                  </td>
                </tr>
              ) : (
                <>
                  {this.state.message && (
                    <CTableRow>
                      <CTableDataCell colSpan="8">{this.state.message}</CTableDataCell>
                    </CTableRow>
                  )}
                  {(this.state.searchQuery
                    ? filteredAssets.filter((breakdown) => openBreakdowns.includes(breakdown))
                    : validatedAssets.filter((breakdown) => openBreakdowns.includes(breakdown))
                  ).map((breakdown) => (
                    <CTableRow key={breakdown._id}>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.MachineName}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.BreakdownStartDate}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.BreakdownType}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.Location}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.LineName}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.Remark}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {breakdown.Status}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        <NavLink to={`/pbdStatus/${breakdown._id}`} style={{ color: '#000080' }}>
                          <FaEdit />
                        </NavLink>
                      </CTableDataCell>
                      {/* <CButton
                    type="button"
                    style={{ margin: '1rem', backgroundColor: 'grey' }}
                    onClick={this.exportToExcel}
                  >
                    Export to Excel
                  </CButton> */}
                    </CTableRow>
                  ))}
                </>
              )}
            </CTableBody>
          </CTable>
          {/* <CButton
            color="info"
            type="button"
            style={{ margin: '1rem', backgroundColor: 'grey' }}
            onClick={this.exportToExcel}
          >
            Export to Excel
          </CButton> */}
        </div>
      </>
    )
  }
}
export default BDList
