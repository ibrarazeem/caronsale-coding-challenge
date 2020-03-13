import {Expose} from 'class-transformer';
export class AuctionPartial {
    @Expose()
    public id: number;
    @Expose()
    public label: string;
    @Expose()
    public state: number;
    @Expose()
    public minimumRequiredAsk: number;
    @Expose()
    public currentHighestBidValue: number;
    @Expose()
    public numBids: number;
}
