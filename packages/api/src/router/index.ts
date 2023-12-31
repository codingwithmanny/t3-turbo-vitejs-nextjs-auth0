// Imports
// ========================================================
import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";

// Exports
// ========================================================
export const appRouter = router({
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
