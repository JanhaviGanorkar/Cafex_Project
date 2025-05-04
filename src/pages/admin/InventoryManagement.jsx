import { useState, useEffect } from "react";
import { ShoppingBasket, Search, Plus, AlertTriangle, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InventoryManagement() {
  // Mock data for inventory items - now with expiry date for applicable items
  const [inventory, setInventory] = useState([
    { id: 1, name: "Coffee Beans (Arabica)", category: "coffee", quantity: 15, unit: "kg", threshold: 5, price: 24.99, supplier: "Bean Importers Co.", expiry_date: "2025-12-15" },
    { id: 2, name: "Coffee Beans (Robusta)", category: "coffee", quantity: 8, unit: "kg", threshold: 5, price: 18.50, supplier: "Bean Importers Co.", expiry_date: "2025-11-30" },
    { id: 3, name: "Whole Milk", category: "dairy", quantity: 20, unit: "liter", threshold: 10, price: 2.99, supplier: "Local Dairy Farm", expiry_date: "2023-06-20" },
    { id: 4, name: "Almond Milk", category: "dairy", quantity: 6, unit: "liter", threshold: 5, price: 4.50, supplier: "Plant Milks Inc.", expiry_date: "2023-07-15" },
    { id: 5, name: "Chocolate Syrup", category: "syrup", quantity: 4, unit: "bottle", threshold: 3, price: 8.75, supplier: "Sweet Supplies Ltd.", expiry_date: "2023-12-30" },
    { id: 6, name: "Caramel Syrup", category: "syrup", quantity: 3, unit: "bottle", threshold: 3, price: 8.75, supplier: "Sweet Supplies Ltd.", expiry_date: "2023-11-25" },
    { id: 7, name: "Vanilla Syrup", category: "syrup", quantity: 2, unit: "bottle", threshold: 3, price: 8.75, supplier: "Sweet Supplies Ltd.", expiry_date: "2023-10-15" },
    { id: 8, name: "Croissants", category: "bakery", quantity: 24, unit: "piece", threshold: 10, price: 1.50, supplier: "Local Bakery", expiry_date: "2023-06-16" },
    { id: 9, name: "Blueberry Muffins", category: "bakery", quantity: 12, unit: "piece", threshold: 8, price: 2.25, supplier: "Local Bakery", expiry_date: "2023-06-16" },
    { id: 10, name: "Chocolate Chip Cookies", category: "bakery", quantity: 18, unit: "piece", threshold: 10, price: 1.75, supplier: "Local Bakery", expiry_date: "2023-06-17" },
    { id: 11, name: "Disposable Cups (12oz)", category: "supplies", quantity: 250, unit: "piece", threshold: 100, price: 0.15, supplier: "Cafe Supplies Inc.", expiry_date: null },
    { id: 12, name: "Disposable Cups (16oz)", category: "supplies", quantity: 200, unit: "piece", threshold: 100, price: 0.20, supplier: "Cafe Supplies Inc.", expiry_date: null },
    { id: 13, name: "Paper Napkins", category: "supplies", quantity: 500, unit: "piece", threshold: 200, price: 0.05, supplier: "Cafe Supplies Inc.", expiry_date: null },
    { id: 14, name: "Tea (Earl Grey)", category: "tea", quantity: 5, unit: "box", threshold: 3, price: 12.99, supplier: "Tea Traders Ltd.", expiry_date: "2024-05-10" },
    { id: 15, name: "Tea (Green)", category: "tea", quantity: 6, unit: "box", threshold: 3, price: 14.50, supplier: "Tea Traders Ltd.", expiry_date: "2024-06-22" },
  ]);

  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showLowStock, setShowLowStock] = useState(false);
  const [showExpiringItems, setShowExpiringItems] = useState(false);

  // Get all unique categories for filter dropdown
  const categories = ["all", ...new Set(inventory.map(item => item.category))];

  // Function to check if item is expiring soon (within 7 days)
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  // Count expiring items
  const expiringItemsCount = inventory.filter(item => isExpiringSoon(item.expiry_date)).length;

  // Function to add new inventory item (would open a form in a real app)
  const addInventoryItem = () => {
    alert("This would open a form to add a new inventory item with expiry date");
  };

  // Function to edit inventory item (would open a form in a real app)
  const editInventoryItem = (id) => {
    alert(`This would open a form to edit inventory item #${id}`);
  };

  // Function to delete inventory item
  const deleteInventoryItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  // Function to update quantity
  const updateQuantity = (id, amount) => {
    setInventory(inventory.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + amount) } 
        : item
    ));
  };

  // Format expiry date for display
  const formatExpiryDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter inventory based on search term, category, stock level, and expiry
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStockLevel = !showLowStock || item.quantity <= item.threshold;
    const matchesExpiry = !showExpiringItems || isExpiringSoon(item.expiry_date);
    
    return matchesSearch && matchesCategory && matchesStockLevel && matchesExpiry;
  });

  // Count low stock items
  const lowStockCount = inventory.filter(item => item.quantity <= item.threshold).length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Inventory Management</h1>
      
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block p-2.5"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          {/* Low Stock Filter */}
          <div className="flex items-center">
            <input
              id="low-stock-checkbox"
              type="checkbox"
              checked={showLowStock}
              onChange={() => setShowLowStock(!showLowStock)}
              className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-orange-400"
            />
            <label htmlFor="low-stock-checkbox" className="ms-2 text-sm font-medium text-gray-900 flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" /> 
              Low Stock ({lowStockCount})
            </label>
          </div>
          
          {/* Expiring Items Filter */}
          <div className="flex items-center">
            <input
              id="expiring-items-checkbox"
              type="checkbox"
              checked={showExpiringItems}
              onChange={() => setShowExpiringItems(!showExpiringItems)}
              className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded focus:ring-orange-400"
            />
            <label htmlFor="expiring-items-checkbox" className="ms-2 text-sm font-medium text-gray-900 flex items-center">
              <Calendar className="w-4 h-4 text-red-500 mr-1" /> 
              Expiring Soon ({expiringItemsCount})
            </label>
          </div>
        </div>
        
        <Button 
          className="bg-orange-400 hover:bg-orange-500 flex items-center gap-1"
          onClick={addInventoryItem}
        >
          <Plus size={16} /> Add Item
        </Button>
      </div>
      
      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.length > 0 ? (
              filteredInventory.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span 
                        className={`text-sm font-medium ${
                          item.quantity <= item.threshold 
                            ? 'text-red-600' 
                            : 'text-gray-900'
                        }`}
                      >
                        {item.quantity} {item.unit}
                        {item.quantity <= item.threshold && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            Low
                          </span>
                        )}
                      </span>
                      <div className="ml-4 flex items-center space-x-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    ${item.price.toFixed(2)} / {item.unit}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{item.supplier}</td>
                  <td className="py-4 px-6 text-sm">
                    {item.expiry_date && isExpiringSoon(item.expiry_date) ? (
                      <span className="inline-flex items-center text-red-600">
                        {formatExpiryDate(item.expiry_date)}
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <span className="text-gray-500">{formatExpiryDate(item.expiry_date)}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => editInventoryItem(item.id)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteInventoryItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-sm text-center text-gray-500">
                  No inventory items found with the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}