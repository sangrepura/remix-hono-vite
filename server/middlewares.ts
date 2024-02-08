import { createMiddleware } from "hono/factory";

/**
 * Cache middleware
 * This middleware adds cache-related headers to responses for files with specific extensions.
 *
 * @param seconds - The number of seconds to cache
 */
export function cache(seconds: number) {
  // Return a middleware function that takes a context and the next middleware function.
  return createMiddleware(async (context, next) => {
    // Check if the request path ends with a file extension.
    // This is done to identify requests for static assets,
    // as they are typically the ones we want to cache.
    if (!context.req.path.match(/\.[a-zA-Z0-9]+$/)) {
      // If not, proceed to the next middleware.
      return next();
    }

    // Execute the next middleware in the chain.
    await next();

    // Check if the response is successful.
    if (!context.res.ok) {
      // If not, do not apply caching headers.
      return;
    }

    // Set the cache-control header in the response with the specified max-age.
    context.res.headers.set("cache-control", `public, max-age=${seconds}`);
  });
}
