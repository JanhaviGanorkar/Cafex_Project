import { useState, useEffect } from "react";
import { PieChart, ShoppingBasket, Coffee, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [dailySales, setDailySales] = useState(0);
  const [tablesOccupied, setTablesOccupied] = useState(0);
  const [bookingsToday, setBookingsToday] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  useEffect(() => {
    setDailySales(4250);
    setTablesOccupied(5);
    setBookingsToday(8);
    setLowStockItems(3);
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">Cafe Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Daily Sales Stats */}
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6 border-l-4 border-orange-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Today's Sales</p>
              <p className="text-2xl font-semibold">${dailySales.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
              <PieChart className="text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/sales" className="text-sm text-orange-400 hover:underline">View details</Link>
          </div>
        </div>

        {/* Tables Occupied */}
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tables Occupied</p>
              <p className="text-2xl font-semibold">{tablesOccupied} / 15</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <Coffee className="text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/tables" className="text-sm text-blue-400 hover:underline">Manage tables</Link>
          </div>
        </div>

        {/* Today's Bookings */}
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Today's Bookings</p>
              <p className="text-2xl font-semibold">{bookingsToday}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <CalendarDays className="text-green-400" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/bookings" className="text-sm text-green-400 hover:underline">View bookings</Link>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6 border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Low Stock Items</p>
              <p className="text-2xl font-semibold">{lowStockItems}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
              <ShoppingBasket className="text-red-400" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/inventory" className="text-sm text-red-400 hover:underline">Check inventory</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="col-span-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="py-2 px-4">Table</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-4">Table 4</td>
                  <td className="py-2 px-4">3 items</td>
                  <td className="py-2 px-4">$24.50</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs">
                      In progress
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Link to="/admin/billing/table/4" className="text-blue-500 hover:underline">View</Link>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-4">Table 7</td>
                  <td className="py-2 px-4">5 items</td>
                  <td className="py-2 px-4">$42.75</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                      Ready to pay
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Link to="/admin/billing/table/7" className="text-blue-500 hover:underline">View</Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Table 2</td>
                  <td className="py-2 px-4">2 items</td>
                  <td className="py-2 px-4">$18.00</td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                      Just seated
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Link to="/admin/billing/table/2" className="text-blue-500 hover:underline">View</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link to="/admin/orders" className="text-sm text-orange-400 hover:underline">View all orders</Link>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex justify-between">
                <span className="font-medium">John Smith</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">2:00 PM</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">4 people • Table 6</div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex justify-between">
                <span className="font-medium">Sarah Johnson</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">3:30 PM</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">2 people • Table 3</div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex justify-between">
                <span className="font-medium">Michael Brown</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">6:15 PM</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">8 people • VIP Room</div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link to="/admin/bookings" className="text-sm text-orange-400 hover:underline">View all bookings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
