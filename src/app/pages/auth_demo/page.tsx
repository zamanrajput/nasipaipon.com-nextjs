'use client';

import { useState, useEffect } from 'react';
import authClient, { AuthUser } from '@/lib/clients/auth';

export default function AuthDemo() {
  const [currentUser, setCurrentUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('login');

  // Register form
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // --- Fetch session user on mount ---
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const user = await authClient.me();
      setCurrentUser(user);
    } catch (err) {
      console.error('Auth check failed:', err);
      setCurrentUser(null);
    }
    setLoading(false);
  };

  // --- Register handler ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegMessage('');

    const res = await authClient.register(regUsername, regPassword);

    if (res.error) {
      setRegMessage(`❌ ${res.error}`);
    } else {
      setRegMessage(`✅ ${res.message || 'Registered successfully!'}`);
      setRegUsername('');
      setRegPassword('');
      setTimeout(() => {
        setActiveTab('login');
        setRegMessage('');
      }, 1500);
    }

    setRegLoading(false);
  };

  // --- Login handler ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMessage('');

    const res = await authClient.login(loginUsername, loginPassword);

    if (res.error) {
      setLoginMessage(`❌ ${res.error}`);
    } else if (res.user) {
      setLoginMessage('✅ Login successful!');
      setCurrentUser(res.user);
      setLoginUsername('');
      setLoginPassword('');
      setTimeout(() => setLoginMessage(''), 2000);
    } else {
      setLoginMessage('⚠️ Unknown response');
    }

    setLoginLoading(false);
  };

  // --- Logout handler ---
  const handleLogout = async () => {
    await authClient.logout();
    setCurrentUser(null);
    setLoginMessage('');
    setRegMessage('');
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading session...</div>
      </div>
    );
  }

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Auth Client Demo
          </h1>
          <p className="text-gray-600">
            Test authentication with localStorage persistence
          </p>
        </div>

        {/* Current User Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Current Session
          </h2>

          {currentUser ? (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">
                  Authenticated
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentUser.username}
                </p>
                <p className="text-sm text-gray-500">
                  User ID: {currentUser.id}
                </p>
                {currentUser.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    Created:{' '}
                    {new Date(currentUser.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-500">
              Not authenticated — please login or register.
            </div>
          )}
        </div>

        {/* Auth Forms */}
        {!currentUser && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b">
              {['login', 'register'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {loginMessage && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        loginMessage.includes('❌')
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {loginMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    {loginLoading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {regMessage && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        regMessage.includes('❌')
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {regMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={regLoading}
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                  >
                    {regLoading ? 'Creating...' : 'Register'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Quick Actions
          </h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={checkAuth}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Refresh Session
            </button>
            {currentUser && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            About this demo
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Credentials stored in localStorage (client-side)</li>
            <li>• Session persists across page refresh</li>
            <li>• Logout clears all localStorage data</li>
            <li>• Simple authentication for non-critical applications</li>
          </ul>
        </div>

        {/* Developer Tools */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Developer Tools
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => {
                console.log('localStorage contents:', localStorage.getItem('auth_user'));
                alert('Check console for localStorage contents');
              }}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
            >
              View localStorage
            </button>
            <button
              onClick={() => {
                const creds = authClient.getStoredCredentials();
                console.log('Stored credentials:', creds);
                alert(creds ? `Username: ${creds.username}` : 'No credentials stored');
              }}
              className="ml-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
            >
              Get Stored Credentials
            </button>
            <button
              onClick={() => {
                const isAuth = authClient.isAuthenticated();
                alert(`Authenticated: ${isAuth}`);
              }}
              className="ml-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
            >
              Check Auth Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}