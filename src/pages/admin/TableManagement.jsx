import { useState, useEffect } from "react";
import { Users, Coffee, Check, Ban, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TableManagement() {
  // Mock data for tables
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1", status: "available", capacity: 2, orders: [] },
    { id: 2, name: "Table 2", status: "occupied", capacity: 4, customerName: "Smith Family", orders: [
      { id: 1, name: "Cappuccino", price: 4.50, quantity: 2 },
      { id: 2, name: "Croissant", price: 3.25, quantity: 2 },
    ]},
    { id: 3, name: "Table 3", status: "reserved", capacity: 2, customerName: "Johnson", reservationTime: "2:30 PM", orders: [] },
    { id: 4, name: "Table 4", status: "occupied", capacity: 6, customerName: "Martinez Group", orders: [
      { id: 3, name: "Latte", price: 4.25, quantity: 3 },
      { id: 4, name: "Sandwich", price: 7.50, quantity: 3 },
      { id: 5, name: "Cheesecake", price: 5.75, quantity: 1 },
    ]},
    { id: 5, name: "Table 5", status: "available", capacity: 4, orders: [] },
    { id: 6, name: "Table 6", status: "occupied", capacity: 4, customerName: "Garcia", orders: [
      { id: 6, name: "Espresso", price: 3.50, quantity: 2 },
      { id: 7, name: "Muffin", price: 2.75, quantity: 2 },
    ]},
    { id: 7, name: "Table 7", status: "available", capacity: 2, orders: [] },
    { id: 8, name: "VIP Room", status: "reserved", capacity: 8, customerName: "Williams Party", reservationTime: "6:15 PM", orders: [] },
  ]);

  // Function to add a customer to a table
  const assignCustomer = (tableId) => {
    const customerName = prompt("Enter customer name:");
    if (customerName) {
      setTables(tables.map(table => 
        table.id === tableId 
          ? { ...table, status: "occupied", customerName, orders: [] } 
          : table
      ));
    }
  };

  // Function to add an order to a table
  const addOrder = (tableId) => {
    // In a real app, this would open a modal with a menu to select items
    // For this demo, we'll just add a mock item
    const mockItems = [
      { id: Math.random(), name: "Coffee", price: 3.50, quantity: 1 },
      { id: Math.random(), name: "Cake", price: 5.25, quantity: 1 }
    ];
    
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, orders: [...table.orders, ...mockItems] } 
        : table
    ));
  };

  // Function to clear a table (customer pays and leaves)
  const clearTable = (tableId) => {
    if (confirm("Has the customer paid? This will clear the table.")) {
      setTables(tables.map(table => 
        table.id === tableId 
          ? { ...table, status: "available", customerName: null, orders: [] } 
          : table
      ));
    }
  };

  // Function to calculate total bill for a table
  const calculateTotal = (orders) => {
    return orders.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Group tables by status for easier display
  const availableTables = tables.filter(table => table.status === "available");
  const occupiedTables = tables.filter(table => table.status === "occupied");
  const reservedTables = tables.filter(table => table.status === "reserved");

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-white">Table Management</h1>
      
      <div className="flex justify-between mb-6">
        <div className="stats flex gap-4">
          <div className="stat bg-gray-800 shadow p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-900/20 rounded-full">
                <Check className="text-green-400" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Available</div>
                <div className="font-semibold text-white">{availableTables.length} Tables</div>
              </div>
            </div>
          </div>
          
          <div className="stat bg-gray-800 shadow p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-900/20 rounded-full">
                <Users className="text-blue-400" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Occupied</div>
                <div className="font-semibold text-white">{occupiedTables.length} Tables</div>
              </div>
            </div>
          </div>
          
          <div className="stat bg-gray-800 shadow p-4 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-900/20 rounded-full">
                <Coffee className="text-yellow-400" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-400">Reserved</div>
                <div className="font-semibold text-white">{reservedTables.length} Tables</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button className="bg-orange-400 hover:bg-orange-500 text-black">Add Reservation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tables.map(table => (
          <div 
            key={table.id} 
            className={`bg-gray-800 shadow rounded-lg overflow-hidden border-t-4 border-gray-700 ${
              table.status === 'available' 
                ? 'border-t-green-400' 
                : table.status === 'occupied' 
                  ? 'border-t-blue-400' 
                  : 'border-t-yellow-400'
            }`}
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-white">{table.name}</h3>
                <span 
                  className={`px-2 py-1 rounded-full text-xs ${
                    table.status === 'available' 
                      ? 'bg-green-900/30 text-green-400' 
                      : table.status === 'occupied' 
                        ? 'bg-blue-900/30 text-blue-400' 
                        : 'bg-yellow-900/30 text-yellow-400'
                  }`}
                >
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-400">Capacity: {table.capacity} people</div>
              
              {table.customerName && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-200">Customer: {table.customerName}</span>
                  {table.reservationTime && (
                    <span className="text-sm text-gray-400 ml-2">({table.reservationTime})</span>
                  )}
                </div>
              )}
            </div>

            {table.status === 'occupied' && (
              <div className="p-4 bg-gray-700 border-b border-gray-600">
                <h4 className="font-medium mb-2 text-white">Current Order</h4>
                {table.orders.length > 0 ? (
                  <>
                    <ul className="text-sm space-y-1">
                      {table.orders.map(item => (
                        <li key={item.id} className="flex justify-between text-gray-300">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-gray-600 flex justify-between font-medium">
                      <span className="text-gray-300">Total:</span>
                      <span className="text-orange-400">${calculateTotal(table.orders).toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No items ordered yet</p>
                )}
              </div>
            )}

            <div className="p-4 flex gap-2">
              {table.status === 'available' && (
                <Button 
                  size="sm" 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => assignCustomer(table.id)}
                >
                  Assign Customer
                </Button>
              )}
              
              {table.status === 'occupied' && (
                <>
                  <Button 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => addOrder(table.id)}
                  >
                    Add Order
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="bg-orange-400 hover:bg-orange-500 flex items-center gap-1 text-black"
                    onClick={() => clearTable(table.id)}
                  >
                    <CreditCard size={16} /> Settle Bill
                  </Button>
                </>
              )}
              
              {table.status === 'reserved' && (
                <Button 
                  size="sm" 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => assignCustomer(table.id)}
                >
                  Check In
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}