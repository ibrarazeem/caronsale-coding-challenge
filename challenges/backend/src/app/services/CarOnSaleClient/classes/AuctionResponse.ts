import {AuctionPartial} from "./AuctionPartial";
import {Expose, Type} from 'class-transformer';

export class AuctionResponse {
    @Expose()
    @Type(() => AuctionPartial)
    public readonly items: [
        AuctionPartial
    ];
    @Expose()
    public readonly page: number;
    @Expose()
    public readonly total: number;
}
