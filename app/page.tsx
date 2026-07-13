import { signIn, signOut, auth } from "@/auth";
import CollectionList from "@/app/component/CollectionList";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-screen grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6 px-8">
        {/* Left images */}
        <div className="hidden sm:flex flex-col items-end gap-8">
          <img src="https://antavo.s3.eu-west-1.amazonaws.com/brands/3030/media/1770297959-wqVXt.jpeg" alt="" className="w-40 lg:w-52 rotate-[-8deg] opacity-80 rounded-xl shadow-md" />
          <img src="https://antavo.s3.eu-west-1.amazonaws.com/brands/3030/media/1770116485-usoYN.png" alt="" className="w-36 lg:w-44 rotate-[6deg] opacity-80 rounded-xl shadow-md" />
        </div>

        {/* Sign-in content */}
        <div className="relative flex flex-col items-center justify-center text-center py-12 px-6 sm:mx-12 bg-[#FBF6EF] shadow-md border border-[#4A3B2E]/20 rounded-3xl"
          style={{
            backgroundImage: "repeating-conic-gradient(from 45deg, #d4a98135 0% 25%, transparent 25% 50%)",
            backgroundSize: "69px 69px",
          }}
        >
          <div className="absolute left-2 top-1 bottom-1 w-0.5" style={{ background: "repeating-linear-gradient(to bottom, #C4956A66 0px, #C4956A66 8px, transparent 8px, transparent 16px)" }} />
          <div className="absolute right-2 top-1 bottom-1 w-0.5" style={{ background: "repeating-linear-gradient(to bottom, #C4956A66 0px, #C4956A66 8px, transparent 8px, transparent 16px)" }} />
          <img className="mx-auto mb-4" src="https://cdn11.bigcommerce.com/s-23s5gfmhr7/stencil/1b485be0-57bd-013f-cfb2-7a11a811054c/e/833c2470-4c9c-013f-1dfc-1ee65f33f15f/img/jellycat-account.svg" alt="Jellycat Logo" />
          <h1 className="font-[family-name:var(--font-display)] text-6xl sm:text-7xl font-bold text-[#4A3B2E] mb-1">
            Jellycat Journeys
          </h1>
          <p className="text-[#4A3B2E]/75 mb-8">Show off your collection and find new favorites!</p>
          <form action={async () => { "use server"; await signIn("google"); }}>
            <button
              type="submit"
              className="text-sm px-6 py-3 rounded-full border-2 border-[#4A3B2E]/75 bg-[#FFFFFF] text-[#4A3B2E]/90 hover:bg-[#8B6F52]/90 transition"
            >
              Sign in with Google
            </button>
          </form>
        </div>

        {/* Right images */}
        <div className="hidden sm:flex flex-col items-start">
          <img src="https://antavo.s3.eu-west-1.amazonaws.com/brands/3030/media/1782980322-xzIUr.jpeg" alt="" className="w-40 lg:w-52 rotate-[8deg] opacity-80 rounded-xl shadow-md" />
          <img src="https://antavo.s3.eu-west-1.amazonaws.com/brands/3030/media/1778858040-CVG0M.png" alt="" className="w-36 lg:w-44 mt-8 rotate-[-6deg] opacity-80 rounded-xl shadow-md" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#FFFFFF] border border-[#4A3B2E]/20 shadow-md px-6 py-6">
        <div>
          <div className="flex items-center gap-1">
            <img src="https://cdn11.bigcommerce.com/s-23s5gfmhr7/stencil/1b485be0-57bd-013f-cfb2-7a11a811054c/e/833c2470-4c9c-013f-1dfc-1ee65f33f15f/img/jellycat-account.svg" alt="Jellycat Logo" />

            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-[#4A3B2E]">
              Jellycat Journeys
            </h1>
          </div>
          <p className="text-sm text-[#4A3B2E]/60 mt-1">Your personal collection of Jellycat adventures.</p>
        </div>
        <form className="flex flex-col items-end" action={async () => { "use server"; await signOut(); }}>
          <button
            type="submit"
            className="text-sm text-[#4A3B2E] px-4 py-2 rounded-full border border-[#4A3B2E]/20 hover:bg-[#4A3B2E]/5 transition"
          >
            Sign out
          </button>
          <p className="text-sm text-[#4A3B2E]/60 mt-2">Signed in as {session.user?.email}</p>
        </form>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <CollectionList />
      </div>
    </main>
  );
}