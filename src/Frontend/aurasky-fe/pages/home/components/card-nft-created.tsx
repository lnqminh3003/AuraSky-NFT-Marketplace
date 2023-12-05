import Link from "next/link";
import lodash from "lodash";
function CardNFTCreated({ id, nft }: { id: string; nft: any }) {
  return (
    <Link href={{ pathname: "./sell", query: { id:id } }}>
      <div className="relative flex-wrap w-60 h-60 inline-block">
        <img
          src={lodash.get(nft, "contentUrl")}
          alt=""
          className=" w-60 h-60 object-cover rounded-3xl"
        />
export default CardNFTCreated;