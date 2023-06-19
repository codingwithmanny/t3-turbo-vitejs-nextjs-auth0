// Imports
// ========================================================
import { useAuth0 } from "@auth0/auth0-react";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { useState } from "react";
import trpc from '../../utils/trpc';
import { toast } from "react-hot-toast";

// Components
// ========================================================
/**
 * 
 * @returns 
 */
const AuthShowcase: React.FC<{ callback?: () => void, isDisabled?: boolean; }> = ({ callback = () => { }, isDisabled = false }) => {
  // State / Props
  const [inputs, setInputs] = useState({
    title: '',
    content: ''
  });
  const { user, error, isLoading, loginWithRedirect, logout } = useAuth0();

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
    }
  });

  // Functions
  const onSubmitFormNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      toast.promise(postCreate.mutateAsync(inputs), {
        loading: 'Creating Post...',
        success: 'Post Created!',
        error: 'Error Creating Post',
      });
      setInputs({ title: '', content: '' });
    } catch (error) {
      console.error({ error });
    }
  };

  // Render
  /**
   * 
   */
  if (isLoading) return <div><code>Loading...</code></div>;

  /**
   * 
   */
  if (error) return <div><code>{JSON.stringify(error)}</code></div>;

  /**
   * 
   */
  return (
    <div className="">
      {user && (
        <>
          <pre><code>{secretMessage ? secretMessage : null}</code></pre>

          <hr />

          <div>
            <div>
              <h2>Authenticated User</h2>
              <pre><code>{JSON.stringify({ user }, null, ' ')}</code></pre>
              <p>Welcome <span className="bg-black/30 px-3 py-2 rounded ml-2">{user.name}</span></p>
              <p><button type="button" onClick={() => logout({
                openUrl: async (url) => {
                  window.location.replace(`${url}&returnTo=${window.location.origin}`);
                }
              })} >Logout</button></p>
            </div>
          </div>

          <hr />

          <h2>New Post</h2>

          <div className="w-full">
            <form onSubmit={onSubmitFormNewPost}>
              <div className="mb-4">
                <label htmlFor="title">Title</label>
                <input disabled={isDisabled || postCreate.isLoading} required className="w-full max-w-lg" id="title" name="title" type="text" value={inputs.title} placeholder="Ex: My Post Title" onChange={(e) => {
                  setInputs((existing) => ({ ...existing, title: e.target.value }))
                }} />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="content">Content</label>
                <input disabled={isDisabled || postCreate.isLoading} required className="w-full max-w-lg" id="content" name="content" type="text" value={inputs.content} placeholder="Ex: Here is my message" onChange={(e) => {
                  setInputs((existing) => ({ ...existing, content: e.target.value }))
                }} />
              </div>
              <div>
                <button disabled={isDisabled || postCreate.isLoading} type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      )}
      {!user && (
        <p>
          <button type="button" onClick={() => loginWithRedirect()}>Login</button>
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
  const onClickDelete = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  // Render
  return (
    <div className="card group ring-4 ring-transparent hover:ring-zinc-400 hover:border-transparent  transition-all ease-in-out duration-200">
      {/* <div className="card-image">
        <img src="https://picsum.photos/seed/picsum/300/120" alt="Placeholder" />
      </div> */}
      <div className="card-header !border-b-0 !pb-0">
        <h3 className="card-title mb-0">{post.title}</h3>
      </div>
      <div className="card-body !border-b-0">
        <p className="mb-0">{post.content}</p>
      </div>
      {/* <div className="card-footer">
        <p className="mb-0">Here is the footer</p>
      </div> */}
      {onClick && !isDisabled ? <button onClick={onClickDelete} className="absolute group-hover:block hidden -top-4 -right-4 leading-8 px-3">&times;</button> : null}
    </div>
  );
};

// Page Component
// ========================================================
/**
 * 
 * @returns 
 */
const Home = () => {
  // State / Props
  // const { user, isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { user } = useAuth0();

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
    }
  });

  /**
   * 
   */
  const isLoading = postQuery.isLoading || postDelete.isLoading || postQuery.isFetching;

  // Render
  return (
    <>
      <main className="px-8 pt-8 pb-14">
        <h1>Create T3 ViteJS Auth0</h1>

        <hr />

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur perferendis dignissimos voluptatibus in quo odit officia voluptates animi dolor numquam, inventore, quae cumque ratione eveniet blanditiis libero sit et.</p>

        <AuthShowcase callback={() => {
          postQuery.refetch()
        }} isDisabled={isLoading} />

        <hr />

        <h2>Posts</h2>

        <div className="flex overflow-y-scroll mb-8">
          {postQuery.data ? (
            <div className="flex gap-4 p-8 bg-zinc-950/50 rounded-lg">
              {postQuery.data?.map((p) => {
                return <PostCard key={p.id} post={p} isDisabled={isLoading} onClick={user ? async (id) => {
                  try {
                    toast.promise(postDelete.mutateAsync(id), {
                      loading: 'Deleting Post...',
                      success: 'Post Deleted!',
                      error: 'Error Deleting Post',
                    });
                  } catch (error) {
                    console.error({ error });
                  }
                } : undefined} />;
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
              <td colSpan={3}>
                No results.
              </td>
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