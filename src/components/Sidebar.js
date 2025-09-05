export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Energy Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="text-blue-600 hover:underline">
              Home
            </a>
          </li>
          {/* Add other menu links here */}
        </ul>
      </nav>
    </aside>
  );
}
