import Image from "next/image";
import Link from "next/link";

const TradeItemDetails = ({title, item, owner, isCounterOffer = false, session}) => (
    <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <Image
            width={200}
            height={200}
            src={item?.image || "/favicon.ico"}
            alt={item?.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="space-y-2">
            <p><span className="font-semibold">Item:</span> {item?.name}</p>
            <p><span className="font-semibold">Description:</span> {item?.description}</p>
            <p>
                <span className="font-semibold">{isCounterOffer ? "Offered by" : "Owner"}: </span>
                <Link href={`/homepage/profile/${owner?.userId}`} className="hover:text-blue-400 transition">
                    {owner?.firstName} {owner?.lastName}
                    {owner?.userId === session?.user?.id && " (You)"}
                </Link>
            </p>
        </div>
    </div>
);

export default TradeItemDetails;