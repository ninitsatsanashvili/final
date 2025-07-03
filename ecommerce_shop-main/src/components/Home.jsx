import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useGetData from "../hooks/useGetData";

export default function Home() {
  const data = useGetData();
  let navigate = useNavigate();

  return (
    <>
      <Header cart={true} />
      <div className="flex justify-center">
        <div className="flex flex-row gap-10 w-3/4 flex-wrap justify-center my-20">
          {data.map((item) => (
            <div
              className=" w-[300px] text-wrap text-center p-5 border rounded-2xl flex items-center flex-col hover:cursor-pointer border-gray-300 shadow-sm shadow-yellow-100 bg-gray-50 hover:shadow-xl z-0"
              key={item.id}
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <img src={item.images[0]} alt="image" className="h-[300px]" />
              <h2 className="h-20 mt-2">{item.title}</h2>
              <h1 className="text-2xl font-bold">${item.price}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
