import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import dlt from '../assetTable/delete.png'
import { CTable, CTableHead, CButton, CInputGroup, CFormControl } from '@coreui/react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

class AssetTable extends React.Component {
  state = {
    assets: [],
    assetmasters: [],
    searchLocation: '', // New state for the search term
    message: '',
    searchQuery: '',
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/assets') // Adjust the endpoint if necessary
      .then((response) => {
        // If the response is an array, simply set it to assets.
        // If it's an object, place it in an array as you've shown.
        this.setState({ assets: Array.isArray(response.data) ? response.data : [response.data] })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
      })
  }

  deleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`http://Localhost:5000/api/assets/${id}`)
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

  render() {
    // const { assets } = this.state // Destructuring assets from state for ease of access

    const { assets, filteredAssets, searchLocation, searchQuery } = this.state

    // Filter assets based on the searchLocation
    // const filteredAssets = assets.filter(
    //   (asset) =>
    //     asset.AssetName &&
    //     asset.AssetName.toLowerCase().includes(searchLocation.toLowerCase()) &&
    //     asset.Description &&
    //     asset.Description.toLowerCase().includes(searchLocation.toLowerCase()) &&
    //     asset.Location &&
    //     asset.Location.toLowerCase().includes(searchLocation.toLowerCase()),
    // )
    const { isClicked } = this.state
    // Filter assets to include only rows with all values filled
    const validatedAssets = assets.filter(
      (asset) =>
        asset.AssetName &&
        asset.AssetName.trim() !== '' &&
        asset.Description &&
        asset.Description.trim() !== '' &&
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
            placeholder="Search by Location"
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
          <CTable bordered striped hover responsive>
            <CTableHead color="dark">
              <tr>
                <th style={{ textAlign: 'center' }}>Machine Name</th>
                <th style={{ textAlign: 'center' }}>Description</th>
                <th style={{ textAlign: 'center' }}>Location</th>
                <th style={{ textAlign: 'center' }}>Edit</th>
                <th style={{ textAlign: 'center' }}>Delete</th>
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
                  <td style={{ textAlign: 'center' }}>{asset.AssetName}</td>
                  <td style={{ textAlign: 'center' }}>{asset.Description}</td>
                  <td style={{ textAlign: 'center' }}>{asset.Location}</td>
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
                </tr>
              ))}
            </tbody>
          </CTable>
        </div>
      </>
    )
  }
}

export default AssetTable
