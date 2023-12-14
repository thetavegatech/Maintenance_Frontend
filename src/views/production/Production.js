import React from 'react'
// import BDList from './BDList';
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
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
      // searchLocation: e.target.value,
      searchQuery: query,
    })
  }

  componentDidMount() {
    const { selectedLocation } = this.state

    const apiUrl = selectedLocation
      ? `http://localhost:5000/getBreakdownData?location=${selectedLocation}`
      : 'http://localhost:5000/getBreakdownData'

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

  render() {
    // const { breakdowns, selectedLocation } = this.state
    const { breakdowns, filteredAssets, searchLocation, searchQuery } = this.state
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
            {/* <h5>Search By Plant</h5> */}
            <label htmlFor="searchTask" style={{ marginLeft: '70%' }}>
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
            </select>
          </div>
          <CTable bordered striped hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Machine Name</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>
                  BreakDownStartDate
                </CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Breakdown Type</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Location</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>LineName</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Remark</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Status</CTableHeaderCell>
                <CTableHeaderCell style={{ textAlign: 'center' }}>Edit</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
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
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      </>
    )
  }
}
export default BDList
