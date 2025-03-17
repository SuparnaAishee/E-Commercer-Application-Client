/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useState } from "react";
// import {
//   Area,
//   AreaChart,
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [timeRange, setTimeRange] = useState("yearly");

//   // Sample data for charts
//   const revenueData = [
//     { name: "Jan", revenue: 4000, profit: 2400, expenses: 1600 },
//     { name: "Feb", revenue: 3000, profit: 1600, expenses: 1400 },
//     { name: "Mar", revenue: 5000, profit: 2800, expenses: 2200 },
//     { name: "Apr", revenue: 4500, profit: 2500, expenses: 2000 },
//     { name: "May", revenue: 6000, profit: 3600, expenses: 2400 },
//     { name: "Jun", revenue: 5500, profit: 3200, expenses: 2300 },
//     { name: "Jul", revenue: 7000, profit: 4200, expenses: 2800 },
//     { name: "Aug", revenue: 8000, profit: 4800, expenses: 3200 },
//     { name: "Sep", revenue: 7500, profit: 4500, expenses: 3000 },
//     { name: "Oct", revenue: 9000, profit: 5400, expenses: 3600 },
//     { name: "Nov", revenue: 8500, profit: 5100, expenses: 3400 },
//     { name: "Dec", revenue: 10000, profit: 6000, expenses: 4000 },
//   ];

//   const salesData = [
//     { name: "Jan", sales: 120, target: 100 },
//     { name: "Feb", sales: 140, target: 120 },
//     { name: "Mar", sales: 160, target: 140 },
//     { name: "Apr", sales: 180, target: 160 },
//     { name: "May", sales: 200, target: 180 },
//     { name: "Jun", sales: 220, target: 200 },
//     { name: "Jul", sales: 240, target: 220 },
//     { name: "Aug", sales: 260, target: 240 },
//     { name: "Sep", sales: 280, target: 260 },
//     { name: "Oct", sales: 300, target: 280 },
//     { name: "Nov", sales: 320, target: 300 },
//     { name: "Dec", sales: 340, target: 320 },
//   ];

//   const categoryData = [
//     { name: "Electronics", value: 35, color: "#FFA500" },
//     { name: "Clothing", value: 25, color: "#2b2d42" },
//     { name: "Home & Kitchen", value: 20, color: "#FFBB28" },
//     { name: "Books", value: 10, color: "#FF8042" },
//     { name: "Other", value: 10, color: "#8884d8" },
//   ];

//   const customerData = [
//     { name: "Jan", new: 65, returning: 35 },
//     { name: "Feb", new: 59, returning: 41 },
//     { name: "Mar", new: 80, returning: 40 },
//     { name: "Apr", new: 81, returning: 49 },
//     { name: "May", new: 56, returning: 64 },
//     { name: "Jun", new: 55, returning: 75 },
//     { name: "Jul", new: 40, returning: 80 },
//     { name: "Aug", new: 45, returning: 85 },
//     { name: "Sep", new: 50, returning: 90 },
//     { name: "Oct", new: 54, returning: 96 },
//     { name: "Nov", new: 60, returning: 100 },
//     { name: "Dec", new: 65, returning: 105 },
//   ];

//   const productPerformance = [
//     { name: "iPhone 15 Pro", sales: 1245, revenue: 1618050, growth: 12.5 },
//     { name: "MacBook Air", sales: 876, revenue: 963240, growth: 8.3 },
//     { name: "AirPods Pro", sales: 1532, revenue: 381468, growth: 15.7 },
//     { name: "iPad Mini", sales: 943, revenue: 470557, growth: -2.4 },
//     { name: "Apple Watch", sales: 1123, revenue: 448077, growth: 5.6 },
//   ];

//   const recentOrders = [
//     {
//       id: "#ORD-001",
//       customer: "John Doe",
//       product: "iPhone 15 Pro",
//       date: "2023-12-01",
//       status: "Delivered",
//       total: "$1,299.00",
//     },
//     {
//       id: "#ORD-002",
//       customer: "Jane Smith",
//       product: "MacBook Air",
//       date: "2023-12-02",
//       status: "Processing",
//       total: "$1,099.00",
//     },
//     {
//       id: "#ORD-003",
//       customer: "Robert Johnson",
//       product: "AirPods Pro",
//       date: "2023-12-03",
//       status: "Shipped",
//       total: "$249.00",
//     },
//     {
//       id: "#ORD-004",
//       customer: "Emily Davis",
//       product: "iPad Mini",
//       date: "2023-12-04",
//       status: "Delivered",
//       total: "$499.00",
//     },
//     {
//       id: "#ORD-005",
//       customer: "Michael Wilson",
//       product: "Apple Watch",
//       date: "2023-12-05",
//       status: "Processing",
//       total: "$399.00",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       case "Processing":
//         return "bg-blue-100 text-blue-800";
//       case "Shipped":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getGrowthIndicator = (growth) => {
//     if (growth > 0) {
//       return (
//         <span className="flex items-center text-green-600">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
//               clipRule="evenodd"
//             />
//           </svg>
//           {growth}%
//         </span>
//       );
//     } else {
//       return (
//         <span className="flex items-center text-red-600">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           {Math.abs(growth)}%
//         </span>
//       );
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 border rounded shadow-lg">
//           <p className="font-bold">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={`item-${index}`} style={{ color: entry.color }}>
//               {entry.name}: {entry.value.toLocaleString()}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="col-span-9 w-full">
//       {/* Dashboard Controls */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//         <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
//           <button
//             onClick={() => setActiveTab("overview")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "overview" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Overview
//           </button>
//           <button
//             onClick={() => setActiveTab("analytics")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "analytics" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Analytics
//           </button>
//           <button
//             onClick={() => setActiveTab("products")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "products" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Products
//           </button>
//         </div>
//         <div className="flex items-center gap-2">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//           <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 text-gray-500"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//           <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Generate Report
//           </button>
//         </div>
//       </div>

