import React from "react";

function SecondPart() {
  const cart = [];
  const totalPrice = 0;

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col gap-10 max-w-md mx-auto">
      {/* Cart Header */}
      <h1 className="text-[#C73B0F] text-3xl font-semibold">
        Your Cart ({cart.length})
      </h1>

      {/* Empty Cart Illustration */}
      <div className="flex flex-col items-center justify-center gap-6 mt-10">
        <img
          src="../images/illustration-empty-cart.svg"
          alt="Empty Cart"
          className="w-48 h-48 object-contain"
        />
        <p className="text-[#87635A] text-center">
          Your added items will appear here
        </p>
      </div>

      {/* Optional: Total Price or Checkout Button */}
      {cart.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <span className="font-semibold text-lg">Total:</span>
          <span className="font-bold text-[#C73B0F] text-lg">${totalPrice}</span>
        </div>
      )}
    </div>
  );
}

export default SecondPart;
