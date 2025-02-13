"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-component">
      <div className="home-component-in">
        <div className="home-component-in-content">
          <div className="home-component-in-content-heading">
            <h1>CRUD Application Assignment</h1>
          </div>
          <div className="home-component-in-content-description">
            <p>Welcome to my CRUD Application Assignment!</p>
            <p>This project demonstrates:</p>
            <ul>
              <li>Create - Add new records</li>
              <li>Read - View existing records</li>
              <li>Update - Modify existing records</li>
              <li>Delete - Remove records</li>
            </ul>
          </div>
          <div className="home-component-in-content-footer">
            <div className="home-component-in-content-footer-text">
              <p>Built with Next.js , TypeScript , Mysql , AWS EC2</p>
            </div>
            <div className="home-component-in-content-footer-buttons">
              <button>
                View Documentation
              </button>
              <button onClick={() => router.push('/auth/login')}>
                Get Started / login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
