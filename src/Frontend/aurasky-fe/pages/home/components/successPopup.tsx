import { useEffect, useState } from "react";

const SuccessPopup = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  return (
    <div>
      <div className="grid place-items-center bg-black bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
          <div className="p-6 space-y-6">
            <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
              THANK YOU
            </p>
          </div>
          <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              className="text-white bg-blue-700 fixed top-0 hover:bg-blue-800 focus:ring-4  right-0 z-50 w-full focus:outline-none focus:ring-blue-300 font-medium rounded-lg overflow-y-auto text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Let's go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;