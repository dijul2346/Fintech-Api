import axios from "axios";
import { SignatureUtil } from "../utils/signature";

export class VerifyService {
    constructor(
        private clientId: string,
        private clientSecret: string
    ) {}

    async verifyBankAccount(bankAccount: string, ifsc: string, name?: string, phone?: string) {

        const signature = SignatureUtil.generate(this.clientId);

        const url = "https://sandbox.cashfree.com/verification/bank-account/sync";

        const response = await axios.post(
            url,
            {
                bank_account: bankAccount,
                ifsc,
                name: name || "Test User",
                phone: phone || "9999999999",
            },
            {
                headers: {
                    "x-client-id": this.clientId,
                    "x-client-secret": this.clientSecret,
                    "x-cf-signature": signature,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    }
}
