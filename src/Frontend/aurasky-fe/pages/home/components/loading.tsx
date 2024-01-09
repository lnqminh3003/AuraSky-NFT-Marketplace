const Loading =()=>{
  function GetMoney({ address, nft }: any) {
    return (
      <Link
        href={{ pathname: "./getMoney", query: { id: address } }}
        className="block text-gray-700 font-semibold hover:text-sky-600 hover:font-bold bg-slate-200 p-1 px-2 rounded-xl text-center"
      >
        Withdraw
      </Link>
    );
  }

  function ListOut({ items }: any) {
    return (
      <div
        id="all"
        className="grid grid-rows-5 grid-cols-2 grid-flow-col gap-y-px mx-40 auto-cols-max gap-x-20"
      >
        {items.map((item: any, index: any) => (
          <div key={item._id} className="display:indivne-block px-2">
            <NFT id={item._id} nft={item} index={index} />
          </div>
        ))}
      </div>
    );
  }
    return <div>
    <div className="bg-blue-300 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-blue-400 outline-none focus:outline-none">
          <div className="relative p-6 flex-auto items-center">
            <p className="text-2xl font-bold whitespace-nowrap dark:text-white">LOADING...</p>
          </div>
        </div>
      </div>
    </div>
    <div className="text-sm  text-white">
      Price: {lodash.get(nft, "price")} BNB
    </div>

    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
</div>
}

export default Loading