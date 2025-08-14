import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increase, decrease, remove } from "../app/slice/cardSlice";

function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [activeId, setActiveId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const getAmount = (id) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.amount : 0;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-5">Desserts</h1>
      <div className="flex  lg:flex-row gap-10 flex-col">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl gap-7">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <p className="text-lg text-gray-500">Loading...</p>
            </div>
          ) : (
            products.map((item) => {
              const amount = getAmount(item.id);
              return (
                <div key={item.id} className="shadow-sm relative">
                  <div
                    className={`rounded-md overflow-hidden w-full h-64 ${
                      activeId === item.id
                        ? "border-3 border-[#C73B0F]"
                        : "border-[#c73b0f]"
                    }`}
                  >
                    <img
                      src={item.image?.desktop}
                      alt={item.name}
                      className="activeImg object-cover hover:scale-103 transition-all h-full w-full"
                    />
                  </div>

                  <div className="flex justify-center">
                    {amount === 0 ? (
                      <button
                        onClick={() => {
                          setActiveId(item.id);
                          dispatch(addToCart(item));
                        }}
                        className="absolute flex gap-2 justify-between bottom-3/9 items-center px-4 sm:px-8 py-2 rounded-full border bg-white"
                      >
                        <img src="../images/icon-add-to-cart.svg" alt="" />
                        <span className="text-[#260F08] font-semibold text-sm sm:text-base">
                          Add to Cart
                        </span>
                      </button>
                    ) : (
                      <div className="absolute border-[#AD8A85] border right-15 left-15 bottom-3/9 flex items-center justify-around bg-[#C73B0F] py-2 rounded-full">
                        <button
                          onClick={() => dispatch(decrease(item.id))}
                          className="px-2 font-bold border rounded-full bg-transparent text-white border-white"
                        >
                          -
                        </button>
                        <span className="text-white">{amount}</span>
                        <button
                          onClick={() => dispatch(increase(item.id))}
                          className="px-2 font-bold border rounded-full bg-transparent text-white border-white"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="px-2 pt-12 pb-10">
                    <h4 className="text-sm text-gray-500">{item.category}</h4>
                    <h2 className="font-semibold text-[#260F08]">
                      {item.name}
                    </h2>
                    <h4 className="font-[850] text-xl text-[#C73B0F]">
                      ${item.price}
                    </h4>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* right panel */}
        <div className="w-full lg:w-80 bg-white p-5 rounded-xl flex flex-col gap-4 shadow-lg overflow-scroll h-100">
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
              <p className="text-[#87635A] text-center text-sm sm:text-base">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border-b pb-2 gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image?.thumbnail}
                      className="rounded-md"
                      width={80}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold sm:text-[14px]">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-5" key={item.id}>
                        <span className="text-[#C73B0F] font-semibold">
                          {cart.reduce((sum, i) => sum + i.amount, 0)}X
                        </span>
                        <span className="text-gray-500">${item.price}</span>
                        <span className="text-gray-500">
                          $
                          {item.price *
                            cart.reduce((sum, i) => sum + i.amount, 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-between border p-2 rounded-md border-[#C73B0F]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => dispatch(decrease(item.id))}
                        className="px-2 font-bold border rounded-full"
                      >
                        &#8722;
                      </button>
                      <span>{item.amount}</span>
                      <button
                        onClick={() => dispatch(increase(item.id))}
                        className="px-2 font-bold border rounded-full"
                      >
                        &#43;
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(remove(item.id))}
                      className="px-2 py-0.5 text-[#C73B0F] font-bold border rounded-full border-[#C73B0F]"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          <div>
            efef
          </div>
      </div>
    </div>
  );
}

export default Home;
