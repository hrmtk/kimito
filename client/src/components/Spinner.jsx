import React from 'react';
import {BallTriangle} from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
       
      hi
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Spinner;