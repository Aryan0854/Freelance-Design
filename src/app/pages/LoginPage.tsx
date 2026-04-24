import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, RefreshCw } from 'lucide-react';
import cropsapImage from '../../imports/CROPSAP_(Crop_Pest_Surveillance_and_Advisory_Project).jpg';
import doaImage from '../../imports/DOA.gif';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode] = useState('A5B7C9');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (username && password && captcha === captchaCode) {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Top Images Section - Scrollable */}
      <div className="py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Image - DOA */}
          <div className="flex items-center">
            <img
              src={doaImage}
              alt="Department of Agriculture"
              className="h-24 w-auto"
            />
          </div>

          {/* Right Image - CROPSAP */}
          <div className="flex items-center">
            <img
              src={cropsapImage}
              alt="CROPSAP - Crop Pest Surveillance and Advisory Project"
              className="h-24 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Login Content - Centered */}
      <div className="flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CROPSAP 2.0</h1>
            <p className="text-gray-600">Agriculture Platform</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Captcha */}
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
                  Captcha
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="captcha"
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      placeholder="Enter captcha"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
                    <span className="text-lg font-mono font-bold text-gray-700 tracking-wider select-none">
                      {captchaCode}
                    </span>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      title="Refresh captcha"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 active:scale-[0.98]"
              >
                Login
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Government Agriculture Platform © 2026
          </p>
        </div>
      </div>
    </div>
  );
}