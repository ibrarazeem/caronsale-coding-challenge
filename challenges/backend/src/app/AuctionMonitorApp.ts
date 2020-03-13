import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import {AuctionResponse} from "./services/CarOnSaleClient/classes/AuctionResponse";

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
                       @inject(DependencyIdentifier.CarOnSaleClient) private client: ICarOnSaleClient,
    ) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        const auctions: AuctionResponse = await this.client.getRunningAuctions();
        this.logger.log(`Total Number of Auctions: ${auctions.total}`);

        auctions.items.forEach((item) => {
            this.logger.log(`Auction ID: ${item.id}`);
            this.logger.log(`Auction ID: ${item.id}, Average Number of Bids: ${item.numBids}`);
            if(item.minimumRequiredAsk){
                this.logger.log(`Auction ID: ${item.id}, Auction Progress: (${(item.currentHighestBidValue * 100)/item.minimumRequiredAsk})`);
            }
        });
        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }
}
