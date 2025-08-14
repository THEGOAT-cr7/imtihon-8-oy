import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increase, decrease, remove } from "../app/slice/cardSlice";

function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts/")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => setProducts([]));
  }, []);

  const getAmount = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.amount : 0;
  };

  return (
    <div className="container mx-auto flex gap-10">
      <div className="flex-1 grid grid-cols-3 gap-7">
        {products.map((item) => {
          const amount = getAmount(item.id);
          return (
            <div key={item.id} className="shadow-sm relative">
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
                    onClick={() => dispatch(addToCart(item))}
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
                    <button
                      onClick={() => dispatch(remove(item.id))}
                      className="ml-2 text-red-500 font-bold"
                    >
                      x
                    </button>
                  </div>
                )}
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

      <div className="w-80 bg-white p-5 rounded-xl flex flex-col gap-4 shadow-lg">
        <h2 className="text-2xl font-semibold text-[#C73B0F]">
          Your Cart ({cart.reduce((sum, i) => sum + i.amount, 0)})
        </h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <img
              src="../images/illustration-empty-cart.svg"
              alt="Empty Cart"
              className="w-40 h-40 object-contain"
            />
            <p className="text-[#87635A] text-center">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-500">${item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrease(item.id))}
                    className="px-2 font-bold border rounded"
                  >
                    &#8722;
                  </button>
                  <span>{item.amount}</span>
                  <button
                    onClick={() => dispatch(increase(item.id))}
                    className="px-2 font-bold border rounded"
                  >
                    &#43;
                  </button>
                  <button
                    onClick={() => dispatch(remove(item.id))}
                    className="ml-2 text-red-500 font-bold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
