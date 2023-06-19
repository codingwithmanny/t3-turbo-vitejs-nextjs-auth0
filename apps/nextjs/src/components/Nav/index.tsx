// Imports
// ========================================================
import Link from "next/link";

// Component
// ========================================================
const Nav = () => {
  return <nav className="bg-zinc-950/60">
    <div className="px-8 py-6 flex justify-between">
      <Link href="/" className="no-underline font-medium"><span>Create T3 App Turbo</span></Link>
      <ul className="flex space-x-4 mb-0">
        <li><Link className="no-underline" href="/">NextJS Pages</Link></li>
        <li><Link className="no-underline" href="http://localhost:5173">ViteJS</Link></li>
      </ul>
    </div>

  </nav>
};

// Exports
// ========================================================
export default Nav;