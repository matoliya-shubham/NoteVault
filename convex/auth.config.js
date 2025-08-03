const config = {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CONVEX_CLERK_DOMAIN,
      applicationID: process.env.NEXT_PUBLIC_CONVEX_CLERK_TEMPLATE_ID,
    },
  ],
};

export default config;
