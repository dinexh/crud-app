export default function Home() {
  return (
    <div className="home-component">
      <div className="home-component-in">
        <div className="home-component-in-content">
          <h1 className="home-component-in-content-heading">CRUD Application Assignment</h1>
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
            <p>Built with Next.js , TypeScript , Mysql , AWS EC2</p>
            <button className="home-component-in-content-footer-button">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
