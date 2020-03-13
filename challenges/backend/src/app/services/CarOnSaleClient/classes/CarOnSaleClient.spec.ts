import "reflect-metadata";
import {assert, expect} from 'chai';
import { Container } from "inversify";
import { CarOnSaleClient } from './CarOnSaleClient';
import { DependencyIdentifier } from '../../../DependencyIdentifiers';
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient';
import { AuctionResponse } from "./AuctionResponse";


describe('CarOnSaleClient test', () => {
    let container: Container;
    beforeEach(() => {
        container = new Container();
        container.bind<ICarOnSaleClient>(DependencyIdentifier.CarOnSaleClient).to(CarOnSaleClient);
    });

    afterEach(() => {
        container = null;
    });

    describe('CarOnSaleClient hashPlaingPassword', () => {
        it('should return correct hash for plain password', () => {
            const plainPassword = 'something';
            const hashedPassword = 'aed187d5d7391a3451c27e1d5154ed507e45f5e6d80b0e4121e9553633a974c1113caac4d499bf612db318a5746f84b87024013f98dfe88af42d5552c3791455'
            assert.equal(CarOnSaleClient.hashPasswordWithCycles(plainPassword,5), hashedPassword);
        });
    });

    describe('CarOnSaleClient check valid AuctionResponse', function() {
        this.enableTimeouts(false)
        it('should return AuctionResponse instance', async () => {
            const client = container.get<ICarOnSaleClient>('CarOnSaleClient');
            const results = await client.getRunningAuctions();

            expect(results).to.be.a('object');
            expect(results).to.be.have.property('items');
            expect(results).to.be.have.property('total');
            expect(results).to.be.have.property('page');
        });
    });
});
