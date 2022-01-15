import React from 'react';
import {BallTriangle} from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <BallTriangle color="#00BFFF" height={80} width={80} className="m-5" />
    </div>
  );
}

export default Spinner;