"use client";
import swr from 'swr';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url:string) => axios.get(url).then(res =>res.data);

export default function UserRequestTable(){
  const {data: userRequests, isLoading,mutate} = useSWR('/api/waste/request/getUserReqs',fetcher,{
    refreshInterval:5000
  });

  console.log(userRequests)
  if(isLoading) return <div>Loading...</div>

  if(!userRequests || userRequests.length === 0) return <div>No request found</div>

  return(
   <div className="w-full overflow-x-auto">
  <table className="min-w-[700px] w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg shadow-sm">
    <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
      <tr>
        <th className="py-3 px-4 border-b">Type of Waste</th>
        <th className="py-3 px-4 border-b">Location</th>
        <th className="py-3 px-4 border-b">Requested At</th>
        <th className="py-3 px-4 border-b">Collected At</th>
        <th className="py-3 px-4 border-b">Image</th>
        <th className="py-3 px-4 border-b">Status</th>
      </tr>
    </thead>
    <tbody>
      {userRequests.map((req: any) => (
        <tr key={req._id} className="hover:bg-gray-50 transition">
          <td className="py-3 px-4 border-b">{req.wasteType}</td>
          <td className="py-3 px-4 border-b">{req.location}</td>
          <td className="py-3 px-4 border-b">
            {new Date(req.requestedAt).toLocaleString()}
          </td>
          <td className="py-3 px-4 border-b">
            {req.collectedAt ? new Date(req.collectedAt).toLocaleString() : '-'}
          </td>
          <td className="py-3 px-4 border-b">
            {req.imgUrl ? (
              <a
                href={req.imgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            ) : (
              '-'
            )}
          </td>
          <td className="py-3 px-4 border-b">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                req.status === 'PENDING'
                  ? 'bg-yellow-400'
                  : req.status === 'ACCEPTED'
                  ? 'bg-blue-500'
                  : req.status === 'COMPLETED'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              } text-white`}
            >
              {req.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>






  )
}
// import userReqData from "@/rawData/userReq"

// export default function UserRequestTable() {
//   return (
//     <section className="px-4 py-8">
//       <h1 className="text-center text-2xl font-semibold mb-6">Requests</h1>
//       <div className="overflow-x-auto">
        // <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg shadow-sm">
        //   <thead>
        //     <tr className="bg-gray-100 text-gray-600 uppercase tracking-wider">
        //       <th className="py-3 px-4 border-b">Type of Waste</th>
        //       <th className="py-3 px-4 border-b">Location</th>
        //       <th className="py-3 px-4 border-b">Requested At</th>
        //       <th className="py-3 px-4 border-b">Collected At</th>
        //       <th className="py-3 px-4 border-b">Image</th>
        //       <th className="py-3 px-4 border-b">Status</th>
        //     </tr>
        //   </thead>
//           <tbody>
//             {[...userReqData]
//               .sort((a, b) => b.id - a.id) // Sort descending by ID
//               .map((req) => (
//                 <tr key={req.id} className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-4 border-b">{req.wasteType}</td>
//                   <td className="py-3 px-4 border-b">{req.location}</td>
//                   <td className="py-3 px-4 border-b">{req.requestedAt}</td>
//                   <td className="py-3 px-4 border-b">{req.collectedAt}</td>
//                   <td className="py-3 px-4 border-b text-blue-600 underline cursor-pointer">
//                     {req.imgUrl ? (
//                       <a href={req.imgUrl} target="_blank" rel="noopener noreferrer">
//                         View Image
//                       </a>
//                     ) : (
//                       <span className="text-gray-400">No Image</span>
//                     )}
//                   </td>
//                   <td className="py-3 px-4 border-b">
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                         req.status === "COMPLETED"
//                           ? "bg-green-500 text-white"
//                           : req.status === "CANCELLED"
//                           ? "bg-red-500 text-white"
//                           : req.status === "PENDING"
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-500 text-white"
//                       }`}
//                     >
//                       {req.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))} 
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }


