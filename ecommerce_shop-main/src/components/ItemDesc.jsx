import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CartIcon from "../assets/icon-cart.svg";
import PlusIcon from "../assets/icon-plus.svg";
import MinusIcon from "../assets/icon-minus.svg";
import Header from "./Header";

export default function ItemDesc() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(
    localStorage.getItem(id) ? localStorage.getItem(id) : 0
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProduct(response.data.products[Number(id) - 1]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
    console.log(product);
  }, []);

  function handleQuantity(operator) {
    let qty = localStorage.getItem(id);
    operator == "+" ? qty++ : qty--;
    setQuantity(qty);
    qty == 0 ? localStorage.removeItem(id) : localStorage.setItem(id, qty);
  }

  console.log(quantity);

  return (
    <>
      <Header cart={true} />
      <div className="flex flex-row justify-center items-center gap-48 mx-16 mt-24">
        <img
          src={product.thumbnail}
          alt="product image"
          className=" w-lg border rounded-2xl border-gray-300 shadow-sm shadow-gray-500"
        />
        <div className="flex flex-col gap-5 justify-start text-left text-wrap w-1/3">
          <div>
            <h6 className="text-sm font-bold tracking-widest">
              {product.brand}
            </h6>
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>

          <h1 className="text-2xl font-bold">${product.price}</h1>
          <p>{product.description}</p>
          {quantity == 0 ? (
            <div
              className="w-64 h-14 flex flex-row justify-center items-center gap-6 rounded-4xl bg-yellow-400 mt-5 hover:cursor-pointer hover:bg-yellow-300"
              onClick={() =>
                setQuantity(() => {
                  localStorage.setItem(id, 1);
                  return 1;
                })
              }
            >
              <img src={CartIcon} alt="cart icon" />
              <h1 className="font-semibold">Add to cart</h1>
            </div>
          ) : (
            <div className="w-64 h-14 flex flex-row justify-center items-center gap-6 rounded-4xl bg-gray-300 mt-5">
              <img
                src={MinusIcon}
                alt="minus icon"
                onClick={() => handleQuantity("-")}
                className="mr-4 hover:cursor-pointer"
              />
              <h1 className="text-xl font-bold">{quantity}</h1>
              <img
                src={PlusIcon}
                alt="plus icon"
                onClick={() => handleQuantity("+")}
                className="ml-4 hover:cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
