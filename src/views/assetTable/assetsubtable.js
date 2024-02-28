// import React from 'react'
// import PropTypes from 'prop-types'

// const MaintenanceTable = ({ maintenanceData }) => {
//   return (
//     <div>
//       <h5>Maintenance Sets</h5>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Asset Name</th>
//             <th>CMD</th>
//             <th>CMD Frequency</th>
//             <th>TMD</th>
//             <th>TMD Frequency</th>
//           </tr>
//         </thead>
//         <tbody>
//           {maintenanceData.map((set, index) => (
//             <tr key={index}>
//               <td>{set.AssetName}</td>
//               <td>{set.CMD}</td>
//               <td>{set.CMDFrequency}</td>
//               <td>{set.TMD}</td>
//               <td>{set.TMDFrequency}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
// MaintenanceTable.propTypes = {
//   maintenanceData: PropTypes.arrayOf(
//     PropTypes.shape({
//       AssetName: PropTypes.string,
//       CMD: PropTypes.string,
//       CMDFrequency: PropTypes.string,
//       TMD: PropTypes.string,
//       TMDFrequency: PropTypes.string,
//     }),
//   ).isRequired,
// }

// export default MaintenanceTable
