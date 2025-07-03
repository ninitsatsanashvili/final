import Header from "./Header";
import { useState } from "react";
import RemoveIcon from "../assets/icon-delete.svg";
import SuccessModal from "./SuccessModal";
import useGetData from "../hooks/useGetData";

export default function Cart() {
  const data = useGetData();
  const [keys, setKeys] = useState(Object.keys(localStorage));
  const [modalOpen, setModalOpen] = useState(false);

  function handleRemove(itemId) {
    localStorage.removeItem(itemId);
    setKeys(Object.keys(localStorage));
  }

  return (
    <>
      <SuccessModal
        open={modalOpen}
        className={
          modalOpen &&
          "modal outline-none z-10 w-1/3 h-80 rounded-2xl flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        }
      />
      <Header cart={false} />
      <div className="flex flex-col gap-5 justify-center items-center mt-10 mb-48">
        {keys.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          keys.map((item) => (
            <div
              className="flex flex-row justify-between items-center gap-8 w-1/2 p-5 border border-gray-200 rounded-2xl shadow-xl shadow-yellow-50"
              key={item}
            >
              <div className="flex flex-row gap-8 justify-center items-center">
                <img
                  src={data[item - 1]?.thumbnail}
                  alt="item image"
                  className="w-30"
                />
                <div>
                  <h3 className="text-lg text-yellow-700">
                    {data[item - 1]?.title}{" "}
                  </h3>
                  <p className="font-semibold text-md">
                    {data[item - 1]?.price}$ x {localStorage.getItem(item)}
                  </p>
                </div>
              </div>

              <img
                src={RemoveIcon}
                alt="remove icon"
                className="mr-10 h-6 hover:cursor-pointer"
                onClick={() => handleRemove(item)}
              />
            </div>
          ))
        )}
        {keys.length !== 0 && (
          <button
            className="w-48 p-2 text-2xl font-semibold rounded-4xl fixed bottom-20 bg-yellow-200 hover:cursor-pointer hover:bg-yellow-300"
            onClick={() => {
              localStorage.clear();
              setKeys([]);
              setModalOpen(true);
            }}
          >
            Pay
          </button>
        )}
      </div>
    </>
  );
}
