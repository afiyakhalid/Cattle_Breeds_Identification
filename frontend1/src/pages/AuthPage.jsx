import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './AuthPage.css'; 

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // --- FORCE CLEAR OLD DATA ON LOAD ---
  useEffect(() => {
    localStorage.removeItem('moovview_user'); // Wipe active session
    // We do NOT wipe 'moovview_users_db' so valid accounts stay saved
  }, []);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Farmer');
  const [signupRegion, setSignupRegion] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });

  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
  };

  const handleAuthSuccess = (user) => {
    const sessionUser = {
      name: user.name,
      email: user.email,
      role: user.role,
      region: user.region,
      joined: user.joined,
    };
    
    // Save FRESH session
    localStorage.setItem('moovview_user', JSON.stringify(sessionUser));
    
    // Force reload to dashboard to ensure no old state remains
    window.location.href = '/dashboard';
  };

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
      style={{ 
        backgroundImage: "url('/breeds/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        
        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup} className="auth-form bg-[#FFFBEB]">
            <h1 className="font-['Fredoka'] text-3xl text-[#292524] mb-4">Create Account</h1>
            
            <input type="text" placeholder="Full Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
            <input type="email" placeholder="Email Address" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
            
            <div className="role-selector-container">
              <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-2">I am a...</label>
              <div className="role-selector">
                <button type="button" onClick={() => setSignupRole("Farmer")} className={`role-button ${signupRole === "Farmer" ? "active" : ""}`}>FARMER</button>
                <button type="button" onClick={() => setSignupRole("Researcher")} className={`role-button ${signupRole === "Researcher" ? "active" : ""}`}>RESEARCHER</button>
              </div>
            </div>
            
            <input type="text" placeholder={signupRole === "Farmer" ? "Farm Location" : "Research Area"} value={signupRegion} onChange={(e) => setSignupRegion(e.target.value)} required />

            <button className="auth-btn mt-4">Sign Up</button>
            {message.type === 'error' && isSignUp && <p className="text-red-500 text-sm mt-2">{message.content}</p>}
          </form>
        </div>

        {/* SIGN IN */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} className="auth-form bg-[#FFFBEB]">
            <h1 className="font-['Fredoka'] text-3xl text-[#292524] mb-4">Sign In</h1>
            
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            
            <button className="auth-btn mt-4">Sign In</button>
            {message.type === 'error' && !isSignUp && <p className="text-red-500 text-sm mt-2">{message.content}</p>}
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left bg-gradient-to-r from-[#D97706] to-[#B45309]">
              <h1 className="font-['Fredoka'] text-4xl text-[#FEF3C7] mb-4">Welcome Back!</h1>
              <p className="text-[#FEF3C7] text-lg mb-8">Login to access your farm data</p>
              <button className="auth-btn ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right bg-gradient-to-r from-[#D97706] to-[#B45309]">
              <h1 className="font-['Fredoka'] text-4xl text-[#FEF3C7] mb-4">New Here?</h1>
              <p className="text-[#FEF3C7] text-lg mb-8">Join MoovView to start tracking</p>
              <button className="auth-btn ghost" id="signUp" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;