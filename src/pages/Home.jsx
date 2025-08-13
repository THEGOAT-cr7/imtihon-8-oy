import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts/")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => setProducts([]));
  }, []);

  const getAmount = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.amount : 0;
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, amount: 1 }]);
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0)
    );
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
                      onClick={() => addToCart(item)}
                      className="absolute flex gap-2 justify-between -bottom-5 bg-white px-8 py-2 rounded-full border"
                    >
                     <img src="../images/icon-add-to-cart.svg" alt="" /> <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="absolute -bottom-5 flex items-center gap-3 bg-white px-4 py-2 rounded-full border">
                      <button
                        onClick={() => decrease(item.id)}
                        className="px-2 font-bold"
                      >
                        -
                      </button>
                      <span>{amount}</span>
                      <button
                        onClick={() => increase(item.id)}
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
