import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export class SignatureUtil {
    private static publicKey: string;

    // Load key once when the server starts
    static loadKey() {
        try {
            this.publicKey = fs.readFileSync("./src/accountId_1625810_public_key.pem", 'utf8');
            console.log("Public Key Loaded.");
        } catch (error) {
            console.error(`❌ SignatureUtil Error: Could not load key`);
            process.exit(1);
        }
    }

    static generate(clientId: string): string {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = `${clientId}.${timestamp}`;
            
            const buffer = Buffer.from(payload, 'utf8');
            const encrypted = crypto.publicEncrypt(
                {
                    key: this.publicKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha1"
                },
                buffer
            );
            return encrypted.toString('base64');
        } catch (error) {
            throw new Error("Failed to generate signature");
        }
    }
}