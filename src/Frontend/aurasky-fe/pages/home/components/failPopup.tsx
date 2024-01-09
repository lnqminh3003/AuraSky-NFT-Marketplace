const failPopup =()=>{
    return(
        <div>
            <div  className="grid place-items-center bg-back bg-opacity-60 fixed top-0 left-0 right-0 z-50 w-full p-4 overflw-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-96 grid place-items-center">
                  <div className="flex items-start p-4 border-b rounded-t dark:border-gray-600">
                  <img
                  src="https://cdn-icons-png.flaticon.com/512/6659/6659895.png"
                  className="p-1 rounded h-11 w-11"
                  alt="..."
                />
                   
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      TRY AGAIN
                    </p>
                  
                </div>
              
            </div>
        </div>
    )
}

export default failPopup
