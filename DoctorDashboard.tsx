import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock,
  Video,
  Phone,
  User,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  LogOut,
  Stethoscope
} from 'lucide-react';
import { User as UserType } from '../App';

interface DoctorDashboardProps {
  user: UserType;
  onLogout: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'records'>('overview');

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Doe',
      time: '9:00 AM',
      type: 'video',
      reason: 'Follow-up consultation',
      status: 'upcoming'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      time: '10:30 AM',
      type: 'in-person',
      reason: 'Annual checkup',
      status: 'in-progress'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      time: '2:00 PM',
      type: 'video',
      reason: 'Prescription review',
      status: 'completed'
    }
  ];

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 34,
      lastVisit: '2025-01-15',
      condition: 'Hypertension',
      status: 'stable'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 42,
      lastVisit: '2025-01-18',
      condition: 'Diabetes Type 2',
      status: 'monitoring'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 28,
      lastVisit: '2025-01-10',
      condition: 'Anxiety',
      status: 'improving'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Good morning, {user.name}!</h2>
        <p className="text-teal-100">You have 8 appointments scheduled for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.9</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  {appointment.type === 'video' ? (
                    <Video className="w-6 h-6 text-teal-600" />
                  ) : (
                    <User className="w-6 h-6 text-teal-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Patient Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patient Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New lab results uploaded</p>
              <p className="text-xs text-gray-600">John Doe - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Prescription refill requested</p>
              <p className="text-xs text-gray-600">Sarah Johnson - 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Appointment rescheduled</p>
              <p className="text-xs text-gray-600">Michael Brown - 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex items-center space-x-3">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            View Calendar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.patient}</h3>
                    <p className="text-gray-600">{appointment.reason}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-medium">{appointment.time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium capitalize">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {appointment.status === 'upcoming' && (
                  <>
                    {appointment.type === 'video' && (
                      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                        <Video className="w-4 h-4" />
                        <span>Start Call</span>
                      </button>
                    )}
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Patient
                    </button>
                  </>
                )}
                {appointment.status === 'completed' && (
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    View Notes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Patient Records</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-gray-600">Age: {patient.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                    patient.status === 'monitoring' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-gray-600">Last Visit</p>
                  <p className="font-medium">{patient.lastVisit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Primary Condition</p>
                  <p className="font-medium">{patient.condition}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  View Records
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Schedule Appointment
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Doctor Dashboard</h1>
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
              { id: 'patients', name: 'Patients', icon: Users },
              { id: 'records', name: 'Records', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
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
        {activeTab === 'patients' && renderPatients()}
        {activeTab === 'records' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Medical Records</h3>
            <p className="text-gray-600">Patient medical records and documentation will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;