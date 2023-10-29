import { Outlet } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <nav>
        <h1>Dear Diary</h1>
        <button>Logout</button>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
