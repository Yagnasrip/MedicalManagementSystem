import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Heart, 
  Phone, 
  Video,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  LogOut
} from 'lucide-react';
import { User as UserType } from '../App';

interface PatientDashboardProps {
  user: UserType;
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'records' | 'donors'>('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      date: '2025-01-20',
      time: '10:00 AM',
      type: 'video',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'General Medicine',
      date: '2025-01-25',
      time: '2:30 PM',
      type: 'in-person',
      status: 'pending'
    }
  ];

  const recentRecords = [
    {
      id: 1,
      type: 'Lab Results',
      date: '2025-01-15',
      doctor: 'Dr. Sarah Wilson',
      status: 'normal'
    },
    {
      id: 2,
      type: 'Prescription',
      date: '2025-01-10',
      doctor: 'Dr. Michael Chen',
      status: 'active'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="text-blue-100">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Records</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <FileText className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Health Score</p>
              <p className="text-2xl font-bold text-gray-900">85</p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Visit</p>
              <p className="text-2xl font-bold text-gray-900">5d</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Book New</span>
          </button>
        </div>
        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {appointment.type === 'video' ? (
                    <Video className="w-6 h-6 text-blue-600" />
                  ) : (
                    <User className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{appointment.date}</p>
                <p className="text-sm text-gray-600">{appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical Records</h3>
        <div className="space-y-3">
          {recentRecords.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <FileText className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="font-medium text-gray-900">{record.type}</p>
                  <p className="text-sm text-gray-600">{record.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{record.date}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  record.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Book Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                    <p className="text-gray-600">{appointment.specialty}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-medium">{appointment.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium capitalize">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                {appointment.type === 'video' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Video className="w-4 h-4" />
                    <span>Join Call</span>
                  </button>
                )}
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Reschedule
                </button>
                <button className="border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingModal = () => (
    showBookingModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Book New Appointment</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Doctor
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Dr. Sarah Wilson - Cardiology</option>
                <option>Dr. Michael Chen - General Medicine</option>
                <option>Dr. Emily Davis - Dermatology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Video Consultation</option>
                <option>In-Person Visit</option>
                <option>Phone Call</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Patient Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: User },
              { id: 'appointments', name: 'Appointments', icon: Calendar },
              { id: 'records', name: 'Medical Records', icon: FileText },
              { id: 'donors', name: 'Donor Network', icon: Heart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'records' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Medical Records</h3>
            <p className="text-gray-600">Your medical records and test results will appear here.</p>
          </div>
        )}
        {activeTab === 'donors' && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Donor Network</h3>
            <p className="text-gray-600">Connect with blood and organ donors in your area.</p>
          </div>
        )}
      </main>

      <BookingModal />
    </div>
  );
};

export default PatientDashboard;