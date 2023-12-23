import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const AssetRecord = () => {
  const { id } = useParams()
  const [imageData, setImageData] = useState(null)

  useEffect(() => {
    // Extracting the breakdown ID from the route parameters

    axios
      .get(`https://mms-backend-n2zv.onrender.com/api/assets/${id}`)
      .then((response) => {
        // Assuming the API response has an 'Image' property
        setImageData(response.data.Image)
      })
      .catch((error) => {
        console.error('Error fetching image data:', error)
        alert('Error fetching image data')
      })
  }, [])

  return (
    <div>
      <img src={imageData} height="30%" width="80%" />
    </div>
  )
}

export default AssetRecord
