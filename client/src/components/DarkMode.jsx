import React from 'react';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

const DarkMode = ({ darkTheme, setDarkTheme }) => {
  return (
    <button onClick={() => setDarkTheme(!darkTheme)} className="absolute cursor-pointer bg-gray-200 dark:bg-slate-500 dark:bg-gradient-to-r dark:from-purple-600 dark:md:from-yellow-500 bottom-5 right-5 w-10 h-10 rounded-full flex justify-center items-center z-20">
      {darkTheme ? (
        <MdOutlineNightlight className='text-orange-200'/>
      ): (
        <MdOutlineLightMode className="text-orange-500" />
      )}
    </button>
  )
};

export default DarkMode;
