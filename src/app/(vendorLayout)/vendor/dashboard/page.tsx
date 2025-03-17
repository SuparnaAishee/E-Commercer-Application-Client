
"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Progress,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react"
import { useGetMyShop } from "@/src/hooks/shop"
import { useGetMyProducts } from "@/src/hooks/product"
import { useGetShopOrder } from "@/src/hooks/order"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import moment from "moment"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenueGrowth, setRevenueGrowth] = useState(0);
  const [productGrowth, setProductGrowth] = useState(0);
  const [orderGrowth, setOrderGrowth] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  interface Order {
    id: string;
    productId: string;
    product: {
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
    isPaid: boolean;
    status: string;
    createdAt: string;
  }

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  interface Product {
    id: string;
    name: string;
    image: string;
    quantity: number;
    revenue: number;
    price: number;
  }

  const [topProducts, setTopProducts] = useState<Product[]>([]);

  // Fetch shop data
  const { data: shopData, isLoading: shopLoading } = useGetMyShop();
  const shopId = shopData?.data?.id;

  // Fetch products data
  const { data: productsData, isLoading: productsLoading } = useGetMyProducts([
    { name: "limit", value: 100 },
    { name: "page", value: 1 },
  ]);

  // Fetch orders data
  const { data: ordersData, isLoading: ordersLoading } = useGetShopOrder({
    limit: 100,
    page: 1,
    shopId: shopId as string,
  });

  useEffect(() => {
    if (shopData?.data && productsData?.data && ordersData?.data) {
      // Calculate total revenue
      const revenue = ordersData.data.reduce((total, order) => {
        if (order.isPaid) {
          return total + order.quantity * order.product.price;
        }
        return total;
      }, 0);
      setTotalRevenue(revenue);

      // Set total products and orders
      setTotalProducts(productsData.meta?.total || productsData.data.length);
      setTotalOrders(ordersData.meta?.total || ordersData.data.length);

      // Set growth percentages (mock data for now)
      setRevenueGrowth(20.1);
      setProductGrowth(12.2);
      setOrderGrowth(8.1);

      // Generate sales data for the last 6 months
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const mockSalesData = months.map((month, index) => {
        // Generate random sales data between 2000 and 6000
        const sales = Math.floor(Math.random() * 4000) + 2000;
        return { name: month, sales };
      });
      //@ts-ignore
      setSalesData(mockSalesData);

      // Generate category data
      const categories = {};
      productsData.data.forEach((product) => {
        const categoryName = product.category.name;
        //@ts-ignore
        if (categories[categoryName]) {
          //@ts-ignore
          categories[categoryName]++;
        } else {
          //@ts-ignore
          categories[categoryName] = 1;
        }
      });

      const categoryChartData = Object.keys(categories).map((name) => ({
        name,
        //@ts-ignore
        value: categories[name],
      }));
      //@ts-ignore
      setCategoryData(categoryChartData);

      // Set recent orders
      const recent = ordersData.data
        //@ts-ignore
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      //@ts-ignore
      setRecentOrders(recent);

      // Set top products (based on order quantity)
      const productSales = {};
      ordersData.data.forEach((order) => {
        const productId = order.product.id;
        //@ts-ignore
        if (productSales[productId]) {
          //@ts-ignore
          productSales[productId].quantity += order.quantity;
          //@ts-ignore
          productSales[productId].revenue +=
            order.quantity * order.product.price;
        } else {
          //@ts-ignore
          productSales[productId] = {
            id: productId,
            name: order.product.name,
            image: order.product.images[0],
            quantity: order.quantity,
            revenue: order.quantity * order.product.price,
            price: order.product.price,
          };
        }
      });

      const topProductsList = Object.values(productSales)
        //@ts-ignore
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);
      //@ts-ignore
      setTopProducts(topProductsList);
    }
  }, [shopData, productsData, ordersData]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const isLoading = shopLoading || productsLoading || ordersLoading || !shopId;

  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-9 flex justify-center items-center h-[70vh]">
        <Spinner size="lg" />
      </div>
    );
  }
  //@ts-ignore
  const renderOrderCell = (order, columnKey) => {
    const cellValue = order[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <User
            className="cursor-pointer"
            onClick={() => router.push(`/products/${order?.productId}`)}
            avatarProps={{ radius: "lg", src: order.product.images[0] }}
            description={`$${order.product.price}`}
            name={order.product.name}
          />
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={
              order?.status === "COMPLETED"
                ? "success"
                : order.status === "PENDING"
                  ? "warning"
                  : "danger"
            }
            size="sm"
            variant="flat"
          >
            {order.status}
          </Chip>
        );
      case "isPaid":
        return (
          <Chip
            className="capitalize"
            color={order?.isPaid ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </Chip>
        );
      case "date":
        return moment(order.createdAt).format("MMM DD, YYYY");
      default:
        return cellValue;
    }
  };

  return (
    <div className="col-span-12 lg:col-span-9 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-500">
          Overview of your vendor store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <Card className="bg-white">
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">
                  ${totalRevenue.toFixed(2)}
                </h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +{revenueGrowth}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                  <span className="text-gray-500 ml-1">from last month</span>
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Products Card */}
        <Card className="bg-white">
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <h3 className="text-2xl font-bold">{totalProducts}</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +{productGrowth}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                  <span className="text-gray-500 ml-1">from last month</span>
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Orders Card */}
        <Card className="bg-white">
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders}</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  +{orderGrowth}%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                  <span className="text-gray-500 ml-1">from last month</span>
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Active Shop Card */}
        <Card className="bg-white">
          <CardBody className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Active Shop</p>
                <h3 className="text-2xl font-bold">1</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {shopData?.data?.shopName || "Your Shop"}
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-amber-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card className="bg-white">
          <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
            <h4 className="text-lg font-medium">Monthly Sales</h4>
            <p className="text-sm text-gray-500">
              Your sales performance over the last 6 months
            </p>
          </CardHeader>
          <CardBody className="overflow-hidden px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Product Categories Chart */}
        <Card className="bg-white">
          <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
            <h4 className="text-lg font-medium">Product Categories</h4>
            <p className="text-sm text-gray-500">
              Distribution of your products by category
            </p>
          </CardHeader>
          <CardBody className="overflow-hidden px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-white">
        <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
          <h4 className="text-lg font-medium">Recent Orders</h4>
          <p className="text-sm text-gray-500">
            Latest customer orders for your products
          </p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Recent orders table">
            <TableHeader>
              <TableColumn>PRODUCT</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>PAYMENT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DATE</TableColumn>
            </TableHeader>
            <TableBody items={recentOrders}>
              {(order) => (
                //@ts-ignore
                <TableRow key={order.id}>
                  <TableCell>{renderOrderCell(order, "product")}</TableCell>
                  
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{renderOrderCell(order, "isPaid")}</TableCell>
                  <TableCell>{renderOrderCell(order, "status")}</TableCell>
                  <TableCell>{renderOrderCell(order, "date")}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Top Products */}
      <Card className="bg-white">
        <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
          <h4 className="text-lg font-medium">Top Products</h4>
          <p className="text-sm text-gray-500">
            Your best-selling products by quantity
          </p>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    
                    <h5 className="font-medium">{product.name}</h5>
                    <span className="text-sm font-medium">
                        
                      ${product.revenue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      {product.quantity} units sold at ${product.price} each
                    </span>
                    <Chip size="sm" variant="flat" color="primary">
                      #{index + 1}
                    </Chip>
                  </div>
                  <Progress
                    value={100 - index * 15}
                    className="mt-2"
                    size="sm"
                    color={
                      index === 0
                        ? "success"
                        : index < 3
                          ? "primary"
                          : "default"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

