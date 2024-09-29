import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import {ArrowLeftRight, MapPin, Tag} from "lucide-react";

const BarterCard = ({barter, onClick}) => (
    <Card
        className="bg-gray-800 border-gray-700 hover:border-white transition-all duration-300 cursor-pointer"
        onClick={() => onClick(barter)}
    >
        <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
                {barter?.item?.name}
                <Badge variant="secondary">{barter?.status || "Available"}</Badge>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-48 bg-gray-700 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                <Image
                    width={400}
                    height={400}
                    src={barter?.item?.image || "/favicon.ico"}
                    alt={barter?.item?.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center text-gray-400 text-sm">
                    <Tag className="w-4 h-4 mr-2"/>
                    <span>{barter?.item?.description}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                    <ArrowLeftRight className="w-4 h-4 mr-2"/>
                    <span className="font-semibold">Seeking: </span>
                    <span className="ml-1">{barter?.itemSeeking}</span>
                </div>
                {barter?.barterOwner?.address && (
                    <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2"/>
                        <span>{barter.barterOwner.address}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">Owner:</span>
                        <span className="text-white font-semibold text-sm">
                {barter?.barterOwner?.firstName} {barter?.barterOwner?.lastName}
                        </span>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default BarterCard;