import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import dlt from '../assetTable/delete.png'
import { CTable, CTableHead, CButton, CInputGroup, CFormControl } from '@coreui/react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { CContainer, CSpinner } from '@coreui/react'

class AssetTable extends React.Component {
  state = {
    assets: [],
    assetmasters: [],
    searchLocation: '', // New state for the search term
    message: '',
    searchQuery: '',
    loading: true,
  }

  componentDidMount() {
    axios
      .get('https://mms-backend-n2zv.onrender.com/api/assets') // Adjust the endpoint if necessary
      .then((response) => {
        // If the response is an array, simply set it to assets.
        // If it's an object, place it in an array as you've shown.
        this.setState({
          assets: Array.isArray(response.data) ? response.data : [response.data],
          loading: false,
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        this.setState({
          loading: false, // Set loading to false in case of an error
          message: 'Error fetching data. Please try again.',
        })
        alert('Error fetching data')
      })
  }

  deleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://mms-backend-n2zv.onrender.com/api/assets/${id}`)
        .then((response) => {
          console.log('Data deleted:', response.data)

          // Delete from frontend
          const index = this.state.assets.findIndex((asset) => asset._id === id)
          if (index !== -1) {
            const newAssets = [...this.state.assets]
            newAssets.splice(index, 1)
            this.setState({
              assets: newAssets,
              message: 'Data successfully deleted!',
            })

            // Set timeout to clear the success message after 3 seconds (adjust as needed)
            setTimeout(() => {
              this.setState({
                message: '',
              })
            }, 2000)
          }
        })
        .catch((error) => {
          console.error('Error deleting data:', error)
          this.setState({
            message: 'Error deleting data. Please try again.',
          })

          // Set timeout to clear the error message after 3 seconds (adjust as needed)
          setTimeout(() => {
            this.setState({
              message: '',
            })
          }, 2000)
        })
    }
  }
  handleClick = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }))
  }

  handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()

    // Filter assets based on the search query
    const filteredAssets = this.state.assets.filter((asset) => {
      const taskLocationLower = (asset.Location || '').toLowerCase()
      const taskDescriptionLower = (asset.AssetName || '').toLowerCase()
      // const scheduledMaintenanceLower = (
      //   asset.ScheduledMaintenanceDatesandIntervals || ''
      // ).toLowerCase()
      // const statusLower = (asset.status || '').toLowerCase()

      return taskLocationLower.includes(query) || taskDescriptionLower.includes(query)
      // scheduledMaintenanceLower.includes(query) ||
      // statusLower.includes(query)
    })

    this.setState({
      filteredAssets,
      // searchLocation: e.target.value,
      searchQuery: query,
    })
  }

  render() {
    // const { assets } = this.state // Destructuring assets from state for ease of access

    const { assets, filteredAssets, searchLocation, searchQuery, loading } = this.state
    const { isClicked } = this.state
    // Filter assets to include only rows with all values filled
    const validatedAssets = assets.filter(
      (asset) =>
        asset.AssetName &&
        asset.AssetName.trim() !== '' &&
        asset.Location &&
        asset.Location.trim() !== '',
    )

    return (
      <>
        <div className="container">
          <NavLink to="/assetForm">
            <CButton
              color="info"
              // shape="rounded-pill"
              className="mb-2"
              style={{ marginTop: '5px' }}
            >
              Add New
            </CButton>

            {/* <CInputGroup className="mb-3"> */}
            {/* </CInputGroup> */}
          </NavLink>
          <label
            htmlFor="searchTask"
            style={{ marginLeft: '70%', '@media (max-width:300px)': { marginLeft: '20%' } }}
          >
            <span role="img" aria-label="search-icon"></span>
          </label>
          <input
            placeholder="Search by Asset/Location"
            style={{
              marginBottom: '10px',
              padding: '8px',
              border: '1px solid ',
              borderRadius: '4px',
              transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out',
              backgroundColor: isClicked ? '#ccc' : 'transparent',
            }}
            onClick={this.handleClick}
            value={this.searchQuery}
            onChange={this.handleSearchChange}
          />
          <NavLink to="/table">
            <CButton
              color="info"
              // shape="rounded-pill"
              className="mb-2"
              style={{ marginTop: '5px' }}
            >
              Asset Schedule
            </CButton>

            {/* <CInputGroup className="mb-3"> */}
            {/* </CInputGroup> */}
          </NavLink>
          <CTable bordered striped hover responsive>
            <CTableHead color="dark">
              <tr>
                <th style={{ textAlign: 'center' }}>Sr No</th>
                <th style={{ textAlign: 'center' }}>Machine Code</th>
                <th style={{ textAlign: 'center' }}>Machine Type</th>
                <th style={{ textAlign: 'center' }}>Location</th>
                {/* <th style={{ textAlign: 'center' }}>CMD</th> */}
                {/* <th style={{ textAlign: 'center' }}>CMDFrequency</th> */}
                {/* <th style={{ textAlign: 'center' }}>TMD</th> */}
                {/* <th style={{ textAlign: 'center' }}>TMDFrequency</th> */}
                <th style={{ textAlign: 'center' }}>Edit</th>
                <th style={{ textAlign: 'center' }}>Delete</th>
                <th>Images</th>
              </tr>
            </CTableHead>
            <tbody>
              {this.state.message && (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: 'center', fontStyle: 'italic', color: 'red' }}
                  >
                    {this.state.message}
                  </td>
                </tr>
              )}
              {(this.state.searchQuery ? filteredAssets : validatedAssets).map((asset) => (
                <tr key={asset._id}>
                  <td style={{ textAlign: 'center' }}>{asset.SrNo}</td>
                  <td style={{ textAlign: 'center' }}>{asset.AssetName}</td>
                  <td style={{ textAlign: 'center' }}>{asset.MachineType}</td>
                  <td style={{ textAlign: 'center' }}>{asset.Location}</td>
                  {/* <td style={{ textAlign: 'center' }}>{asset.CMD}</td>
                  <td style={{ textAlign: 'center' }}>{asset.CMDFrequency}</td>
                  <td style={{ textAlign: 'center' }}>{asset.TMD}</td>
                  <td style={{ textAlign: 'center' }}>{asset.TMDFrequency}</td> */}
                  <td style={{ textAlign: 'center' }}>
                    <NavLink to={`/editasset/${asset._id}`} style={{ color: '#000080' }}>
                      <FaEdit />
                    </NavLink>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn"
                      onClick={() => this.deleteData(asset._id)}
                      style={{ color: 'red' }}
                    >
                      {/* <img src={dlt} alt="" width={30} height={30} /> */}
                      <MdDelete />
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <NavLink to={`/assetRecord/${asset._id}`}>
                      <img src={asset.Image} height={50} width={50} />
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
        </div>
      </>
    )
  }
}

export default AssetTable
