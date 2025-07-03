import { useNavigate } from "react-router-dom";
import CartIcon from "../assets/icon-cart.svg";
import { useState } from "react";
import useGetData from "../hooks/useGetData";

export default function Header({ cart }) {
  const [cartOpen, setCartOpen] = useState(false);
  const data = useGetData();
  let navigate = useNavigate();
  const keys = Object.keys(localStorage);
  console.log(keys);

  return (
    <>
      <nav className="flex flex-row justify-center my-8">
        <div className="flex flex-row gap-24 items-center text-xl text-yellow-600 font-[FiraGo]">
          <p
            className="font-bold hover:cursor-pointer hover:drop-shadow-lg"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p
            className="font-bold hover:cursor-pointer hover:drop-shadow-lg"
            onClick={() => navigate("/Cart")}
          >
            Cart
          </p>
        </div>
        {cart && (
          <div className="flex flex-col items-end absolute right-20 gap-16">
            <img
              src={CartIcon}
              alt="cart icon"
              className="h-6 w-7 mr-20 hover:cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            />
            {cartOpen && (
              <div className="w-80 border shadow-xl shadow-gray-300 p-4 rounded-2xl border-transparent flex flex-col gap-2 z-10 bg-white min-h-60">
                <h3 className="text-lg font-bold">Cart</h3>
                <hr className="text-gray-200" />
                {keys.length == 0 && (
                  <h4 className="text-center mt-14 text-lg">Cart Is Empty!</h4>
                )}
                {keys.map((item) => (
                  <div
                    className="flex flex-row justify-start items-center gap-4"
                    key={item}
                  >
                    <img
                      src={data[item - 1].thumbnail}
                      alt="item image"
                      className="w-16"
                    />
                    <div>
                      <h3 className="text-sm text-yellow-700">
                        {data[item - 1].title}
                      </h3>
                      <p className="font-semibold">
                        {data[item - 1].price}$ x {localStorage.getItem(item)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      <hr className="text-gray-200" />
    </>
  );
}
