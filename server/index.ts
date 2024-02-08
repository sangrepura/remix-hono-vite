// Import necessary modules and types for building the server
import { serve } from "@hono/node-server"; // Module for serving HTTP requests
import { serveStatic } from "@hono/node-server/serve-static"; // Module for serving static files
import { type AppLoadContext, createCookieSessionStorage } from "@remix-run/node"; // Modules for session management
import { type ServerBuild } from "@remix-run/server-runtime"; // Module for server-side rendering
import { Hono } from "hono"; // Framework for building web servers
import { logger } from "hono/logger"; // Module for logging server requests
import { remix } from "remix-hono/handler"; // Module for handling Remix requests
import { session } from "remix-hono/session"; // Module for managing user sessions

// Import custom middleware for caching responses
import { cache } from "server/middlewares";

// Import function for importing the development build of the application
import { importDevBuild } from "./dev/server.js";

// Determine the environment mode based on the NODE_ENV environment variable
const mode = process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV;

// Check if the environment mode is set to production
const isProductionMode = mode === "production";

// Create a new instance of the Hono server
const app = new Hono();

/**
 * Serve assets files from build/client/assets
 */
app.use(
  "/assets/*",
  cache(60 * 60 * 24 * 365), // Cache assets for 1 year to improve performance
  serveStatic({ root: "./build/client" }) // Serve static assets from the specified directory
);

/**
 * Serve public files
 */
app.use("*", cache(60 * 60), serveStatic({ root: "./build/client" })); // Cache public files for 1 hour to improve performance

/**
 * Add logger middleware
 */
app.use("*", logger()); // Adding middleware for logging server requests

/**
 * Add session middleware (https://github.com/sergiodxa/remix-hono?tab=readme-ov-file#session-management)
 */
app.use(
  session({
    autoCommit: true, // Automatically commit session changes to ensure consistency
    createSessionStorage() {
      // Define the behavior for creating session storage
      if (!process.env.SESSION_SECRET) {
        // Check if the SESSION_SECRET environment variable is defined
        throw new Error("SESSION_SECRET is not defined"); // Throw an error if SESSION_SECRET is not defined to ensure security
      }

      // Create cookie-based session storage with secure configurations
      const sessionStorage = createCookieSessionStorage({
        cookie: {
          name: "session", // Define the name of the session cookie
          httpOnly: true, // Restrict cookie access to HTTP requests for security
          path: "/", // Define the path for which the cookie is valid
          sameSite: "lax", // Specify the SameSite attribute to prevent cross-site request forgery
          secrets: [process.env.SESSION_SECRET], // Use the provided secret to sign the session cookie
          secure: process.env.NODE_ENV === "production", // Set cookie secure flag based on environment for HTTPS-only in production
        },
      });

      // Define session commit behavior to handle session expiration and cleanup
      return {
        ...sessionStorage,
        // If a user doesn't come back to the app within 30 days, their session will be deleted.
        async commitSession(session) {
          // Asynchronously commit the session with a maximum age to ensure session expiration
          return sessionStorage.commitSession(session, {
            maxAge: 60 * 60 * 24 * 30, // Set the maximum session age to 30 days to maintain user sessions
          });
        },
      };
    },
  })
);

/**
 * Add remix middleware to Hono server
 */
app.use(async (c, next) => {
  const build = (isProductionMode
    ? // eslint-disable-next-line import/no-unresolved -- this expected until you build the app
      await import("../build/server/remix.js")
    : await importDevBuild()) as unknown as ServerBuild;

  return remix({
    build,
    mode,
    getLoadContext() {
      return {
        appVersion: isProductionMode ? build.assets.version : "dev",
      } satisfies AppLoadContext;
    },
  })(c, next);
});

/**
 * Start the production server
 */

if (isProductionMode) {
  serve(
    {
      ...app,
      port: Number(process.env.PORT) || 3000,
    },
    async (info) => {
      /* eslint-disable no-console -- this is a server */
      console.log(`🚀 Server started on port ${info.port}`);
    }
  );
}

export default app;

/**
 * Declare our loaders and actions context type
 */
declare module "@remix-run/node" {
  interface AppLoadContext {
    /**
     * The app version from the build assets
     */
    readonly appVersion: string;
  }
}
