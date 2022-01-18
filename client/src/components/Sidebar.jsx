import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeHeartLine } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { categories } from '../utils/data';

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize"
const isActiveStyle = "flex text-blue-500 items-center px-5 gap-3 font-semibold border-r-2 border-blue-500 transition-all duration-200 ease-in-out capitalize"

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <p className="bg-gray-500 text-white motion-safe:animate-pulse text-center text-3xl font-rubik px-3 rounded-xl">kimito</p>
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeHeartLine />
            Home
          </NavLink>

          <div className="flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize">
            <BiCategory />
            Category
          </div>

          {categories.slice(0, categories.length ).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image} 
                className="ml-2 w-8 h-8 rounded-lg shadow-sm"
                alt={category.name} 
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Sidebar
