import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "92eca93c-c1eb-4c51-a3d4-794a37815095",
  include: ["/profile/*", "/wallet/*", "/settings/*", "/messages/*", "/projects/*"],
  loginSuccessUrl: "/",
  loginUrl: "/",
  logoutUrl: "/"
});

export default process.env.NEXT_PUBLIC_INTEGRATION_CIVIC === 'true' 
  ? withCivicAuth(nextConfig) 
  : nextConfig;
