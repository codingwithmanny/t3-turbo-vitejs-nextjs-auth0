// Imports
// ========================================================
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { toast } from "react-hot-toast";

// Components
// ========================================================
/**
 *
 * @returns
 */
const AuthShowcase: React.FC<{ callback?: () => void }> = ({ callback }) => {
  // State / Props
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { user, error, isLoading } = useUser();
  // Requests
  /**
   *
   */
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!user },
  );
  /**
   *
   */
  const postCreate = trpc.post.create.useMutation({
    onSuccess: () => {
      if (callback) {
        callback();
      }
    },
  });

  // Functions
  /**
   *
   * @param event
   */
  const onSubmitFormNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      toast.promise(postCreate.mutateAsync(inputs), {
        loading: "Creating Post...",
        success: "Post Created!",
        error: "Error Creating Post",
      });
      setInputs({ title: "", content: "" });
    } catch (error) {
      console.error({ error });
    }
  };

  // Render
  /**
   *
   */
  if (isLoading)
    return (
      <div>
        <code>Loading...</code>
      </div>
    );

  /**
   *
   */
  if (error)
    return (
      <div>
        <code>{JSON.stringify(error)}</code>
      </div>
    );

  /**
   *
   */
  return (
    <div className="">
      {user && (
        <>
          <pre>
            <code>{secretMessage ? secretMessage : null}</code>
          </pre>

          <hr />

          <div>
            <div>
              <h2>Authenticated User</h2>
              <pre>
                <code>{JSON.stringify({ user }, null, " ")}</code>
              </pre>
              <p>
                Welcome{" "}
                <span className="ml-2 rounded bg-black/30 px-3 py-2">
                  {user.name}
                </span>
              </p>
              <p>
                <Link type="button" href="/api/auth/logout">
                  Logout
                </Link>
              </p>
            </div>
          </div>

          <hr />

          <h2>New Post</h2>

          <div className="w-full">
            <form onSubmit={onSubmitFormNewPost}>
              <div className="mb-4">
                <label htmlFor="title">Title</label>
                <input
                  required
                  className="w-full max-w-lg"
                  id="title"
                  name="title"
                  type="text"
                  value={inputs.title}
                  placeholder="Ex: My Post Title"
                  onChange={(e) => {
                    setInputs((existing) => ({
                      ...existing,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block" htmlFor="content">
                  Content
                </label>
                <input
                  required
                  className="w-full max-w-lg"
                  id="content"
                  name="content"
                  type="text"
                  value={inputs.content}
                  placeholder="Ex: Here is my message"
                  onChange={(e) => {
                    setInputs((existing) => ({
                      ...existing,
                      content: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
      {!user && (
        <p>
          <Link type="button" href="/api/auth/login">
            Login
          </Link>
        </p>
      )}
    </div>
  );
};

/**
 *
 * @param param0
 * @returns
 */
const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
  onClick?: (id: string) => void;
  isDisabled?: boolean;
}> = ({ post, onClick, isDisabled = false }) => {
  // Functions
  /**
   * Deletes a post if callback is defined
   */
  const onClickDelete = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  // Render
  return (
    <div className="group relative rounded-lg border border-zinc-700 bg-zinc-900 transition-all duration-200 ease-in-out hover:border-zinc-400 hover:shadow-[0px_0px_0px_2px_rgba(161,161,170,1)]">
      <div className="p-6">
        <h3 className="mb-0">{post.title}</h3>
        <p className="mb-0">{post.content}</p>
      </div>
      {onClick || !isDisabled ? (
        <button
          onClick={onClickDelete}
          className="absolute -right-4 -top-4 hidden px-3 leading-8 group-hover:block"
        >
          &times;
        </button>
      ) : null}
    </div>
  );
};

/**
 *
 * @returns
 */
const Home: NextPage = () => {
  // State / Props
  const { user } = useUser();

  // Requests
  /**
   *
   */
  const postQuery = trpc.post.all.useQuery();

  /**
   *
   */
  const postDelete = trpc.post.delete.useMutation({
    onSuccess: () => {
      postQuery.refetch();
    },
  });

  /**
   *
   */
  const isLoading =
    postQuery.isLoading || postDelete.isLoading || postQuery.isFetching;

  // Render
  return (
    <>
      <Head>
        <title>Create T3 App Auth0</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8 pb-14 pt-8">
        <h1>Create T3 NextJS Pages Auth0</h1>

        <hr />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          pariatur perferendis dignissimos voluptatibus in quo odit officia
          voluptates animi dolor numquam, inventore, quae cumque ratione eveniet
          blanditiis libero sit et.
        </p>

        <AuthShowcase callback={() => postQuery.refetch()} />

        <hr />

        <h2>Posts</h2>

        <div className="mb-8 flex overflow-y-scroll">
          {postQuery.data ? (
            <div className="flex gap-4 rounded-lg bg-zinc-950/50 p-8">
              {postQuery.data?.map((p) => {
                return (
                  <PostCard
                    key={p.id}
                    post={p}
                    isDisabled={isLoading}
                    onClick={
                      user
                        ? async (id) => {
                            try {
                              toast.promise(postDelete.mutateAsync(id), {
                                loading: "Deleting post...",
                                success: "Post deleted!",
                                error: "Error deleting post",
                              });
                            } catch (error) {
                              console.error({ error });
                            }
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>

        <hr />

        <h2>Posts Table</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {postQuery.data?.map((p) => {
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.content}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>No results.</td>
            </tr>
          </tfoot>
        </table>
      </main>
    </>
  );
};

// Exports
// ========================================================
export default Home;
