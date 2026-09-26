import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const FEE_WALLET = "TE26B7zQjMbahYAWcxEsSPC6aZEr2Hcz1u";

export async function queueFee(uid, type, pkgAmount){
  await addDoc(collection(db, "fee_queue"), {
    uid, type, // 'deposit' or 'withdrawal'
    fee_usd: 5,
    to: FEE_WALLET,
    pkgAmount,
    status: "pending",
    createdAt: serverTimestamp()
  });
}
