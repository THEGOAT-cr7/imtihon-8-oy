import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increase,
  decrease,
  calculateTotal,
} from "../app/slice/cardSlice";

function Home() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts/")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => setProducts([]));
  }, []);

  // Update totals & localStorage when cart changes
  useEffect(() => {
    dispatch(calculateTotal());
    localStorage.setItem("cart", JSON.stringify({ cart }));
  }, [cart, dispatch]);

  // Helper to get amount of a product in cart
  const getAmount = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.amount : 0;
  };

  // Handle add product
  const handleAdd = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className="container mx-auto">
      <div className="text-3xl font-bold mb-5">
        <h1>Desserts</h1>
      </div>

      <div className="grid grid-cols-3 gap-7">
        {products.map((item) => {
          const amount = getAmount(item.id);

          return (
            <div key={item.id} className="shadow-sm">
              <div className="relative">
                <div className="rounded-md overflow-hidden w-full h-64">
                  <img
                    src={item.image?.desktop}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex justify-center">
                  {amount === 0 ? (
                    <button
                      onClick={() => handleAdd(item)}
                      className="absolute flex gap-2 justify-between -bottom-5 bg-white px-8 py-2 rounded-full border"
                    >
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="absolute -bottom-5 flex items-center gap-3 bg-white px-4 py-2 rounded-full border">
                      <button
                        onClick={() => dispatch(decrease(item.id))}
                        className="px-2 font-bold"
                      >
                        -
                      </button>
                      <span>{amount}</span>
                      <button
                        onClick={() => dispatch(increase(item.id))}
                        className="px-2 font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-2 pt-9 pb-10">
                <h4 className="text-sm text-gray-500">{item.category}</h4>
                <h2 className="font-semibold text-[#C73B0F]">{item.name}</h2>
                <h4 className="font-semibold text-red-600">${item.price}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
