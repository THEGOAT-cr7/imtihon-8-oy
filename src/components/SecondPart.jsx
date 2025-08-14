// import React from "react";
// import { useSelector } from "react-redux";

// function SecondPart() {
//   const cart = useSelector((state) => state.cart?.items || state.cart || []);

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.amount || 0),
//     0
//   );

//   return (
//     <div className="bg-white p-5 rounded-xl flex flex-col gap-10 max-w-md mx-auto">
//       <div className="flex items-center justify-between">
//         <h1 className="text-[#C73B0F] text-2xl font-semibold">
//           Your Cart ({cart.reduce((sum, item) => sum + (item.amount || 0), 0)})
//         </h1>
//         <h1 className="text-[#C73B0F] text-2xl font-semibold">
//           ${totalPrice.toFixed(2)}
//         </h1>
//       </div>

//       {cart.length === 0 ? (
//         <div className="flex flex-col items-center justify-center gap-6 mt-10">
//           <img
//             src="../images/illustration-empty-cart.svg"
//             alt="Empty Cart"
//             className="w-48 h-48 object-contain"
//           />
//           <p className="text-[#87635A] text-center">
//             Your added items will appear here
//           </p>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div className="flex flex-col">
//                 <span className="font-semibold">{item.name}</span>
//                 <span className="text-gray-500">${item.price}</span>
//               </div>
//               <span className="font-semibold">x{item.amount}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SecondPart;
