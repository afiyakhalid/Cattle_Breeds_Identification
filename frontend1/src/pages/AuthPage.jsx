import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './AuthPage.css'; 

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // --- Signup Form State ---
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Farmer');
  const [signupRegion, setSignupRegion] = useState('');

  // --- Login Form State ---
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // --- Error/Success Messages ---
  const [message, setMessage] = useState({ type: '', content: '' });

  // Helper function to hash passwords
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
  };

  // Helper function to handle login/signup success
  const handleAuthSuccess = (user) => {
    const sessionUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      region: user.region,
      joined: user.joined,
    };
    localStorage.setItem('moovview_user', JSON.stringify(sessionUser));
    navigate('/dashboard');
  };

  // --- Handle Signup ---
  const handleSignup = (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    const existingUsersStr = localStorage.getItem('moovview_users_db');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

    if (existingUsers.some((user) => user.email === signupEmail)) {
      setMessage({ type: 'error', content: 'Email already exists. Please login.' });
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail,
      passwordHash: hashPassword(signupPassword),
      role: signupRole,
      region: signupRegion,
      joined: new Date().toLocaleDateString(),
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('moovview_users_db', JSON.stringify(updatedUsers));
    handleAuthSuccess(newUser);
  };

  // --- Handle Login ---
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    const existingUsersStr = localStorage.getItem('moovview_users_db');
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

    const user = existingUsers.find((u) => u.email === loginEmail);

    if (user && user.passwordHash === hashPassword(loginPassword)) {
      handleAuthSuccess(user);
    } else {
      setMessage({ type: 'error', content: 'Invalid email or password.' });
    }
  };

  return (
    <div 
      className="auth-body font-['DM_Sans']"
      // 👇 THIS FIXES YOUR IMAGE ERROR
      style={{ 
        backgroundImage: "url('/breeds/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        
        {/* --- SIGN UP FORM --- */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup} className="auth-form bg-[#FFFBEB]">
            <h1 className="font-['Fredoka'] text-3xl text-[#292524] mb-4">Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="text-[#A8A29E] text-sm mb-4">or use your email for registration</span>
            
            <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
            <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            
            {/* Role Selection */}
            <div className="role-selector-container">
              <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-2">I am a...</label>
              <div className="role-selector">
                <button
                  type="button"
                  onClick={() => setSignupRole("Farmer")}
                  className={`role-button ${signupRole === "Farmer" ? "active" : ""}`}
                >
                  FARMER
                </button>
                <button
                  type="button"
                  onClick={() => setSignupRole("Researcher")}
                  className={`role-button ${signupRole === "Researcher" ? "active" : ""}`}
                >
                  RESEARCHER
                </button>
              </div>
            </div>
            
            <input type="text" placeholder={signupRole === "Farmer" ? "Farm Location" : "Research Area"} value={signupRegion} onChange={(e) => setSignupRegion(e.target.value)} required />

            <button className="auth-btn mt-4">Sign Up</button>
            {message.type === 'error' && isSignUp && <p className="text-red-500 text-sm mt-2">{message.content}</p>}
          </form>
        </div>

        {/* --- SIGN IN FORM --- */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} className="auth-form bg-[#FFFBEB]">
            <h1 className="font-['Fredoka'] text-3xl text-[#292524] mb-4">Sign in to MoovView</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span className="text-[#A8A29E] text-sm mb-4">or use your email account</span>
            
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button className="auth-btn">Sign In</button>
            {message.type === 'error' && !isSignUp && <p className="text-red-500 text-sm mt-2">{message.content}</p>}
          </form>
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Overlay Left (Shown when in Sign Up mode) */}
            <div className="overlay-panel overlay-left bg-gradient-to-r from-[#D97706] to-[#B45309]">
              <h1 className="font-['Fredoka'] text-4xl text-[#FEF3C7] mb-4">Welcome Back!</h1>
              <p className="text-[#FEF3C7] text-lg mb-8">To keep connected with us please login with your personal info</p>
              <button className="auth-btn ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            
            {/* Overlay Right (Shown when in Sign In mode) */}
            <div className="overlay-panel overlay-right bg-gradient-to-r from-[#D97706] to-[#B45309]">
              <h1 className="font-['Fredoka'] text-4xl text-[#FEF3C7] mb-4">Hello, Friend!</h1>
              <p className="text-[#FEF3C7] text-lg mb-8">Enter your personal details and start your journey with us</p>
              <button className="auth-btn ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;