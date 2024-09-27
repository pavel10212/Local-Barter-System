import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {FaImage} from "react-icons/fa";
import Image from "next/image";

const BarterCard = ({barter, onClick}) => (
    <Card
        className="bg-gray-700 text-white cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
        onClick={() => onClick(barter)}
    >
        <CardHeader>
            <CardTitle>{barter?.item?.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-48 bg-gray-600 flex items-center justify-center mb-4">
                <Image
                    width={150}
                    height={150}
                    src={barter?.item?.image || "/favicon.ico"}
                    alt={barter?.item?.name}
                    className="h-full w-full object-cover"
                />
            </div>
            <p className="text-gray-400 mb-2">{barter?.item?.description}</p>
            <p className="text-sm">Seeking: {barter?.itemSeeking}</p>
        </CardContent>
    </Card>
);

export default BarterCard;
