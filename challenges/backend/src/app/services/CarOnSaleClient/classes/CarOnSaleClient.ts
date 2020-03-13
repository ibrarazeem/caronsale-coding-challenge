import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {injectable} from "inversify";
import crypto from 'crypto';
import axios from 'axios';
import { AxiosInstance } from 'axios';

import {IAuthenticationResult} from "../interface/IAuthenticationResult";
import {AuctionResponse} from "./AuctionResponse";
import { plainToClass } from "class-transformer";
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public readonly userMailId = 'salesman@random.com';
    public readonly plainPassword = '123test';
    public readonly client: AxiosInstance;
    public constructor() {
        this.client = axios.create({baseURL:'https://caronsale-backend-service-dev.herokuapp.com/api/'});
    }

    public static hashPasswordWithCycles(plainPassword: string, cycles: number): string {
        let hash = `${plainPassword}`;
        for(let i = 0;i<cycles;i++) {
            hash = crypto.createHash('sha512').update(hash).digest('hex');
        }
        return hash;
    }

    public async getRunningAuctions(): Promise<AuctionResponse> {
        const results = await this.authenticateUser(this.userMailId, this.plainPassword);
        const headers = {
            userid: results.userId,
            authtoken: results.token,
        };
        const auctions = await this.client.get(`v2/auction/buyer/`,{headers});
        return plainToClass(AuctionResponse, auctions.data,{excludeExtraneousValues: true});
    }

    public async authenticateUser(userMailId: string, password: string): Promise<IAuthenticationResult> {
        const body = {
            password: CarOnSaleClient.hashPasswordWithCycles(this.plainPassword,5),
            meta: "string",
        };
        const result = await this.client.put(`v1/authentication/${this.userMailId}`, body);
        if(result.status === 201) {
            return result.data;
        } else {
            process.exit(-1);
        }
    }

}
