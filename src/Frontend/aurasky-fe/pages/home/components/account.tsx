import Link from "next/link";

function Account({ address, nft }: any) {
  return (
    <Link
      href={{ pathname: "./asset", query: { id: address } }}
      className="block text-gray-700 hover:text-sky-600"
    ></Link>