//       {/* Overview Tab */}
//       {activeTab === "overview" && (
//         <div>
//           {/* Stats cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Revenue
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       $45,231.89
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span>20.1%</span>
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "75%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Orders
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       2,345
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span>15.3%</span>
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "65%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Customers
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       1,789
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span>12.5%</span>
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "55%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Products
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       374
//                     </h3>
//                     <div className="flex items-center text-red-600 mt-1">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span>0.5%</span>
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "45%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Revenue Overview
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Monthly revenue, profit, and expenses
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart
//                       data={revenueData}
//                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                       key="revenue-chart"
//                     >
//                       <defs>
//                         <linearGradient
//                           id="colorRevenue"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#FFA500"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#FFA500"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                         <linearGradient
//                           id="colorProfit"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#82ca9d"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#82ca9d"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                         <linearGradient
//                           id="colorExpenses"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#2b2d42"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#2b2d42"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Area
//                         type="monotone"
//                         dataKey="revenue"
//                         stroke="#FFA500"
//                         fillOpacity={1}
//                         fill="url(#colorRevenue)"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="profit"
//                         stroke="#82ca9d"
//                         fillOpacity={1}
//                         fill="url(#colorProfit)"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="expenses"
//                         stroke="#2b2d42"
//                         fillOpacity={1}
//                         fill="url(#colorExpenses)"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Customer Acquisition
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   New vs returning customers
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                       data={customerData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="customer-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Bar
//                         dataKey="new"
//                         stackId="a"
//                         fill="#FFA500"
//                         name="New Customers"
//                       />
//                       <Bar
//                         dataKey="returning"
//                         stackId="a"
//                         fill="#2b2d42"
//                         name="Returning Customers"
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Categories and Recent Orders */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-1">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Product Categories
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Distribution of sales by category
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart key="pie-chart">
//                       <Pie
//                         data={categoryData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         animationBegin={0}
//                         animationDuration={1500}
//                       >
//                         {categoryData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Recent Orders
//                 </h2>
//                 <p className="text-sm text-gray-500">Latest customer orders</p>
//               </div>
//               <div className="p-4">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Order ID
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Customer
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
//                         >
//                           Product
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
//                         >
//                           Date
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Status
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Total
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {recentOrders.map((order) => (
//                         <tr key={order.id}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
//                             {order.id}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {order.customer}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                             {order.product}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                             {order.date}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
//                             >
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                             {order.total}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="p-4 border-t border-gray-200">
//                 <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                   View All Orders
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Analytics Tab */}
//       {activeTab === "analytics" && (
//         <div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Sales Performance
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Monthly sales vs targets
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart
//                       data={salesData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="sales-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="sales"
//                         stroke="#FFA500"
//                         activeDot={{ r: 8 }}
//                         name="Actual Sales"
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="target"
//                         stroke="#2b2d42"
//                         strokeDasharray="5 5"
//                         name="Target Sales"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Revenue Breakdown
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Revenue by product category
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                       data={categoryData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="revenue-breakdown-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar
//                         dataKey="value"
//                         name="Revenue"
//                         animationDuration={1500}
//                       >
//                         {categoryData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-secondary">
//                 Customer Activity
//               </h2>
//               <p className="text-sm text-gray-500">User engagement metrics</p>
//             </div>
//             <div className="p-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">87%</div>
//                     <p className="text-sm text-gray-500">Retention Rate</p>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">24.5</div>
//                     <p className="text-sm text-gray-500">
//                       Avg. Session Duration
//                     </p>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">3.2</div>
//                     <p className="text-sm text-gray-500">
//                       Avg. Orders per Customer
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ height: "300px", width: "100%" }}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart
//                     data={customerData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     key="customer-activity-chart"
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="new"
//                       stroke="#FFA500"
//                       name="New Users"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="returning"
//                       stroke="#2b2d42"
//                       name="Returning Users"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products Tab */}
//       {activeTab === "products" && (
//         <div>
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-secondary">
//                 Top Performing Products
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Products with highest sales and revenue
//               </p>
//             </div>
//             <div className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Product Name
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Sales
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Revenue
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Growth
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {productPerformance.map((product) => (
//                       <tr key={product.name}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
//                           {product.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {product.sales.toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           ${product.revenue.toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                           {getGrowthIndicator(product.growth)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import {
//   Area,
//   AreaChart,
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Legend,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { Spinner } from "@nextui-org/react";
// import { useGetAllProducts } from "@/src/hooks/product";
// import { useGetAllOrder } from "@/src/hooks/order";
// import { useGetAllCategory } from "@/src/hooks/category";

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [timeRange, setTimeRange] = useState("yearly");
//   const [page, setPage] = useState(1);

//   // Use your existing hooks to fetch data
//   const { data: productsData, isLoading: isLoadingProducts } =
//     useGetAllProducts([
//       { name: "limit", value: 100 }, // Get more products for dashboard
//       { name: "page", value: 1 },
//     ]);

//   const { data: ordersData, isLoading: isLoadingOrders } = useGetAllOrder([
//     { name: "limit", value: 100 }, // Get more orders for dashboard
//     { name: "page", value: 1 },
//   ]);

//   const { data: categoriesData, isLoading: isLoadingCategories } =
//     useGetAllCategory([
//       { name: "limit", value: 100 }, // Get more categories for dashboard
//       { name: "page", value: 1 },
//     ]);

//   // Determine if any data is still loading
//   const isLoading = isLoadingProducts || isLoadingOrders || isLoadingCategories;

//   // Extract the actual data from the API responses
//   const products = productsData?.data || [];
//   const orders = ordersData?.data || [];
//   const categories = categoriesData?.data || [];

//   // Calculate dashboard metrics
//   const dashboardData = calculateDashboardMetrics(products, orders, categories);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "COMPLETED":
//         return "bg-green-100 text-green-800";
//       case "PENDING":
//         return "bg-blue-100 text-blue-800";
//       case "SHIPPED":
//         return "bg-yellow-100 text-yellow-800";
//       case "CANCELLED":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getGrowthIndicator = (growth: number) => {
//     if (growth > 0) {
//       return (
//         <span className="flex items-center text-green-600">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
//               clipRule="evenodd"
//             />
//           </svg>
//           {growth.toFixed(1)}%
//         </span>
//       );
//     } else {
//       return (
//         <span className="flex items-center text-red-600">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-1"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//           {Math.abs(growth).toFixed(1)}%
//         </span>
//       );
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-4 border rounded shadow-lg">
//           <p className="font-bold">{label}</p>
//           {payload.map((entry: any, index: number) => (
//             <p key={`item-${index}`} style={{ color: entry.color }}>
//               {entry.name}: {entry.value.toLocaleString()}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   if (isLoading) {
//     return (
//       <div className="col-span-9 w-full flex items-center justify-center h-[500px]">
//         <div className="flex flex-col items-center">
//           <Spinner size="lg" />
//           <p className="mt-4 text-gray-600">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="col-span-9 w-full flex items-center justify-center h-[500px]">
//         <div className="text-center">
//           <h3 className="text-xl font-semibold text-red-600 mb-2">
//             Error Loading Dashboard
//           </h3>
//           <p className="text-gray-600">Failed to load dashboard data</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="col-span-9 w-full">
//       {/* Dashboard Controls */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//         <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
//           <button
//             onClick={() => setActiveTab("overview")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "overview" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Overview
//           </button>
//           <button
//             onClick={() => setActiveTab("analytics")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "analytics" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Analytics
//           </button>
//           <button
//             onClick={() => setActiveTab("products")}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "products" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
//           >
//             Products
//           </button>
//         </div>
//         <div className="flex items-center gap-2">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
//           >
//             <option value="daily">Daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//             <option value="yearly">Yearly</option>
//           </select>
//           <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 text-gray-500"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//           <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Generate Report
//           </button>
//         </div>
//       </div>

//       {/* Overview Tab */}
//       {activeTab === "overview" && (
//         <div>
//           {/* Stats cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Revenue
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       ${dashboardData.stats.totalRevenue.toLocaleString()}
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       {getGrowthIndicator(dashboardData.stats.revenueGrowth)}
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "75%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Orders
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       {dashboardData.stats.totalOrders.toLocaleString()}
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       {getGrowthIndicator(dashboardData.stats.ordersGrowth)}
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "65%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Customers
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       {dashboardData.stats.totalCustomers.toLocaleString()}
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       {getGrowthIndicator(dashboardData.stats.customersGrowth)}
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "55%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">
//                       Total Products
//                     </p>
//                     <h3 className="text-2xl font-bold text-secondary mt-1">
//                       {dashboardData.stats.totalProducts.toLocaleString()}
//                     </h3>
//                     <div className="flex items-center text-green-600 mt-1">
//                       {getGrowthIndicator(dashboardData.stats.productsGrowth)}
//                     </div>
//                   </div>
//                   <div className="bg-primary bg-opacity-20 p-3 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-primary"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="mt-4 h-2">
//                   <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
//                     <div
//                       className="bg-primary h-full rounded-full"
//                       style={{ width: "45%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Revenue Overview
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Monthly revenue, profit, and expenses
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart
//                       data={dashboardData.revenueData}
//                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//                       key="revenue-chart"
//                     >
//                       <defs>
//                         <linearGradient
//                           id="colorRevenue"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#FFA500"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#FFA500"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                         <linearGradient
//                           id="colorProfit"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#82ca9d"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#82ca9d"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                         <linearGradient
//                           id="colorExpenses"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#2b2d42"
//                             stopOpacity={0.8}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#2b2d42"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Area
//                         type="monotone"
//                         dataKey="revenue"
//                         stroke="#FFA500"
//                         fillOpacity={1}
//                         fill="url(#colorRevenue)"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="profit"
//                         stroke="#82ca9d"
//                         fillOpacity={1}
//                         fill="url(#colorProfit)"
//                       />
//                       <Area
//                         type="monotone"
//                         dataKey="expenses"
//                         stroke="#2b2d42"
//                         fillOpacity={1}
//                         fill="url(#colorExpenses)"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Customer Acquisition
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   New vs returning customers
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                       data={dashboardData.customerData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="customer-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Bar
//                         dataKey="new"
//                         stackId="a"
//                         fill="#FFA500"
//                         name="New Customers"
//                       />
//                       <Bar
//                         dataKey="returning"
//                         stackId="a"
//                         fill="#2b2d42"
//                         name="Returning Customers"
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Categories and Recent Orders */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-1">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Product Categories
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Distribution of sales by category
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart key="pie-chart">
//                       <Pie
//                         data={dashboardData.categoryData}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) =>
//                           `${name}: ${(percent * 100).toFixed(0)}%`
//                         }
//                         outerRadius={80}
//                         fill="#8884d8"
//                         dataKey="value"
//                         animationBegin={0}
//                         animationDuration={1500}
//                       >
//                         {dashboardData.categoryData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Recent Orders
//                 </h2>
//                 <p className="text-sm text-gray-500">Latest customer orders</p>
//               </div>
//               <div className="p-4">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Order ID
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Customer
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
//                         >
//                           Product
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
//                         >
//                           Date
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Status
//                         </th>
//                         <th
//                           scope="col"
//                           className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                         >
//                           Total
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {dashboardData.recentOrders.map((order) => (
//                         <tr key={order.id}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
//                             {order.id}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {order.customer}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                             {order.product}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                             {order.date}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
//                             >
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                             {order.total}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="p-4 border-t border-gray-200">
//                 <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                   View All Orders
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Analytics Tab */}
//       {activeTab === "analytics" && (
//         <div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Sales Performance
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Monthly sales vs targets
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart
//                       data={dashboardData.salesData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="sales-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="sales"
//                         stroke="#FFA500"
//                         activeDot={{ r: 8 }}
//                         name="Actual Sales"
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="target"
//                         stroke="#2b2d42"
//                         strokeDasharray="5 5"
//                         name="Target Sales"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-secondary">
//                   Revenue Breakdown
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Revenue by product category
//                 </p>
//               </div>
//               <div className="p-4">
//                 <div style={{ height: "300px", width: "100%" }}>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                       data={dashboardData.categoryData}
//                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       key="revenue-breakdown-chart"
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar
//                         dataKey="value"
//                         name="Revenue"
//                         animationDuration={1500}
//                       >
//                         {dashboardData.categoryData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-secondary">
//                 Customer Activity
//               </h2>
//               <p className="text-sm text-gray-500">User engagement metrics</p>
//             </div>
//             <div className="p-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">87%</div>
//                     <p className="text-sm text-gray-500">Retention Rate</p>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">24.5</div>
//                     <p className="text-sm text-gray-500">
//                       Avg. Session Duration
//                     </p>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg border border-gray-200 p-4">
//                   <div className="flex flex-col items-center">
//                     <div className="text-4xl font-bold text-primary">3.2</div>
//                     <p className="text-sm text-gray-500">
//                       Avg. Orders per Customer
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ height: "300px", width: "100%" }}>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart
//                     data={dashboardData.customerData}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     key="customer-activity-chart"
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Legend />
//                     <Line
//                       type="monotone"
//                       dataKey="new"
//                       stroke="#FFA500"
//                       name="New Users"
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="returning"
//                       stroke="#2b2d42"
//                       name="Returning Users"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Products Tab */}
//       {activeTab === "products" && (
//         <div>
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
//             <div className="p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-secondary">
//                 Top Performing Products
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Products with highest sales and revenue
//               </p>
//             </div>
//             <div className="p-4">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Product Name
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Sales
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Revenue
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         Growth
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {dashboardData.productPerformance.map((product) => (
//                       <tr key={product.name}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
//                           {product.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           {product.sales.toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
//                           ${product.revenue.toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
//                           {getGrowthIndicator(product.growth)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Function to calculate dashboard metrics from products and orders
// function calculateDashboardMetrics(products, orders, categories) {
//   // Calculate total revenue
//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + (order.total || 0),
//     0
//   );

//   // Count total orders
//   const totalOrders = orders.length;

//   // Count unique customers
//   const uniqueCustomers = new Set(
//     orders.map((order) => order.customer?.email || order.customer?.name)
//   ).size;

//   // Count total products
//   const totalProducts = products.length;

//   // Calculate revenue by category
//   const revenueByCategory = {};

//   // Initialize categories with 0 revenue
//   categories.forEach((category) => {
//     revenueByCategory[category.name] = 0;
//   });

//   // Calculate revenue for each category
//   orders.forEach((order) => {
//     const product = products.find((p) => p.id === order.product?.id);
//     if (product && product.category) {
//       const categoryName = product.category.name;
//       revenueByCategory[categoryName] =
//         (revenueByCategory[categoryName] || 0) + (order.total || 0);
//     }
//   });

//   // Convert to array for charts
//   const categoryData = Object.entries(revenueByCategory).map(
//     ([name, value], index) => {
//       // Predefined colors for categories
//       const colors = ["#FFA500", "#2b2d42", "#FFBB28", "#FF8042", "#8884d8"];
//       return {
//         name,
//         value,
//         color: colors[index % colors.length],
//       };
//     }
//   );

//   // Calculate monthly revenue data
//   const monthlyData = {};
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   orders.forEach((order) => {
//     if (!order.createdAt) return;

//     const date = new Date(order.createdAt);
//     const month = months[date.getMonth()];

//     if (!monthlyData[month]) {
//       monthlyData[month] = { revenue: 0, profit: 0, expenses: 0 };
//     }

//     monthlyData[month].revenue += order.total || 0;
//     // Estimate profit as 40% of revenue
//     monthlyData[month].profit += (order.total || 0) * 0.4;
//     // Estimate expenses as 60% of revenue
//     monthlyData[month].expenses += (order.total || 0) * 0.6;
//   });

//   // Convert to array for charts
//   const revenueData = months.map((month) => ({
//     name: month,
//     revenue: monthlyData[month]?.revenue || 0,
//     profit: monthlyData[month]?.profit || 0,
//     expenses: monthlyData[month]?.expenses || 0,
//   }));

//   // Calculate monthly customer data (placeholder data)
//   const customerData = months.map((month) => ({
//     name: month,
//     new: Math.floor(Math.random() * 50) + 30,
//     returning: Math.floor(Math.random() * 60) + 30,
//   }));

//   // Calculate sales data
//   const salesData = months.map((month) => ({
//     name: month,
//     sales: monthlyData[month]?.revenue
//       ? Math.floor(monthlyData[month].revenue / 100)
//       : 0,
//     target: monthlyData[month]?.revenue
//       ? Math.floor(monthlyData[month].revenue / 80)
//       : 0,
//   }));

//   // Get top performing products
//   const productPerformance = products
//     .map((product) => {
//       // Calculate total sales for this product
//       const productOrders = orders.filter(
//         (order) =>
//           order.product?.id === product.id ||
//           order.products?.some((p) => p.productId === product.id)
//       );

//       const sales = productOrders.reduce(
//         (sum, order) =>
//           sum +
//           (order.quantity ||
//             order.products?.find((p) => p.productId === product.id)?.quantity ||
//             1),
//         0
//       );

//       const revenue = productOrders.reduce(
//         (sum, order) =>
//           sum + (order.total || product.price * (order.quantity || 1)),
//         0
//       );

//       return {
//         name: product.name,
//         sales,
//         revenue,
//         growth: Math.random() * 30 - 5, // Random growth between -5% and 25%
//       };
//     })
//     .sort((a, b) => b.revenue - a.revenue)
//     .slice(0, 5); // Top 5 products

//   // Format recent orders for display
//   const recentOrders = orders
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt || 0).getTime() -
//         new Date(a.createdAt || 0).getTime()
//     )
//     .slice(0, 5) // Most recent 5 orders
//     .map((order) => {
//       const product = products.find((p) => p.id === order.product?.id);
//       return {
//         id: order.id,
//         customer: order.customer?.name || "Unknown Customer",
//         product: product?.name || order.product?.name || "Multiple Products",
//         date: order.createdAt
//           ? new Date(order.createdAt).toISOString().split("T")[0]
//           : "Unknown Date",
//         status: order.status || "PENDING",
//         total: `$${(order.total || 0).toLocaleString()}`,
//       };
//     });

//   return {
//     stats: {
//       totalRevenue,
//       totalOrders,
//       totalCustomers: uniqueCustomers,
//       totalProducts,
//       revenueGrowth: 15.2, // Placeholder
//       ordersGrowth: 12.3, // Placeholder
//       customersGrowth: 8.7, // Placeholder
//       productsGrowth: 3.2, // Placeholder
//     },
//     revenueData,
//     salesData,
//     categoryData,
//     customerData,
//     productPerformance,
//     recentOrders,
//   };
// }

"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Spinner } from "@nextui-org/react";
import { useGetAllProducts } from "@/src/hooks/product";
import { useGetAllOrder } from "@/src/hooks/order";
import { useGetAllCategory } from "@/src/hooks/category";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("yearly");
  const [page, setPage] = useState(1);

  // Use your existing hooks to fetch data
  const { data: productsData, isLoading: isLoadingProducts } =
    useGetAllProducts([
      { name: "limit", value: 100 }, // Get more products for dashboard
      { name: "page", value: 1 },
    ]);

  const { data: ordersData, isLoading: isLoadingOrders } = useGetAllOrder([
    { name: "limit", value: 100 }, // Get more orders for dashboard
    { name: "page", value: 1 },
  ]);

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetAllCategory([
      { name: "limit", value: 100 }, // Get more categories for dashboard
      { name: "page", value: 1 },
    ]);

  // Determine if any data is still loading
  const isLoading = isLoadingProducts || isLoadingOrders || isLoadingCategories;

  // Extract the actual data from the API responses
  const products = productsData?.data || [];
  const orders = ordersData?.data || [];
  const categories = categoriesData?.data || [];

  // Calculate dashboard metrics
  const dashboardData = calculateDashboardMetrics(products, orders, categories);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <span className="flex items-center text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
              clipRule="evenodd"
            />
          </svg>
          {growth.toFixed(1)}%
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {Math.abs(growth).toFixed(1)}%
        </span>
      );
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-bold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="col-span-9 w-full flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="pr-12 col-span-9 w-full flex items-center justify-center h-[500px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-600">Failed to load dashboard data</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-9 w-full">
      {/* Dashboard Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "overview" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "analytics" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === "products" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
          >
            Products
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </p>
                    <h3 className="text-2xl font-bold text-secondary mt-1">
                      ${dashboardData.stats.totalRevenue.toLocaleString()}
                    </h3>
                    <div className="flex items-center text-green-600 mt-1">
                      {getGrowthIndicator(dashboardData.stats.revenueGrowth)}
                    </div>
                  </div>
                  <div className="bg-primary bg-opacity-20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 h-2">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Orders
                    </p>
                    <h3 className="text-2xl font-bold text-secondary mt-1">
                      {dashboardData.stats.totalOrders.toLocaleString()}
                    </h3>
                    <div className="flex items-center text-green-600 mt-1">
                      {getGrowthIndicator(dashboardData.stats.ordersGrowth)}
                    </div>
                  </div>
                  <div className="bg-primary bg-opacity-20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 h-2">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Customers
                    </p>
                    <h3 className="text-2xl font-bold text-secondary mt-1">
                      {dashboardData.stats.totalCustomers.toLocaleString()}
                    </h3>
                    <div className="flex items-center text-green-600 mt-1">
                      {getGrowthIndicator(dashboardData.stats.customersGrowth)}
                    </div>
                  </div>
                  <div className="bg-primary bg-opacity-20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 h-2">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Products
                    </p>
                    <h3 className="text-2xl font-bold text-secondary mt-1">
                      {dashboardData.stats.totalProducts.toLocaleString()}
                    </h3>
                    <div className="flex items-center text-green-600 mt-1">
                      {getGrowthIndicator(dashboardData.stats.productsGrowth)}
                    </div>
                  </div>
                  <div className="bg-primary bg-opacity-20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                      <path
                        fillRule="evenodd"
                        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 h-2">
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Revenue Overview
                </h2>
                <p className="text-sm text-gray-500">
                  Monthly revenue, profit, and expenses
                </p>
              </div>
              <div className="p-4">
                <div style={{ height: "300px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={dashboardData.revenueData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      key="revenue-chart"
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#FFA500"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FFA500"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorProfit"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorExpenses"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#2b2d42"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#2b2d42"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FFA500"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorProfit)"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#2b2d42"
                        fillOpacity={1}
                        fill="url(#colorExpenses)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Customer Acquisition
                </h2>
                <p className="text-sm text-gray-500">
                  New vs returning customers
                </p>
              </div>
              <div className="p-4">
                <div style={{ height: "300px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={dashboardData.customerData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      key="customer-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="new"
                        stackId="a"
                        fill="#FFA500"
                        name="New Customers"
                      />
                      <Bar
                        dataKey="returning"
                        stackId="a"
                        fill="#2b2d42"
                        name="Returning Customers"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories and Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-1">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Product Categories
                </h2>
                <p className="text-sm text-gray-500">
                  Distribution of sales by category
                </p>
              </div>
              <div className="p-4">
                <div style={{ height: "300px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart key="pie-chart">
                      <Pie
                        data={dashboardData.categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        animationBegin={0}
                        animationDuration={1500}
                      >
                        {dashboardData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                      <Legend formatter={(value, entry) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Add a table below the chart to show exact values */}
                <div className="mt-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData.categoryData.map((category, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <span
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: category.color }}
                              ></span>
                              {category.name}
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                            ${category.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Recent Orders
                </h2>
                <p className="text-sm text-gray-500">Latest customer orders</p>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {/* Customer Id */}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData.recentOrders.map((order:any) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* {order.userid || "N/A"} */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {order.product}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {order.total.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  View All Orders
                </button>
              </div>
            </div>
          </div>

          {/* Top Products Table */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Top Products
                </h2>
                <p className="text-sm text-gray-500">
                  Best performing products by sales
                </p>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Sales
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData.productPerformance
                        .slice(0, 5)
                        .map((product:any) => (
                          <tr key={product.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                              {product.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {product.category || "Uncategorized"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              ${product.price?.toLocaleString() || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {product.sales.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              ${product.revenue.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Sales Performance
                </h2>
                <p className="text-sm text-gray-500">
                  Monthly sales vs targets
                </p>
              </div>
              <div className="p-4">
                <div style={{ height: "300px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={dashboardData.salesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      key="sales-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#FFA500"
                        activeDot={{ r: 8 }}
                        name="Actual Sales"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#2b2d42"
                        strokeDasharray="5 5"
                        name="Target Sales"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary">
                  Revenue Breakdown
                </h2>
                <p className="text-sm text-gray-500">
                  Revenue by product category
                </p>
              </div>
              <div className="p-4">
                <div style={{ height: "300px", width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={dashboardData.categoryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      key="revenue-breakdown-chart"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        name="Revenue"
                        animationDuration={1500}
                      >
                        {dashboardData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-secondary">
                Customer Activity
              </h2>
              <p className="text-sm text-gray-500">User engagement metrics</p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-primary">87%</div>
                    <p className="text-sm text-gray-500">Retention Rate</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-primary">24.5</div>
                    <p className="text-sm text-gray-500">
                      Avg. Session Duration
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-bold text-primary">3.2</div>
                    <p className="text-sm text-gray-500">
                      Avg. Orders per Customer
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ height: "300px", width: "100%" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={dashboardData.customerData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    key="customer-activity-chart"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="new"
                      stroke="#FFA500"
                      name="New Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="returning"
                      stroke="#2b2d42"
                      name="Returning Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-secondary">
                Top Performing Products
              </h2>
              <p className="text-sm text-gray-500">
                Products with highest sales and revenue
              </p>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sales
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Revenue
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.productPerformance.map((product:any) => (
                      <tr key={product.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {product.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          ${product.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {getGrowthIndicator(product.growth)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Function to calculate dashboard metrics from products and orders
//@ts-ignore
function calculateDashboardMetrics(products, orders, categories) {
  // Calculate total revenue
  const totalRevenue = orders.reduce(
    //@ts-ignore
    (sum, order) => sum + (order.total || 0),
    0
  );

  // Count total orders
  const totalOrders = orders.length;

  // Count unique customers
  const uniqueCustomers = new Set(
    orders.map(
      //@ts-ignore
      (order) =>
        order.customer?.email || order.customer?.name || order.customer?.id
    )
  ).size;

  // Count total products
  const totalProducts = products.length;

  // Calculate revenue by category
  const revenueByCategory = {};

  // Initialize categories with 0 revenue
  //@ts-ignore
  categories.forEach((category) => {
    if (category && category.name) {
      //@ts-ignore
      revenueByCategory[category.name] = 0;
    }
  });

  // Calculate revenue for each category
  //@ts-ignore
  orders.forEach((order) => {
    // Handle orders with multiple products
    if (
      order.products &&
      Array.isArray(order.products) &&
      order.products.length > 0
    ) {
      //@ts-ignore
      order.products.forEach((orderProduct) => {
        const product = products.find(
          //@ts-ignore
          (p) => p.id === orderProduct.productId || p.id === orderProduct.id
        );
        if (product && product.category && product.category.name) {
          const categoryName = product.category.name;
          const itemTotal = orderProduct.price * (orderProduct.quantity || 1);
          //@ts-ignore
          revenueByCategory[categoryName] =
            //@ts-ignore
            (revenueByCategory[categoryName] || 0) + itemTotal;
        }
      });
    }
    // Handle orders with a single product
    else if (order.product) {
      //@ts-ignore
      const product = products.find((p) => p.id === order.product.id);
      if (product && product.category && product.category.name) {
        const categoryName = product.category.name;
        //@ts-ignore
        revenueByCategory[categoryName] =
          //@ts-ignore
          (revenueByCategory[categoryName] || 0) + (order.total || 0);
      }
    }
    // If order doesn't specify products but has a category directly
    else if (order.category && order.category.name) {
      const categoryName = order.category.name;
      //@ts-ignore
      revenueByCategory[categoryName] =
        //@ts-ignore
        (revenueByCategory[categoryName] || 0) + (order.total || 0);
    }
  });

  // If no categories have revenue yet, add some sample data for demonstration
  if (
    Object.keys(revenueByCategory).length === 0 ||
    Object.values(revenueByCategory).every((val) => val === 0)
  ) {
    // Add sample data based on product categories
    //@ts-ignore
    products.forEach((product) => {
      if (product.category && product.category.name) {
        const categoryName = product.category.name;
        // Use product price as a fallback for revenue
        //@ts-ignore
        revenueByCategory[categoryName] =
          //@ts-ignore
          (revenueByCategory[categoryName] || 0) + (product.price || 100);
      }
    });

    // If still no data, add some default categories
    if (Object.keys(revenueByCategory).length === 0) {
      //@ts-ignore
      revenueByCategory["Electronics"] = 5000;
      //@ts-ignore
      revenueByCategory["Clothing"] = 3500;
      //@ts-ignore
      revenueByCategory["Home & Kitchen"] = 2800;
      //@ts-ignore
      revenueByCategory["Books"] = 1500;
      //@ts-ignore
      revenueByCategory["Others"] = 2000;
    }
  }

  // Convert to array for charts
  const categoryData = Object.entries(revenueByCategory).map(
    ([name, value], index) => {
      // Predefined colors for categories
      const colors = [
        "#FFA500",
        "#2b2d42",
        "#FFBB28",
        "#FF8042",
        "#8884d8",
        "#82ca9d",
        "#ffc658",
      ];
      return {
        name,
        value: Number(value) || 0,
        color: colors[index % colors.length],
      };
    }
  );

  // Calculate monthly revenue data
  const monthlyData = {};
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //@ts-ignore
  orders.forEach((order) => {
    if (!order.createdAt) return;

    const date = new Date(order.createdAt);
    const month = months[date.getMonth()];
    //@ts-ignore
    if (!monthlyData[month]) {
      //@ts-ignore
      monthlyData[month] = { revenue: 0, profit: 0, expenses: 0 };
    }
    //@ts-ignore
    monthlyData[month].revenue += order.total || 0;
    // Estimate profit as 40% of revenue
    //@ts-ignore
    monthlyData[month].profit += (order.total || 0) * 0.4;
    // Estimate expenses as 60% of revenue
    //@ts-ignore
    monthlyData[month].expenses += (order.total || 0) * 0.6;
  });

  // Convert to array for charts
  const revenueData = months.map((month) => ({
    name: month,
    //@ts-ignore
    revenue: monthlyData[month]?.revenue || 0,
    //@ts-ignore
    profit: monthlyData[month]?.profit || 0,
    //@ts-ignore
    expenses: monthlyData[month]?.expenses || 0,
  }));

  // Calculate monthly customer data (placeholder data)
  const customerData = months.map((month) => ({
    name: month,
    new: Math.floor(Math.random() * 50) + 30,
    returning: Math.floor(Math.random() * 60) + 30,
  }));

  // Calculate sales data
  const salesData = months.map((month) => ({
    name: month,
    //@ts-ignore
    sales: monthlyData[month]?.revenue
      ? //@ts-ignore
        Math.floor(monthlyData[month].revenue / 100)
      : 0,
    //@ts-ignore
    target: monthlyData[month]?.revenue
      ? //@ts-ignore
        Math.floor(monthlyData[month].revenue / 80)
      : 0,
  }));

  // Get top performing products
  const productPerformance = products
    //@ts-ignore
    .map((product) => {
      // Calculate total sales for this product
      const productOrders = orders.filter(
        //@ts-ignore
        (order) =>
          order.product?.id === product.id ||
          //@ts-ignore
          order.products?.some((p) => p.productId === product.id)
      );

      const sales = productOrders.reduce(
        //@ts-ignore
        (sum, order) =>
          sum +
          (order.quantity ||
            //@ts-ignore
            order.products?.find((p) => p.productId === product.id)?.quantity ||
            1),
        0
      );

      const revenue = productOrders.reduce(
        //@ts-ignore
        (sum, order) =>
          sum + (order.total || product.price * (order.quantity || 1)),
        0
      );

      return {
        name: product.name,
        category: product.category?.name,
        price: product.price,
        sales,
        revenue,
        growth: Math.random() * 30 - 5, // Random growth between -5% and 25%
      };
    })
    //@ts-ignore
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // Top 5 products

  // Format recent orders for display
  const recentOrders = orders
    .sort(
      //@ts-ignore
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5) // Most recent 5 orders
    //@ts-ignore
    .map((order) => {
      //@ts-ignore
      const product = products.find((p) => p.id === order.product?.id);
      return {
        id: order.id,
        customer: order.customer?.name || order.customer?.email || "Guest User",
        product: product?.name || order.product?.name || "Multiple Products",
        date: order.createdAt
          ? new Date(order.createdAt).toISOString().split("T")[0]
          : "Unknown Date",
        status: order.status || "PENDING",
        total: `$${(order.total || 0).toLocaleString()}`,
      };
    });

  return {
    stats: {
      totalRevenue,
      totalOrders,
      totalCustomers: uniqueCustomers,
      totalProducts,
      revenueGrowth: 15.2, // Placeholder
      ordersGrowth: 12.3, // Placeholder
      customersGrowth: 8.7, // Placeholder
      productsGrowth: 3.2, // Placeholder
    },
    revenueData,
    salesData,
    categoryData,
    customerData,
    productPerformance,
    recentOrders,
  };
}

