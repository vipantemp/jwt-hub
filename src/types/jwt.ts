export interface JwtHeader {
  alg: string;
  typ?: string;
  [key: string]: any;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: any;
}

export interface DecodedJwt {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
}

export interface JwtHistoryItem {
  id: string;
  name: string;
  token: string;
  decoded: DecodedJwt;
  timestamp: number;
  verified?: boolean;
}

export type Algorithm = 
  | "HS256" | "HS384" | "HS512"
  | "RS256" | "RS384" | "RS512"
  | "ES256" | "ES384" | "ES512"
  | "none";
