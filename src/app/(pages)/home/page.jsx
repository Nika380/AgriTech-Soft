import React from "react";

const page = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/id/506164764/photo/tractor-spraying-soybean-field.jpg?s=612x612&w=0&k=20&c=h27yHr07QNSghYS20iwYBCGjZIa2HlXqrZDkM0ZsYEw=)",
      }}
      className="bg-cover bg-center h-[100vh] text-white object-contain"
    >
      <div
        className="absolute max-w-max text-start ml-[60px] top-[170px] p-5 rounded-2xl"
        style={{ backgroundColor: "rgba(51, 51, 51, 0.3)" }}
      >
        <h1 className="max-w-max text-[1.3rem] font-extrabold pb-1">
          Lorem ipsum dolar amet
        </h1>
        <div className="cursor-pointer text-white outline-none border-none font-semibold rounded-0.2vw px-8 mr-4 py-2 bg-opacity-50 hover:bg-opacity-100 focus:shadow-md">
          <button className="transition-all duration-200 hover:text-black hover:bg-gray-300 cursor-pointer text-white outline-none font-bold rounded-0.2vw px-8 py-2.5 mr-4 bg-opacity-50 hover:bg-opacity-100 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-300 border-2 border-white rounded-lg">
            Sign In
          </button>
          <button className="transition-all duration-200 hover:text-black hover:bg-gray-300 cursor-pointer text-white outline-none font-bold rounded-0.2vw px-8 py-2.5 mr-4 bg-opacity-50 hover:bg-opacity-100 focus:ring-2 focus:ring-opacity-50 focus:ring-gray-300 border-2 border-white rounded-lg">
            Sign Up
          </button>
        </div>
        <h1 className="w-80 line-height-13 pt-4 text-lg max-w-screen-sm">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industrys standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book.
        </h1>
      </div>
    </div>
  );
};

export default page;
