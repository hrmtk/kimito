import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
 
const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if(!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="relative flex justify-start items-center w-full px-3 rounded-md border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1 absolute right-6 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" />
        <input 
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-full py-2 pl-5 ring-1 ring-slate-200 shadow-sm"
        />
      </div>
      <div className="flex gap-1">
        <Link to='create-pin' className="rounded-lg -ml-3 w-11 h-11 md:w-10 md:h-10 flex justify-center items-center">
          <IoMdAdd fontSize={21} />
        </Link>
        <Link to={`user-profile/${user?._id}`} className="hidden md:flex justify-center items-center">
          <img src={user.image} alt="user" className="w-11 md:w-10 rounded-full" />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
