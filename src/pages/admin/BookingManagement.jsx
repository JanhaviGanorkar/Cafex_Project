import { useState, useEffect } from "react";
import { CalendarDays, Clock, Check, X, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingManagement() {
  // Mock data for bookings
  const [bookings, setBookings] = useState([
    { id: 1, customerName: "John Smith", phone: "555-123-4567", date: "2023-06-15", time: "14:00", guests: 4, tableId: 6, status: "confirmed" },
    { id: 2, customerName: "Sarah Johnson", phone: "555-234-5678", date: "2023-06-15", time: "15:30", guests: 2, tableId: 3, status: "confirmed" },
    { id: 3, customerName: "Michael Brown", phone: "555-345-6789", date: "2023-06-15", time: "18:15", guests: 8, tableId: 8, status: "confirmed" },
    { id: 4, customerName: "Emily Davis", phone: "555-456-7890", date: "2023-06-16", time: "12:30", guests: 3, tableId: 5, status: "pending" },
    { id: 5, customerName: "David Wilson", phone: "555-567-8901", date: "2023-06-16", time: "19:00", guests: 4, tableId: 2, status: "confirmed" },
    { id: 6, customerName: "Lisa Garcia", phone: "555-678-9012", date: "2023-06-17", time: "13:45", guests: 6, tableId: 7, status: "pending" },
    { id: 7, customerName: "Robert Miller", phone: "555-789-0123", date: "2023-06-17", time: "17:30", guests: 2, tableId: 1, status: "cancelled" },
  ]);

  // Filter states
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState("all");

  // Function to format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to confirm booking
  const confirmBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "confirmed" } : booking
    ));
  };

  // Function to cancel booking
  const cancelBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "cancelled" } : booking
    ));
  };

  // Function to edit booking (in a real app, this would open a form)
  const editBooking = (id) => {
    alert(`Edit booking functionality would open a form to edit booking #${id}`);
  };

  // Function to create a new booking (in a real app, this would open a form)
  const createBooking = () => {
    alert("Create booking functionality would open a form to create a new booking");
  };

  // Filter bookings based on selected filters
  const filteredBookings = bookings.filter(booking => {
    const dateMatches = booking.date === dateFilter;
    const statusMatches = statusFilter === "all" || booking.status === statusFilter;
    return dateMatches && statusMatches;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Booking Management</h1>
      
      <div className="flex justify-between mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarDays className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full pl-10 p-2.5"
              placeholder="Select date"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block p-2.5"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <Button 
          className="bg-orange-400 hover:bg-orange-500 flex items-center gap-1"
          onClick={createBooking}
        >
          <Plus size={16} /> New Booking
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm">
                    <div className="font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="font-medium text-gray-900">{formatDate(booking.date)}</div>
                    <div className="text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(booking.time)}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    {booking.guests} people
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    Table {booking.tableId}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : booking.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-300 hover:bg-gray-100"
                      onClick={() => editBooking(booking.id)}
                    >
                      <Edit size={14} />
                    </Button>
                    
                    {booking.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => confirmBooking(booking.id)}
                      >
                        <Check size={14} />
                      </Button>
                    )}
                    
                    {booking.status !== 'cancelled' && (
                      <Button 
                        size="sm" 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        <X size={14} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-sm text-center text-gray-500">
                  No bookings found for the selected date and status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}