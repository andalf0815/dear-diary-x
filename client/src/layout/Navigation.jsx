import { Link, Outlet } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <nav className='flex justify-between h-12 px-5 bg-slate-500'>
        <h1 className='flex items-center'>Dear Diary</h1>
        <Link to='/logout' className='flex items-center'>Logout</Link>
      </nav>
      <main className='p-5 flex flex-col items-center'>
        <Outlet />
      </main>
    </>
  );
}

export default Navigation;
