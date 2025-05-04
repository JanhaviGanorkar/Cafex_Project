import { useState, useEffect } from "react";
import { CreditCard, Coffee, Plus, ChevronDown, Printer, X, CheckCircle2, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BillingManagement() {
  // Mock menu data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Espresso", category: "Coffee", price: 3.50 },
    { id: 2, name: "Cappuccino", category: "Coffee", price: 4.50 },
    { id: 3, name: "Latte", category: "Coffee", price: 4.25 },
    { id: 4, name: "Americano", category: "Coffee", price: 3.75 },
    { id: 5, name: "Mocha", category: "Coffee", price: 5.00 },
    { id: 6, name: "Earl Grey Tea", category: "Tea", price: 3.25 },
    { id: 7, name: "Green Tea", category: "Tea", price: 3.25 },
    { id: 8, name: "Croissant", category: "Bakery", price: 3.25 },
    { id: 9, name: "Blueberry Muffin", category: "Bakery", price: 3.50 },
    { id: 10, name: "Chocolate Chip Cookie", category: "Bakery", price: 2.25 },
    { id: 11, name: "Bagel with Cream Cheese", category: "Bakery", price: 4.00 },
    { id: 12, name: "Chicken Sandwich", category: "Food", price: 7.50 },
    { id: 13, name: "Veggie Wrap", category: "Food", price: 6.75 },
    { id: 14, name: "Caesar Salad", category: "Food", price: 8.25 },
    { id: 15, name: "Cheesecake", category: "Dessert", price: 5.75 },
    { id: 16, name: "Chocolate Cake", category: "Dessert", price: 5.50 },
  ]);

  // Mock table data
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1", status: "available", capacity: 2, orders: [] },
    { id: 2, name: "Table 2", status: "occupied", customerName: "Smith Family", orders: [
      { id: 1, menuItemId: 2, name: "Cappuccino", price: 4.50, quantity: 2 },
      { id: 2, menuItemId: 8, name: "Croissant", price: 3.25, quantity: 2 },
    ]},
    { id: 3, name: "Table 3", status: "reserved", customerName: "Johnson", reservationTime: "2:30 PM", orders: [] },
    { id: 4, name: "Table 4", status: "occupied", customerName: "Martinez Group", orders: [
      { id: 3, menuItemId: 3, name: "Latte", price: 4.25, quantity: 3 },
      { id: 4, menuItemId: 12, name: "Chicken Sandwich", price: 7.50, quantity: 3 },
      { id: 5, menuItemId: 15, name: "Cheesecake", price: 5.75, quantity: 1 },
    ]},
    { id: 5, name: "Table 5", status: "available", capacity: 4, orders: [] },
    { id: 6, name: "Table 6", status: "occupied", customerName: "Garcia", orders: [
      { id: 6, menuItemId: 1, name: "Espresso", price: 3.50, quantity: 2 },
      { id: 7, menuItemId: 9, name: "Blueberry Muffin", price: 3.50, quantity: 2 },
    ]},
  ]);

  // State for active order
  const [activeTableId, setActiveTableId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [taxRate, setTaxRate] = useState(0.08); // 8% tax rate
  
  // Get active table details
  const activeTable = tables.find(t => t.id === activeTableId) || null;

  // Get unique categories for filter
  const categories = ["All", ...new Set(menuItems.map(item => item.category))];

  // Filter menu items based on category and search term
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to add item to order
  const addToOrder = (menuItem) => {
    if (!activeTableId) return;
    
    setTables(tables.map(table => {
      if (table.id !== activeTableId) return table;
      
      // Check if item already exists in order
      const existingOrderItem = table.orders.find(item => item.menuItemId === menuItem.id);
      
      if (existingOrderItem) {
        // Update quantity if item exists
        return {
          ...table,
          orders: table.orders.map(item => 
            item.menuItemId === menuItem.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      } else {
        // Add new item if it doesn't exist
        return {
          ...table,
          orders: [
            ...table.orders, 
            { 
              id: Math.random(), 
              menuItemId: menuItem.id, 
              name: menuItem.name, 
              price: menuItem.price, 
              quantity: 1 
            }
          ]
        };
      }
    }));
  };

  // Function to remove item from order
  const removeFromOrder = (orderId) => {
    if (!activeTableId) return;
    
    setTables(tables.map(table => {
      if (table.id !== activeTableId) return table;
      
      return {
        ...table,
        orders: table.orders.filter(item => item.id !== orderId)
      };
    }));
  };

  // Function to update item quantity
  const updateQuantity = (orderId, change) => {
    if (!activeTableId) return;
    
    setTables(tables.map(table => {
      if (table.id !== activeTableId) return table;
      
      return {
        ...table,
        orders: table.orders.map(item => {
          if (item.id !== orderId) return item;
          
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        })
      };
    }));
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    if (!activeTable) return 0;
    return activeTable.orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Calculate tax
  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Handle payment process
  const processPayment = () => {
    // In a real app, this would process payment through a payment gateway
    // For demo purposes, we'll just show a success message and clear the table
    setPaymentSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setPaymentSuccess(false);
      
      // Clear the table
      setTables(tables.map(table => 
        table.id === activeTableId 
          ? { ...table, status: "available", customerName: null, orders: [] }
          : table
      ));
      
      // Reset active table
      setActiveTableId(null);
    }, 3000);
  };

  // Function to print receipt
  const printReceipt = () => {
    // In a real app, this would generate and print a receipt
    // For demo purposes, we'll just show an alert
    alert("Receipt printing functionality would be implemented here");
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-white">Billing Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tables Section */}
        <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
            <Coffee className="mr-2 h-6 w-6 text-orange-400" />
            Tables
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {tables.map(table => (
              <button
                key={table.id}
                onClick={() => setActiveTableId(table.id)}
                className={`p-3 rounded-lg border ${
                  activeTableId === table.id 
                    ? 'border-orange-400 bg-gray-700' 
                    : 'border-gray-700 hover:bg-gray-700'
                } ${
                  table.status === 'available'
                    ? 'bg-green-900/20'
                    : table.status === 'occupied'
                      ? 'bg-blue-900/20'
                      : 'bg-yellow-900/20'
                } transition-all`}
              >
                <div className="font-medium text-white">{table.name}</div>
                <div className={`text-xs ${
                  table.status === 'available'
                    ? 'text-green-400'
                    : table.status === 'occupied'
                      ? 'text-blue-400'
                      : 'text-yellow-400'
                }`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </div>
                {table.customerName && (
                  <div className="text-xs text-gray-400 truncate">{table.customerName}</div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Order Section */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Menu Items */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Menu Items</h2>
            
            <div className="mb-4 space-y-3">
              <Input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-400"
              />
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      categoryFilter === category
                        ? 'bg-orange-400 text-gray-900'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMenuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addToOrder(item)}
                  disabled={!activeTableId || tables.find(t => t.id === activeTableId)?.status !== 'occupied'}
                  className="w-full p-3 border border-gray-700 rounded-lg hover:bg-gray-700 flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed bg-gray-750"
                >
                  <div className="text-left">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.category}</div>
                  </div>
                  <div className="font-semibold text-orange-400">${item.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Current Order */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            {paymentSuccess ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="p-3 bg-green-900/30 rounded-full mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white">Payment Successful!</h2>
                <p className="text-gray-400">The table has been cleared.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-white">
                  {activeTable 
                    ? `Order for ${activeTable.name}`
                    : 'Select a table to manage orders'}
                </h2>
                
                {activeTable && activeTable.status === 'occupied' && (
                  <div className="mb-4 pb-2 border-b border-gray-600">
                    <div className="font-medium text-gray-200">Customer: {activeTable.customerName}</div>
                  </div>
                )}
                
                {activeTable && activeTable.status === 'occupied' && activeTable.orders.length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                      {activeTable.orders.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                          <div>
                            <div className="font-medium text-white">{item.name}</div>
                            <div className="text-sm text-gray-400">${item.price.toFixed(2)} each</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border border-gray-600 rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 py-1 hover:bg-gray-600 text-white"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-medium text-white">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 py-1 hover:bg-gray-600 text-white"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromOrder(item.id)}
                              className="p-1 text-red-400 hover:bg-red-900/30 rounded"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2 border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                        <span>${calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg text-white">
                        <span>Total</span>
                        <span className="text-orange-400">${calculateTotal().toFixed(2)}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-600">
                        <Button 
                          className="bg-gray-600 hover:bg-gray-500 flex items-center gap-1"
                          onClick={printReceipt}
                        >
                          <Printer size={16} /> Print
                        </Button>
                        <Button 
                          className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1 text-black"
                          onClick={processPayment}
                        >
                          <CreditCard size={16} /> Pay Now
                        </Button>
                      </div>
                    </div>
                  </>
                ) : activeTable && activeTable.status === 'occupied' ? (
                  <div className="text-center py-8 text-gray-400">
                    <ShoppingBasket className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                    <p>No items in this order yet.</p>
                    <p className="text-sm">Select items from the menu to add them.</p>
                  </div>
                ) : activeTable ? (
                  <div className="text-center py-8 text-gray-400">
                    <Coffee className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                    <p>This table is not currently occupied.</p>
                    <p className="text-sm">Assign customers first from the Table Management screen.</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Coffee className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                    <p>No table selected.</p>
                    <p className="text-sm">Select a table to manage orders.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}