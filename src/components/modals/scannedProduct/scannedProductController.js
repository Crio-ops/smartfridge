import { useState } from "react";

const useScannedProductController = () => {
  const [isSlicedProduct, setIsSlicedProduct] = useState(false);

  return {
    isSlicedProduct,
    setIsSlicedProduct,
  };
};

export default useScannedProductController;
