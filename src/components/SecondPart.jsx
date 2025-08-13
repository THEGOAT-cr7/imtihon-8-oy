function SecondPart() {
  const cart = []; 
  const totalPrice = 0;

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col gap-10">
      <h1 className="text-[#C73B0F] text-3xl font-semibold">
        Your Cart ({cart.length})
      </h1>

        <div className="flex flex-col items-center gap-8">
          <img src="../images/illustration-empty-cart.svg" alt="" />
          <p className="text-[#87635A]">Your added items will appear here</p>
        </div>
    </div>
  );
}

export default SecondPart;
