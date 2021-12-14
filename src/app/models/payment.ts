export class Payment {
    static nextId: number = 0;

    constructor(
    public id: number = 0,
    public cardOwnerName: string = '',
    public cardNumber: string = '', 
    public expirationDate: string = '',
    public securityCode: string = '')
    {
        this.id = id ? id : Payment.nextId++;
    }
}
