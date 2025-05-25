"use client"
import useSWR from "swr"
import axios from "axios"
import { groupRequestByLocationAndDate,groupRequestByStatus,groupRequestByWasteType } from "@/helpers/groupDashboardData"
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {PieChart, Pie,Cell } from 'recharts';

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export default function CollectorDashboard(){
    const {data,error,isLoading} = useSWR('/api/waste/request/getAllReqs',fetcher,{
        refreshInterval: 5000,
    });
    console.log(data);
    // if (isLoading) return <p>Loading...</p>;
    // if (!data || data.length === 0) return <p>No data...</p>;

    // ✅ Now it's safe
    const lineChartData = groupRequestByLocationAndDate(data || []);
    const pieChartStatusData = groupRequestByStatus(data || []);
    const pieChartWasteData = groupRequestByWasteType(data || []);


    //lineChart
    const [lineChartOpacity,setLineChartOpacity] = useState({
        UnitA: 1,
        UnitB: 1,
    });

    const handleLineChartMouseEnter = (o:any) => {
        const { dataKey } = o;

        setLineChartOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
    };

    const handleLineChartMouseLeave = (o:any) => {
        const { dataKey } = o;

        setLineChartOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  // status pie
  const statusColors = {
  PENDING: '#facc15',     // Yellow
  ACCEPTED: '#3b82f6',    // Blue
  CANCELLED: '#ef4444',   // Red
  COMPLETED: '#22c55e',   // Green
  };

  const pieStatusfilteredData = pieChartStatusData.filter(item => item.count > 0);

  // waste type pie
  const wasteColors = {
    Dry: '#facc15',
    Wet: '#22c55e',
  }

  const pieWastefilteredData = pieChartWasteData.filter(item => item.count >0)

    return(
        <>
        <div className="mt-4" style={{ width: '100%' }}>
            <h1 className="text-2xl text-center mb-4">All Requests</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend onMouseEnter={handleLineChartMouseEnter} onMouseLeave={handleLineChartMouseLeave} />
                <Line type="monotone" dataKey="UnitA" strokeOpacity={lineChartOpacity.UnitA} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="UnitB" strokeOpacity={lineChartOpacity.UnitB} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-8 flex">
            <div style={{ width: '100%', height: 300 }}>
                <h1 className="text-2xl mt-4 mb-4 text-center">Status</h1>
                <ResponsiveContainer>
                    <PieChart>
                    <Pie
                        data={pieStatusfilteredData}
                        dataKey="count"
                        nameKey="status"
                        // fill="#8884d8"
                        label
                        // label={({ status }) => status}
                        // labelLine={false}
                    >
                        {pieStatusfilteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={statusColors[entry.status as keyof typeof statusColors]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <h1 className="text-2xl mt-4 mb-4 text-center">Waste Type</h1>
                <ResponsiveContainer>
                    <PieChart>
                    <Pie
                        data={pieWastefilteredData}
                        dataKey="count"
                        nameKey="type"
                        // fill="#8884d8"
                        label
                        // label={({ status }) => status}
                        // labelLine={false}
                    >
                        {pieWastefilteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={wasteColors[entry.type as keyof typeof wasteColors]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
       

        </>
    )
}