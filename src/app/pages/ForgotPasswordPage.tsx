import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, ArrowLeft, CheckCircle2 } from 'lucide-react';
import cropsapImage from '../../imports/CROPSAP_(Crop_Pest_Surveillance_and_Advisory_Project).jpg';
import doaImage from '../../imports/DOA.gif';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBackToLogin = () => {
    navigate('/');
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

      {/* Reset Password Content - Centered */}
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

          {/* Reset Password Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 active:scale-[0.98]"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
              </div>
            )}

            <button
              onClick={handleBackToLogin}
              className="w-full flex items-center justify-center gap-2 text-green-600 hover:text-green-700 py-3 rounded-lg font-medium transition-colors mt-4 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}