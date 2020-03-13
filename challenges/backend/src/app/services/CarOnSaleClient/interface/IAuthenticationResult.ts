export class IAuthenticationResult {
    public authenticated:	boolean;
    public userId:	string;
    public internalUserId:	number;
    public internalUserUUID:	string;
    public token: string;
    public type: number;
    public privileges: string;
}
