'use client';
import { useState } from 'react';
import Image from 'next/image';
import Auth from '../../assets/auth.gif';
import './page.css';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-component">
        <div className="auth-component-in-one">
        <Image src={Auth} alt="auth" />    
        </div>
        <div className="auth-component-in-two">
            <div className="auth-component-in-two-heading">
                <h1>{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            </div>
            <div className="auth-component-in-two-form">
                {activeTab === 'login' ? (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit">Login</button>
                        <p>
                            Don't have an account? <span onClick={() => setActiveTab('signup')}>Sign up</span>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="First name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Last name" />
                        </div>
                        <div className="form-group">  
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Create a password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                        </div>
                        <button type="submit">Create Account</button>
                        <p>
                            Already have an account? <span onClick={() => setActiveTab('login')}>Login</span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
}