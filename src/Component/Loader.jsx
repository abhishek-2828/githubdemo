import React from "react";
import '../Style/Loader.css'
import { RotatingLines } from 'react-loader-spinner';


const Loader = () => {
    return (
        <div className="loaderContainer">
            <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="#0000FF"
            strokeWidth="5"
            animationDuration="1"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass="loader"
            speedMultiplier={4}
            />

        </div>
    )
}

export default Loader;