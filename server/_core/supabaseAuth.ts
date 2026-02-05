import { jwtVerify } from "jose";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

const getBearerToken = (req: Request) => {
  const header = req.headers.authorization;
  if (!header) return null;
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
};

const getString = (value: unknown) => (typeof value === "string" ? value : null);

export async function authenticateRequest(req: Request): Promise<User | null> {
  const token = getBearerToken(req);
  if (!token) return null;

  if (!ENV.supabaseJwtSecret) {
    console.warn("[Auth] SUPABASE_JWT_SECRET is not configured");
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(ENV.supabaseJwtSecret);
    const { payload } = await jwtVerify(token, secretKey);

    const openId = getString(payload.sub);
    if (!openId) return null;

    const email = getString(payload.email);
    const userMetadata = payload.user_metadata as Record<string, unknown> | undefined;
    const fullName = getString(userMetadata?.full_name) ?? getString(userMetadata?.name);

    await db.upsertUser({
      openId,
      name: fullName,
      email: email ?? null,
      loginMethod: "supabase",
      lastSignedIn: new Date(),
    });

    const user = await db.getUserByOpenId(openId);
    return user ?? null;
  } catch (error) {
    console.warn("[Auth] Supabase token verification failed:", String(error));
    return null;
  }
}
