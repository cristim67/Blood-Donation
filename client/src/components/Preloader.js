import React, { useContext } from "react";
import { PreloaderContext } from "./PreloaderProvider";

const Preloader = () => {
  const { isLoading } = useContext(PreloaderContext);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="preloader-container">
      <div class="loader">
        <div class="loader-wheel"></div>
        <div class="loader-text"></div>
      </div>
    </div>
  );
};

export default Preloader;
