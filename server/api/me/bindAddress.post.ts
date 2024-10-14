import {
  serverSupabaseUser,
  serverSupabaseServiceRole,
} from "#supabase/server";
import Arweave from "arweave";
import { ArweaveVerifier } from "arweave-wallet-connector";

export default defineEventHandler(async (event) => {
  const { network, signedMessage } = await readBody(event);
  if(network !== 'ao') {
    return {
      error: 'Network not supported'
    }
  }
  
  const adminClient = serverSupabaseServiceRole(event);
  const user = await serverSupabaseUser(event);
  const userId = user?.id;

  // Check if the address is already bound
  const { data: existingBind } = await adminClient
    .from("addressBind")
    .select()
    .eq("userId", userId)
    .eq("network", network)
    .single();

  if (existingBind) {
    return {
      error: "Address already bound for this network",
    };
  }

  try {
    const data = Arweave.utils.b64UrlToBuffer(signedMessage.data);
    const signature = Arweave.utils.b64UrlToBuffer(signedMessage.signature);
    const owner = signedMessage.owner;
    const verifier = new ArweaveVerifier();
    const isValid = await verifier.verifyMessage(data, signature, owner, {
      hashAlgorithm: "SHA-256",
    });

    if (!isValid) {
      throw new Error("Invalid signature");
    }

    let addressTmp = Arweave.utils.b64UrlToBuffer(owner);
    addressTmp = await Arweave.crypto.hash(addressTmp);
    const address = Arweave.utils.bufferTob64Url(addressTmp);

    // Insert the new address binding
    const id = `${userId}-${network}`;
    const { data: insertedData, error } = await adminClient
      .from("addressBind")
      .insert({ id, userId, network, address })
      .select();

    if (error) {
      throw error;
    }

    return { data: insertedData[0] };
  } catch (error) {
    console.error("Error processing signed message:", error);
    return {
      error: "Failed to process signed message",
    };
  }
});
