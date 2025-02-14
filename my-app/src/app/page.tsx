"use client";

import { useRouter } from 'next/navigation';
import { FiGithub, FiArrowRight, FiUserPlus, FiDatabase, FiSearch, FiEdit2, FiTrash2, FiPlay, FiCode, FiBox, FiExternalLink } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-component">
      <div className="home-component-in">
          <div className="home-component-in-heading">
            <h1>CRUD Application Assignment</h1>  
            <p>Build with Next.js, TypeScript, MySQL, & AWS</p>
        </div>
        <div className="home-component-in-content">
          <div className="home-component-in-content-heading">
            <h1>Its Main Features</h1>
            <div className="home-component-in-content-heading-features">
              <div className="home-component-in-content-heading-features-item">
                <FiUserPlus />
                <h3>Added JWT Authentication</h3>
              </div>
              <div className="home-component-in-content-heading-features-item">
                <FiPlay />
                <h3>Create tasks</h3>
              </div>
              <div className="home-component-in-content-heading-features-item">
                <FiEdit2 />
                <h3>Edit tasks</h3>
              </div>
              <div className="home-component-in-content-heading-features-item">
                <FiTrash2 />
                <h3>Delete tasks</h3>
              </div>
              <div className="home-component-in-content-heading-features-item">
                <FiSearch />
                <h3>View tasks</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="home-component-footer">
          <p>Designed and Developed by <a href="https://dineshkorukonda.in" target="_blank" rel="noopener noreferrer">Dinesh Korukonda</a></p>
          <p>Github <a href="https://github.com/dineshkorukonda/crud-app" target="_blank" rel="noopener noreferrer">View My Github</a></p>
        </div>
    </div>
    </div>
  );
}
