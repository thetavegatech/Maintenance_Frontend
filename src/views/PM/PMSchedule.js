import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import dlt from '../assetTable/delete.png'
import { CTable, CButton, CTableHead } from '@coreui/react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

class AssetTable extends React.Component {
  state = {
    assets: [],
    filteredAssets: [],
    searchQuery: '',
    // isHovered: false,
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  componentDidMount() {
    this.fetchData()
    // Start the periodic update of the "Next Date"
    // this.updateNextDate()
    this.updateNextDate = this.updateNextDate.bind(this)

    // Set the time for 12:00 AM (midnight)
    const twelveAM = new Date()
    twelveAM.setHours(14, 47, 0, 0)

    // Calculate the delay until 12:00 AM
    const delay = twelveAM - new Date()

    // Set up a timeout to run updateNextDate at 12:00 AM every day
    setTimeout(() => {
      this.updateNextDate() // Run the function immediately
      this.updateInterval = setInterval(this.updateNextDate, 24 * 60 * 60 * 1000) // Repeat every 24 hours
    }, delay)

    axios
      .get('https://mms-backend-n2zv.onrender.com/getAllData')
      .then((response) => {
        let fetchedAssets = Array.isArray(response.data) ? response.data : [response.data]

        // Set status to "Pending" for new tasks
        fetchedAssets = fetchedAssets.map((asset) => {
          if (!asset.status) {
            asset.status = 'Pending'
          }
          return asset
        })

        // Check and update status for completed tasks based on next date
        const today = new Date()
        fetchedAssets = fetchedAssets.map((asset) => {
          const nextDate = new Date(asset.nextDate)
          if (today >= nextDate && asset.status === 'Completed') {
            // asset.status = 'Pending'
          }
          return asset
        })

        this.setState({ assets: fetchedAssets })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
      })
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  fetchData() {
    axios
      .get('https://mms-backend-n2zv.onrender.com/getAllData')
      .then((response) => {
        this.setState({ assets: Array.isArray(response.data) ? response.data : [response.data] })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
      })
  }

  deleteData(id) {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://mms-backend-n2zv.onrender.com/deleteRecord/${id}`)
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

  sendSMS = async (selectedno) => {
    const apiKey = 'NDE1MDY2NGM2Mzc3NTI0ZjQzNmE1YTM5NDY0YzZlNzU=' // Replace with your Textlocal API key
    const sender = 'AAAPL' // Replace with your sender name
    // const selectedno = '7020804148'
    const message = 'next day PM task schedule'
    const url = `https://api.textlocal.in/send/?apikey=${apiKey}&sender=${sender}&numbers=${7020804148}&message=${message}`
    // const message = 'next day PM task schedule'
    // try {
    //   const response = await axios.get(url)
    //   console.log('SMS sent successfully:', response.data)
    // } catch (error) {
    //   console.error('Error sending SMS:', error)
    // }
    axios
      .get(url)
      .then((response) => {
        console.log('SMS sent successfully:', response.data)
      })
      .catch((error) => {
        console.error('Error sending SMS:', error)

        // Log detailed error information
        if (error.response) {
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.status)
          console.error('Response headers:', error.response.headers)
        } else if (error.request) {
          console.error('Request made, but no response received:', error.request)
        } else {
          console.error('Error setting up the request:', error.message)
        }
      })
  }

  // updateNextDate() {
  //   const today = new Date()
  //   const { assets } = this.state || {}

  //   if (!assets) {
  //     return
  //   }

  //   const skipSundays = () => {
  //     while (today.getDay() === 0) {
  //       today.setDate(today.getDate() + 1)
  //     }
  //   }

  //   const addWeekdays = (numDays) => {
  //     let count = 0
  //     while (count < numDays) {
  //       today.setDate(today.getDate() + 1)
  //       if (today.getDay() !== 0) {
  //         // Count only weekdays (excluding Sundays)
  //         count++
  //       }
  //     }
  //   }
  //   const updatedAssets = assets.map((asset) => {
  //     const nextDate = new Date(asset.nextDate)

  //     if (today >= nextDate) {
  //       let frequency = asset.ScheduledMaintenanceDatesandIntervals
  //         ? asset.ScheduledMaintenanceDatesandIntervals.toLowerCase()
  //         : 'daily' // Default to "daily" if frequency is undefined

  //       let daysToAdd = 1 // Default to adding 1 day

  //       // Determine the number of days to add based on the frequency
  //       switch (frequency) {
  //         case 'daily':
  //           daysToAdd = 1
  //           break
  //         case 'weekly':
  //           daysToAdd = 8
  //           break
  //         case 'fifteen days':
  //           daysToAdd = 17
  //           break
  //         case 'monthly':
  //           // Assuming a month has 30 days, adjust as needed
  //           daysToAdd = 34
  //           break
  //         case 'quarterly':
  //           // Assuming a quarter has 90 days, adjust as needed
  //           daysToAdd = 104
  //           break
  //         case 'half year':
  //           // Assuming half a year has 180 days, adjust as needed
  //           daysToAdd = 208
  //           break
  //         case 'yearly':
  //           // Assuming a year has 365 days, adjust as needed
  //           daysToAdd = 417
  //           break
  //         default:
  //           console.error(`Unsupported frequency for task: ${asset.TaskName}`)
  //           // Handle unsupported frequency by defaulting to "daily"
  //           frequency = 'daily'
  //           daysToAdd = ''
  //       }

  //       // Set the "Next Date" to today's date if the calculated date is today or later
  //       nextDate.setDate(nextDate.getDate() + daysToAdd)

  //       // If the calculated next date is a Sunday, skip it
  //       while (nextDate.getDay() === 0) {
  //         nextDate.setDate(nextDate.getDate() + 1)
  //       }

  //       asset.nextDate = nextDate.toISOString().split('T')[0]

  //       // Update status to "Pending"
  //       asset.status = 'Pending'

  //       // If the task is completed and the next date is beyond today, set status to "Pending"
  //       if (asset.status === 'Completed' && today < nextDate) {
  //         asset.status = 'Pending'
  //       }
  //       // else {
  //       //   // Default status if none of the conditions match
  //       //   asset.status = 'Pending'
  //       // }
  //     }

  //     return asset
  //   })

  //   this.setState({ assets: updatedAssets }, () => {
  //     // After updating the state, send the updated data to the backend API
  //     axios
  //       .put('https://mms-backend-n2zv.onrender.com/updateRecords', { assets: updatedAssets })
  //       .then((response) => {
  //         console.log('Next Date updated in the database:', response.data)
  //       })
  //       .catch((error) => {
  //         console.error('Error updating Next Date in the database:', error)
  //       })
  //   })
  // }

  updateNextDate = async () => {
    const today = new Date()
    const { assets } = this.state || {}

    if (!assets) {
      return
    }

    const updatedAssets = assets.map((asset) => {
      const nextDate = new Date(asset.nextDate)

      if (today >= nextDate) {
        let frequency = asset.ScheduledMaintenanceDatesandIntervals
          ? asset.ScheduledMaintenanceDatesandIntervals.toLowerCase()
          : 'daily' // Default to "daily" if frequency is undefined

        let daysToAdd = 1 // Default to adding 1 day

        // Determine the number of days to add based on the frequency
        switch (frequency) {
          case 'daily':
            daysToAdd = 1
            break
          case 'weekly':
            daysToAdd = 7
            break
          case 'bi-weekly':
            daysToAdd = 14
            break
          case 'monthly':
            daysToAdd = 30 // Assuming a month has 30 days, adjust as needed
            break
          case 'quarterly':
            daysToAdd = 90 // Assuming a quarter has 90 days, adjust as needed
            break
          case 'half-year':
            daysToAdd = 180 // Assuming half a year has 180 days, adjust as needed
            break
          case 'yearly':
            daysToAdd = 365 // Assuming a year has 365 days, adjust as needed
            break
          default:
            console.error(`Unsupported frequency for task: ${asset.TaskName}`)
            // Handle unsupported frequency by defaulting to "daily"
            frequency = 'daily'
            daysToAdd = 1
        }

        // Set the "Next Date" to today's date if the calculated date is today or later
        nextDate.setDate(nextDate.getDate() + daysToAdd)

        // If the calculated next date is a Sunday, skip it
        while (nextDate.getDay() === 0) {
          nextDate.setDate(nextDate.getDate() + 1)
        }

        asset.nextDate = nextDate.toISOString().split('T')[0]

        // Update status to "Pending"
        asset.status = 'Pending'

        // If the task is completed and the next date is beyond today, set status to "Pending"
        if (asset.status === 'Completed' && today < nextDate) {
          asset.status = 'Pending'
        }
      }

      return asset
    })

    const updatedAssetsArray = await Promise.all(updatedAssets)

    this.setState({ assets: updatedAssetsArray }, async () => {
      // After updating the state, send the updated data to the backend API
      try {
        const response = await axios.put('https://mms-backend-n2zv.onrender.com/updateRecords', {
          assets: updatedAssetsArray,
        })

        console.log('Next Date updated in the database:', response.data)

        // Send SMS to specific person
        // const message = 'Next date updated for task ' // Assuming the first asset in the array
        const selectedno = '7020804148' // Replace with the recipient's phone number
        await this.sendSMS(selectedno)
        // console.log(selectedno, message)
      } catch (error) {
        console.error('Error updating Next Date in the database:', error)
        // console.log(selectedno, message)
      }
    })
  }

  handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase()

    // Filter assets based on the search query
    const filteredAssets = this.state.assets.filter((asset) => {
      const taskNameLower = (asset.TaskName || '').toLowerCase()
      // const taskDescriptionLower = (asset.TaskDescription || '').toLowerCase()
      // const scheduledMaintenanceLower = (
      //   asset.ScheduledMaintenanceDatesandIntervals || ''
      // ).toLowerCase()
      // const statusLower = (asset.status || '').toLowerCase()

      return taskNameLower.includes(query)
      // taskDescriptionLower.includes(query) ||
      // scheduledMaintenanceLower.includes(query) ||
      // statusLower.includes(query)
    })

    this.setState({
      filteredAssets,
      searchQuery: query,
    })
  }

  render() {
    const { assets, filteredAssets, message, searchQuery } = this.state

    // Apply filter for non-empty "Task Name" to both assets and filteredAssets
    const filteredDefaultAssets = assets.filter(
      (asset) => asset.TaskName && asset.TaskName.trim() !== '',
    )

    const { isClicked } = this.state

    return (
      <div className="container" style={{ marginTop: '0px' }}>
        <NavLink to="/taskForm">
          <CButton color="info" className="mb-2" style={{ marginTop: '5px' }}>
            Add New
          </CButton>
        </NavLink>

        {/* <div> */}
        <label htmlFor="searchTask" style={{ marginLeft: '70%' }}>
          <span role="img" aria-label="search-icon"></span>
        </label>
        <input
          type="text"
          id="searchTask"
          placeholder="Search Task"
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
        {/* </div> */}

        <CTable bordered striped hover responsive>
          <CTableHead color="dark">
            <tr>
              <th style={{ textAlign: 'center' }}>Asset Name</th>
              <th style={{ textAlign: 'center' }}>Task Name</th>
              <th style={{ textAlign: 'center' }}>Task Description</th>
              <th style={{ textAlign: 'center' }}>Scheduled Maintenance</th>
              <th style={{ textAlign: 'center' }}>Start Date</th>
              <th style={{ textAlign: 'center' }}>Next Date</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Edit </th>
              <th style={{ textAlign: 'center' }}>Delete</th>
              <th>Image</th>
            </tr>
          </CTableHead>
          <tbody>
            {message && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', fontStyle: 'italic', color: 'red' }}>
                  {message}
                </td>
              </tr>
            )}
            {(searchQuery ? filteredAssets : filteredDefaultAssets).map((asset) => (
              <tr key={asset._id}>
                <td style={{ textAlign: 'center' }}>{asset.AssetName}</td>
                <td style={{ textAlign: 'center' }}>{asset.TaskName}</td>
                <td style={{ textAlign: 'center' }}>{asset.TaskDescription}</td>
                <td style={{ textAlign: 'center' }}>
                  {asset.ScheduledMaintenanceDatesandIntervals}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {new Date(asset.startDate).toISOString().split('T')[0]}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {new Date(asset.nextDate).toISOString().split('T')[0]}
                </td>
                <td style={{ textAlign: 'center' }}>{asset.status}</td>
                <td style={{ textAlign: 'center' }}>
                  <NavLink to={`/editPM/${asset._id}`} style={{ color: '#000080' }}>
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
                  <NavLink to={`/taskRecord/${asset._id}`}>
                    <img src={asset.Image} height={50} width={50} />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </CTable>
      </div>
    )
  }
}

export default AssetTable
