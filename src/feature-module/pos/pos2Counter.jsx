import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MinusCircle, PlusCircle } from "feather-icons-react/build/IconComponents";
import { useUpdateCartQuantityMutation } from "../../core/redux/api/cartApi";
import { useDebounce } from "use-debounce";
const Pos2Counter = ({productId, initialQuantity = 1}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [updateCartQuantity] = useUpdateCartQuantityMutation();
 
const [debouncedQuantity] = useDebounce(quantity, 500);
useEffect(() => {
  if (productId && debouncedQuantity !== initialQuantity) {
    updateCartQuantity({ productId, quantity: debouncedQuantity })
      .unwrap()
      .catch(error => {
        console.error("Failed to update cart quantity:", error);
        // Revert to previous quantity if update fails
        setQuantity(initialQuantity);
      });
  }
}, [debouncedQuantity, productId, initialQuantity, updateCartQuantity]);

  
const handleIncrement = () => {
  if (quantity < 50) { // Increased max limit to 50
    setQuantity(prev => prev + 1);
  }
};

const handleDecrement = () => {
  if (quantity > 0) {
    setQuantity(prev => prev - 1);
  }
};

const handleChange = (e) => {
  const value = e.target.value;
  
  if (value === "") {
    setQuantity(0);
  } else {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 50) {
      setQuantity(numericValue);
    }
  }
};

  return (
    <>
  <div
      className="product-quantity"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "1rem 4rem",
        borderRadius: "5%",
        backgroundColor: "#FFF",
      }}
    >
      <button
        className="quantity-btn"
        onClick={handleDecrement}
        disabled={quantity <= 0}
        style={{
          border: "none",
          backgroundColor: "#ffffff",
          padding: "0.3rem 0.6rem",
          borderRadius: "50%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          opacity: quantity <= 0 ? 0.5 : 1,
        }}
      >
        <MinusCircle size={20} color={quantity <= 0 ? "gray" : "green"} />
      </button>

      <input
        type="number"
        min="0"
        max="50"
        className="quantity-input"
        value={quantity}
        onChange={handleChange}
        style={{
          width: "50px",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "0.3rem",
          backgroundColor: "transparent",
          fontSize: "16px",
        }}
      />

      <button
        className="quantity-btn"
        onClick={handleIncrement}
        disabled={quantity >= 50}
        style={{
          border: "none",
          padding: "0.3rem 0.6rem",
          borderRadius: "50%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          opacity: quantity >= 50 ? 0.5 : 1,
        }}
      >
        <PlusCircle size={20} color={quantity >= 50 ? "gray" : "green"} />
      </button>
    </div>
    {/* <Tooltip title='minus'>
      <Link
        to="#"
        className="dec d-flex justify-content-center align-items-center"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="minus"
        onClick={handleDecrement}
      >
        <MinusCircle className="feather-16"/>
      </Link>
      </Tooltip>
      <input
        type="text"
        className="form-control text-center"
        name="qty"
        value={quantity.toString()} // Convert number to string for input
        onChange={handleChange} // Allow manual edits
      />
      <Tooltip title='plus'>
      <Link
        to="#"
        className="inc d-flex justify-content-center align-items-center"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="plus"
        onClick={handleIncrement}
      >
        <PlusCircle className="feather-16"/>
      </Link>
      </Tooltip> */}
      
    </>
  );
};

Pos2Counter.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  initialQuantity: PropTypes.number,
};
export default Pos2Counter;
