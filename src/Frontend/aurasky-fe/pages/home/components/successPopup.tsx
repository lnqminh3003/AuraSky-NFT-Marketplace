import { useEffect, useState } from "react";

const SuccessPopup = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  return (
    <div>
      <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
          <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
            <img
              src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
              className="p-1 rounded h-11 w-11"
              alt="..."
            />
            <h3 className="text-xl font-semibold pt-2 pl-4 text-gray-900 dark:text-white">
              Payment successful
            </h3>