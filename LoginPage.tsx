import React, { useState } from 'react';
import { ArrowLeft, User, Stethoscope, Shield, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../App';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials for different roles
  const demoCredentials = {
    patient: { email: 'patient@demo.com', password: 'demo123' },
    doctor: { email: 'doctor@demo.com', password: 'demo123' },
    admin: { email: 'admin@demo.com', password: 'demo123' }
  };

  const roles = [
    {
      id: 'patient' as const,
      name: 'Patient',
      description: 'Book appointments and manage your health',
      icon: User,
      color: 'blue'
    },
    {
      id: 'doctor' as const,
      name: 'Doctor',
      description: 'Manage patients and provide care',
      icon: Stethoscope,
      color: 'teal'
    },
    {
      id: 'admin' as const,
      name: 'Admin',
      description: 'System administration and oversight',
      icon: Shield,
      color: 'purple'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, we'll accept the demo credentials or any email/password combination
    const user: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: selectedRole === 'patient' ? 'John Doe' : 
            selectedRole === 'doctor' ? 'Dr. Sarah Wilson' : 
            'Admin User',
      email: email,
      role: selectedRole,
      avatar: `https://images.unsplash.com/photo-${selectedRole === 'patient' ? '1472099645785-5658abf4ff4e' : 
                selectedRole === 'doctor' ? '1559839734-2b71ea197ec2' : 
                '1507003211169-0a1dd7bf874e'}?w=150&h=150&fit=crop&crop=face`
    };

    setIsLoading(false);
    onLogin(user);
  };

  const fillDemoCredentials = () => {
    const creds = demoCredentials[selectedRole];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your healthcare dashboard</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? `border-${role.color}-600 bg-${role.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <role.icon className={`w-6 h-6 mx-auto mb-1 ${
                    selectedRole === role.id ? `text-${role.color}-600` : 'text-gray-400'
                  }`} />
                  <div className={`text-xs font-medium ${
                    selectedRole === role.id ? `text-${role.color}-600` : 'text-gray-600'
                  }`}>
                    {role.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={fillDemoCredentials}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Use Demo Credentials
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Patient: patient@demo.com / demo123</div>
              <div>Doctor: doctor@demo.com / demo123</div>
              <div>Admin: admin@demo.com / demo123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;