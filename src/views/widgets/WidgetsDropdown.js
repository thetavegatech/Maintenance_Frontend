import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const WidgetsDropdown = () => {
  const [breakdownType, setbreakdownType] = useState([])

  const [formattedChartData, setFormattedChartData] = useState([])

  const [assets, setAssets] = useState([])
  const [totalTasks, setTotalTasks] = useState(0)

  const [breakdowns, setBreakdown] = useState([])
  const [totalBreakdown, setTotalBreakdown] = useState(0)
  const [pendingTaskCount, setPendingTaskCount] = useState(0)
  const [completdTasksCount, setcompletdTasksCount] = useState(0)

  const [todaysTaskCount, setTodaysTaskCount] = useState(0)
  const today = new Date()
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(today.getDate()).padStart(2, '0')}`
  const todaysScheduledAssets = assets.filter((asset) => asset.nextDate === formattedToday)
  const todaysScheduledAssetsok = assets.filter(
    (asset) => asset.nextDate === formattedToday && asset.status === 'Completed',
  )
  const todaysScheduledAssetsnok = assets.filter(
    (asset) => asset.nextDate === formattedToday && asset.status === 'pending',
  )

  const aggregateData = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.BreakdownType]) {
        acc[curr.BreakdownType] = 1
      } else {
        acc[curr.BreakdownType]++
      }
      return acc
    }, {})
  }

  const convertToChartData = (aggregatedData) => {
    return Object.entries(aggregatedData).map(([key, value]) => ({
      breakdownType: key,
      value: value,
    }))
  }

  useEffect(() => {
    fetch('https://mms-backend-n2zv.onrender.com/getBreakdownData')
      .then((response) => response.json())
      .then((fetchedBreakdowns) => {
        const aggregated = aggregateData(fetchedBreakdowns)
        const chartData = convertToChartData(aggregated)
        setFormattedChartData(chartData)
      })
      .catch((error) => console.error('Error fetching breakdowns: ', error))
  }, [])

  useEffect(() => {
    const breakdownType = []
    const getbreakdownRecord = async () => {
      const dataReq = await fetch('https://mms-backend-n2zv.onrender.com/getBreakdownData')
      const dataRes = await dataReq.json()
      console.log(dataRes)

      for (let i = 0; i < dataReq.length; i++) {
        breakdownType.push(dataRes[i].BreakdownType)
      }

      setbreakdownType(breakdownType)
    }
    getbreakdownRecord()
  }, [])

  useEffect(() => {
    fetch('https://mms-backend-n2zv.onrender.com/getBreakdownData')
      .then((response) => response.json())
      .then((fetchedBreakdowns) => {
        setBreakdown(fetchedBreakdowns, breakdowns)
        setTotalBreakdown(fetchedBreakdowns.length) // Compute total number of tasks
      })
      .catch((error) => console.error('Error fetching tasks: ', error))
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mms-backend-n2zv.onrender.com/getAllData')
        const fetchedTasks = await response.json()

        setAssets(fetchedTasks)
        setTotalTasks(fetchedTasks.length)

        // Calculate the count of pending tasks
        const pendingTasks = fetchedTasks.filter((asset) => asset.status === 'Pending')
        setPendingTaskCount(pendingTasks.length)
        const completedTasks = fetchedTasks.filter((asset) => asset.status === 'Completed')
        setcompletdTasksCount(completedTasks.length)

        // Check if it's the end of the month
        const currentDate = new Date()
        const isEndOfMonth =
          currentDate.getDate() ===
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

        if (isEndOfMonth && pendingTasks.length > 0) {
          // Send SMS for pending tasks
          const formData = {
            MachineName: 'ExampleMachine', // Replace with actual data
            BreakdownStartDate: '2023-01-01', // Replace with actual data
            Shift: 'Morning', // Replace with actual data
            LineName: 'Production Line', // Replace with actual data
            Operations: 'Some Operations', // Replace with actual data
            BreakdownPhenomenons: 'Some Breakdown Phenomenons', // Replace with actual data
          }

          // const sendSMS = (numbers, sender, pendingTasksCount) => {
          //   // Formulate a message with the pending task count
          //   const message = encodeURIComponent(
          //     'Breakdown For ' +
          //       pendingTasksCount +
          //       // 'Date of Breakdown Start' +
          //       // BreakdownStartDate +
          //       ' please visit concerned department Details are ',
          //     // BreakdownPhenomenons +
          //     // ' - Aurangabad Auto Ancillary',
          //   )

          //   // Create the API URL
          //   const url = `https://api.textlocal.in/send/?apikey=${apiKey}&sender=${sender}&numbers=${numbers}&message=${message}`

          //   // Use fetch to send the SMS
          //   fetch(url)
          //     .then((response) => response.json())
          //     .then((data) => {
          //       console.log('SMS sent successfully:', data)
          //       console.log(numbers, data1)
          //     })
          //     .catch((error) => {
          //       console.error('Error sending SMS:', error)
          //     })
          // }
          // // You can modify the numbers, sender, and message as needed
          // sendSMS(formData, numbers, sender, pendingTasks.length)
        }
      } catch (error) {
        console.error('Error fetching tasks: ', error)
      }
    }

    fetchData()
  }, [])

  const apiKey = 'NDE1MDY2NGM2Mzc3NTI0ZjQzNmE1YTM5NDY0YzZlNzU='
  const numbers = '7020804148' // Replace with the phone numbers
  const data1 = 'pending tasks'
  const data2 = 'Please visit the concerned department for details.'
  const sender = 'AAABRD'

  const sendSMS = (formData, numbers, sender, pendingTasksCount) => {
    // Formulate a message with the pending task count
    const message = encodeURIComponent(
      'Breakdown For ' +
        pendingTasksCount +
        // 'Date of Breakdown Start' +
        // BreakdownStartDate +
        ' please visit concerned department Details are ',
      // BreakdownPhenomenons +
      // ' - Aurangabad Auto Ancillary',
    )

    // Create the API URL
    const url = `https://api.textlocal.in/send/?apikey=${apiKey}&sender=${sender}&numbers=${7020804148}&message=${message}`

    // Use fetch to send the SMS
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('SMS sent successfully:', data)
        console.log(numbers, data1)
      })
      .catch((error) => {
        console.error('Error sending SMS:', error)
      })
  }

  const formData = {} // Replace with actual form data
  const pendingTasksCount = 3 // Replace with the actual pending tasks count
  // sendSMS(formData, numbers, sender, pendingTasksCount)

  const handleButtonClick = () => {
    // Call the SMS sending function
    sendSMS(numbers)
  }
  useEffect(() => {
    fetch(`https://mms-backend-n2zv.onrender.com/getAllData?nextDate=${formattedToday}`)
      .then((response) => response.json())
      .then((fetchedTasks) => {
        setTodaysTaskCount(fetchedTasks.length)
      })
      .catch((error) => console.error("Error fetching today's tasks: ", error))
    console.log(todaysTaskCount, todaysScheduledAssets, todaysScheduledAssetsnok.length)
  }, [])

  useEffect(() => {
    fetch('https://mms-backend-n2zv.onrender.com/api/assets')
      .then((response) => response.json())
      .then((fetchedTasks) => {
        setAssets(fetchedTasks)
        setTotalTasks(fetchedTasks.length)

        //   // Calculate the count of pending tasks
        //   const pendingTasks = fetchedTasks.filter((asset) => asset.status === 'Pending')
        //   setPendingTaskCount(pendingTasks.length)
        //   const completdTasks = fetchedTasks.filter((asset) => asset.status === 'Completed')
        //   setcompletdTasksCount(completdTasks.length)
      })
    // .catch((error) => console.error('Error fetching tasks: ', error))
  }, [])

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {totalBreakdown}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowTop} />
                {/* {totalBreakdown} */}
              </span>
            </>
          }
          title="Total Breakdown"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <BarChart
              width={240}
              height={85}
              data={formattedChartData}
              margin={{
                top: 5,
                bottom: 10,
                // right: 30,
                left: 20,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              {/* <XAxis dataKey="breakdownType" /> */}
              {/* <YAxis /> */}
              {/* <Tooltip /> */}
              {/* <Legend /> */}
              <Bar
                dataKey="value"
                fill="#8884d8"
                // name="My First dataset" // Add the label here
                backgroundColor="rgba(255,255,255,.2)" // Add the background color here
                borderColor="rgba(255,255,255,.55)" // Add the border color here
              />
            </BarChart>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              {totalTasks}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowTop} />
              </span>
            </>
          }
          title="All Assets"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            // <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={240}
              height={85}
              data={formattedChartData}
              margin={{
                top: 5,
                // right: 30,
                bottom: 10,
                left: 20,
                // bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              {/* <XAxis dataKey="breakdownType" /> */}
              {/* <YAxis /> */}
              {/* <Tooltip /> */}
              {/* <Legend /> */}
              {/* <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
              <Line type="monotone" dataKey="value" />
            </LineChart>
            // </ResponsiveContainer>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              {completdTasksCount}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowTop} />
              </span>
            </>
          }
          title="Completed Task"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              {pendingTaskCount}
              <span className="fs-6 fw-normal">
                <CIcon icon={cilArrowBottom} />
              </span>
            </>
          }
          title="Pending Task"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem
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
                  Action
                </CDropdownItem>
                {/* <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    // label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
