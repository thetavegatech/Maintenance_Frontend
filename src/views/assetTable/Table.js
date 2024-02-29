import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import dlt from '../assetTable/delete.png'
import { CTable, CTableHead, CButton, CInputGroup, CFormControl } from '@coreui/react'
import { MdDelete, MdEdit } from 'react-icons/md'
import PropTypes from 'prop-types'
import { FaEdit } from 'react-icons/fa'
import { CContainer, CSpinner } from '@coreui/react'

class Table extends React.Component {
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
      .get('https://mms-backend-n2zv.onrender.com/api/assets')
      .then((response) => {
        this.setState({
          assets: Array.isArray(response.data) ? response.data : [response.data],
          loading: false,
        })

        console.log('Assets:', this.state.assets)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
      })
  }

  // New method to handle delete maintenance set
  deleteMaintenanceSet = (assetId, setId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this maintenance set?')
    if (isConfirmed) {
      axios
        .delete(`https://mms-backend-n2zv.onrender.com/api/assets/${assetId}/maintenance/${setId}`)
        .then((response) => {
          console.log('Maintenance set deleted:', response.data)

          // Update frontend after deletion
          const updatedAssets = this.state.assets.map((asset) => {
            if (asset._id === assetId) {
              // Find the maintenance set index and remove it
              const updatedMaintenanceData = asset.maintenanceData.filter(
                (set) => set._id !== setId,
              )
              asset.maintenanceData = updatedMaintenanceData
            }
            return asset
          })

          this.setState({
            assets: updatedAssets,
            message: 'Maintenance set successfully deleted!',
          })

          // Set timeout to clear the success message after 3 seconds (adjust as needed)
          setTimeout(() => {
            this.setState({
              message: '',
            })
          }, 2000)
        })
        .catch((error) => {
          console.error('Error deleting maintenance set:', error)
          this.setState({
            message: 'Error deleting maintenance set. Please try again.',
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

  // New method to handle edit maintenance set
  editMaintenanceSet = (assetId, setId) => {
    // Navigate to the edit page using React Router
    this.props.history.push(`/assets/${assetId}/maintenance/${setId}`)
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }))
  }

  handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()

    // Filter assets based on the search query for Machine Code
    const filteredAssets = this.state.assets.filter((asset) => {
      const machineCodeLower = (asset.AssetName || '').toLowerCase()

      return machineCodeLower.includes(query)
    })

    this.setState({
      filteredAssets,
      searchQuery: query,
    })
  }

  render() {
    // const { assets } = this.state // Destructuring assets from state for ease of access

    const { assets, searchQuery, loading } = this.state
    const filteredAssets = this.state.filteredAssets || []

    return (
      <>
        <div className="container">
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
            }}
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <CTable bordered striped hover responsive>
            <CTableHead color="dark">
              <tr>
                <th style={{ textAlign: 'center' }}>Sr No</th>
                <th style={{ textAlign: 'center' }}>Machine Code</th>
                <th style={{ textAlign: 'center' }}>CBM</th>
                <th style={{ textAlign: 'center' }}>CBM Frequency</th>
                {/* <th style={{ textAlign: 'center' }}>InstallationDate</th> */}
                {/* <th style={{ textAlign: 'center' }}>CMDFrequency</th> */}
                {/* <th style={{ textAlign: 'center' }}>TMD</th> */}
                {/* <th style={{ textAlign: 'center' }}>TMDFrequency</th> */}
                <th style={{ textAlign: 'center' }}>TBM</th>
                <th style={{ textAlign: 'center' }}>TBM Frequency</th>
                <th> InstallationDate</th>
                <th>Edit</th>
                <th>Delete</th>
                {/* <th>Images</th> */}
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
              {searchQuery
                ? filteredAssets.map((asset, index) => (
                    <React.Fragment key={index}>
                      {asset.maintenanceData.map((set, setIndex) => (
                        <tr key={`${index}-${setIndex}`}>
                          <td>{index + 1}</td>
                          <td>{asset.AssetName}</td>
                          <td>{set.CMD}</td>
                          <td>{set.CMDFrequency}</td>
                          {/* <td></td> */}
                          <td>{set.TMD}</td>
                          <td>{set.TMDFrequency}</td>
                          <td>{asset.InstallationDate}</td>
                          {/* <td>
                <img
                  src={asset.Image}
                  alt={`Image-${index}`}
                  style={{ maxWidth: '50px' }}
                />
              </td> */}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                : assets.map((asset, index) => (
                    <React.Fragment key={index}>
                      {asset.maintenanceData.map((set, setIndex) => (
                        <tr key={`${index}-${setIndex}`}>
                          <td>{index + 1}</td>
                          <td>{asset.AssetName}</td>
                          <td>{set.CMD}</td>
                          <td>{set.CMDFrequency}</td>
                          <td>{set.TMD}</td>
                          <td>{set.TMDFrequency}</td>
                          <td>{asset.InstallationDate}</td>
                          <td style={{ textAlign: 'center' }}>
                            <NavLink
                              to={`/edittable/${asset._id}/maintenance/${set._id}`}
                              style={{ color: '#000080' }}
                            >
                              <FaEdit />
                            </NavLink>
                          </td>
                          <td>
                            <MdDelete
                              style={{ cursor: 'pointer', color: 'red' }}
                              onClick={() => this.deleteMaintenanceSet(asset._id, set._id)}
                            />
                          </td>
                          {/* <td>
                <img
                  src={asset.Image}
                  alt={`Image-${index}`}
                  style={{ maxWidth: '50px' }}
                />
              </td> */}
                        </tr>
                      ))}
                    </React.Fragment>
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
// Prop-type validation
Table.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Table
