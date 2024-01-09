import React from 'react'
// import BDList from './BDList';
import axios from 'axios'
import { FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { CInput } from '@coreui/react'
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
    // const taskDescriptionLower = (asset.TaskDescription || '').toLowerCase()
    // const scheduledMaintenanceLower = (
    //   asset.ScheduledMaintenanceDatesandIntervals || ''
    // ).toLowerCase()
    // const statusLower = (asset.status || '').toLowerCase()

    const filteredAssets = this.state.breakdowns.filter((breakDown) => {
      const taskLocationLower = (breakDown.Location || '').toLowerCase()
      const startDateMatch =
        !this.state.startDate ||
        (breakDown.BreakdownStartDate && breakDown.BreakdownStartDate >= this.state.startDate)
      const endDateMatch =
        !this.state.endDate ||
        (breakDown.BreakdownStartDate && breakDown.BreakdownStartDate <= this.state.endDate)
      // return taskLocationLower.includes(query)
      // taskDescriptionLower.includes(query) ||
      // scheduledMaintenanceLower.includes(query) ||
      // statusLower.includes(query)
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

  handleDateChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  render() {
    const { breakdowns, filteredAssets, searchLocation, searchQuery } = this.state
    const openBreakdowns = breakdowns.filter((breakdown) => breakdown.Status === 'open')
    const validatedAssets = breakdowns.filter(
      (breakdowns) => breakdowns.Location && breakdowns.Location.trim() !== '',
    )

    const { isHovered } = this.state

    return (
      <>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="startDate"
            value={this.state.startDate}
            onChange={(e) => this.handleDateChange('startDate', e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="endDate">End Date: </label>
          <input
            type="date"
            id="endDate"
            value={this.state.endDate}
            onChange={(e) => this.handleDateChange('endDate', e.target.value)}
          />
        </div>

        <div className="container">
          <label htmlFor="searchTask" style={{ marginLeft: '0%' }}>
            <span role="img" aria-label="search-icon"></span>
          </label>
          <select
            value={this.searchQuery}
            onChange={this.handleSearchChange}
            style={{
              display: 'flex',
              marginBottom: '0%',
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
          <div className="table-responsive-sm">
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
                <CTableRow>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Machine Name
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    BreakDown Start Date
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Shift
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Location
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Line Name
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Operations
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ textAlign: 'center', color: 'white' }}>
                    Edit
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {this.state.message && (
                  <CTableRow>
                    <CTableDataCell colSpan="8" style={{ textAlign: 'center' }}>
                      {this.state.message}
                    </CTableDataCell>
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
                      {breakdown.Shift}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {breakdown.Location}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {breakdown.LineName}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {breakdown.Operations}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      {breakdown.Status}
                    </CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>
                      <NavLink to={`/productionBD/${breakdown._id}`} style={{ color: '#000080' }}>
                        <FaEdit />
                      </NavLink>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </div>
      </>
    )
  }
}
export default BDList
