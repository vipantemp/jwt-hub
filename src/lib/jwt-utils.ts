import { jwtVerify, SignJWT, decodeJwt, decodeProtectedHeader } from "jose";
import { DecodedJwt, JwtHeader, JwtPayload, Algorithm } from "@/types/jwt";

export const decodeToken = (token: string): DecodedJwt | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const header = decodeProtectedHeader(token) as JwtHeader;
    const payload = decodeJwt(token) as JwtPayload;

    return {
      header,
      payload,
      signature: parts[2],
      raw: {
        header: parts[0],
        payload: parts[1],
        signature: parts[2],
      },
    };
  } catch (error) {
    console.error("Decode error:", error);
    return null;
  }
};

export const verifyToken = async (
  token: string,
  secret: string,
  algorithm: Algorithm,
  publicKey?: string
): Promise<{ valid: boolean; error?: string }> => {
  try {
    if (algorithm === "none") {
      return { valid: false, error: "Algorithm 'none' is not secure" };
    }

    // For RS and ES algorithms, use public key if provided
    if (algorithm.startsWith("RS") || algorithm.startsWith("ES")) {
      if (!publicKey) {
        return { valid: false, error: `${algorithm} requires a public key` };
      }
      
      try {
        // Import the public key
        const pemKey = publicKey.includes("BEGIN") ? publicKey : `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
        const cryptoKey = await crypto.subtle.importKey(
          "spki",
          new TextEncoder().encode(pemKey).buffer,
          { name: algorithm.startsWith("RS") ? "RSASSA-PKCS1-v1_5" : "ECDSA", hash: { name: `SHA-${algorithm.slice(2)}` } },
          false,
          ["verify"]
        );
        
        await jwtVerify(token, cryptoKey, { algorithms: [algorithm] });
        return { valid: true };
      } catch (error: any) {
        return { valid: false, error: error.message || "Public key verification failed" };
      }
    }

    // For HS algorithms, use secret key
    const secretKey = new TextEncoder().encode(secret);
    await jwtVerify(token, secretKey, { algorithms: [algorithm] });
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.message || "Verification failed" };
  }
};

export const encodeToken = async (
  header: JwtHeader,
  payload: JwtPayload,
  secret: string
): Promise<string> => {
  const secretKey = new TextEncoder().encode(secret);
  
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: header.alg, typ: header.typ || "JWT" });

  if (payload.iat) jwt.setIssuedAt(payload.iat);
  if (payload.exp) jwt.setExpirationTime(payload.exp);
  if (payload.nbf) jwt.setNotBefore(payload.nbf);

  return await jwt.sign(secretKey);
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
};

export const getTimeRemaining = (exp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;

  if (diff <= 0) {
    const expired = Math.abs(diff);
    const days = Math.floor(expired / 86400);
    const hours = Math.floor((expired % 86400) / 3600);
    const minutes = Math.floor((expired % 3600) / 60);
    
    if (days > 0) return `Expired ${days}d ago`;
    if (hours > 0) return `Expired ${hours}h ago`;
    return `Expired ${minutes}m ago`;
  }

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};
