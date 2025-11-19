// import express, { Request, Response } from 'express';
// import axios from 'axios';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import crypto from 'crypto'; // Built-in Node module
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // --- CONFIGURATION ---
// const CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
// const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;
// const KEY_FILE_NAME = 'accountId_1625810_public_key.pem'; // Ensure this matches your file name

// // --- 1. LOAD PUBLIC KEY (Startup Check) ---
// const KEY_PATH = path.resolve(__dirname, KEY_FILE_NAME);
// let PUBLIC_KEY_CONTENT = '';

// if (!fs.existsSync(KEY_PATH)) {
//     console.error(`\n❌ CRITICAL ERROR: '${KEY_FILE_NAME}' not found!`);
//     console.error(`   Please put the .pem file in: ${KEY_PATH}`);
//     process.exit(1); // Stop server if key is missing
// }

// // Read the file (Node.js handles the newlines correctly)
// PUBLIC_KEY_CONTENT = fs.readFileSync(KEY_PATH, 'utf8');
// console.log(`✅ Loaded Public Key from: ${KEY_FILE_NAME}`);


// // --- 2. SIGNATURE GENERATOR ---
// // Logic matches the Java code: RSA-OAEP with SHA1
// function generateSignature(): string {
//     try {
//         // A. Timestamp in Seconds (Important: Not Milliseconds)
//         const timestamp = Math.floor(Date.now() / 1000);
        
//         // B. Payload: "clientId.timestamp"
//         const payload = `${CLIENT_ID}.${timestamp}`;
        
//         // C. Encrypt
//         const buffer = Buffer.from(payload, 'utf8');
//         const encrypted = crypto.publicEncrypt(
//             {
//                 key: PUBLIC_KEY_CONTENT,
//                 padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//                 oaepHash: "sha1" // <--- Critical for Cashfree
//             },
//             buffer
//         );
        
//         return encrypted.toString('base64');
//     } catch (error) {
//         console.error("Crypto Error:", error);
//         throw new Error("Failed to generate signature");
//     }
// }

// // --- 3. THE ROUTE ---
// app.post('/api/verify', async (req: Request, res: Response) => {
//     console.log("\n👉 Received Verification Request (Signature Mode)...");
//     const { bankAccount, ifsc, name, phone } = req.body;

//     if (!bankAccount || !ifsc) return res.status(400).json({ message: "Missing fields" });

//     try {
//         // Generate unique signature for this request
//         const signature = generateSignature();
//         console.log("   Generated Signature successfully.");

//         const url = 'https://sandbox.cashfree.com/verification/bank-account/sync';
        
//         const response = await axios.post(url, {
//             bank_account: bankAccount,
//             ifsc: ifsc,
//             name: name || "Test User",
//             phone: phone || "9999999999"
//         }, {
//             headers: {
//                 'x-client-id': CLIENT_ID,
//                 'x-client-secret': CLIENT_SECRET,
//                 'x-cf-signature': signature, // <--- Authenticates us
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log("✅ Success:", response.data);
//         res.json({ success: true, data: response.data });

//     } catch (error: any) {
//         // Handle Errors
//         const errData = error.response?.data || error.message;
//         console.error("❌ API Error:", JSON.stringify(errData, null, 2));
        
//         res.status(error.response?.status || 500).json({
//             success: false,
//             error: errData
//         });
//     }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

import dotenv from "dotenv";
import app from "./app";
import { SignatureUtil } from "./utils/signature";

dotenv.config();

// Load key once
SignatureUtil.loadKey();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
