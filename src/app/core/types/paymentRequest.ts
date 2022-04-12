export interface PaymentRequest{
    "currency": string,
    "description": string,
    "amount": number,
    "success_url": string,
    "cancel_url": string
}