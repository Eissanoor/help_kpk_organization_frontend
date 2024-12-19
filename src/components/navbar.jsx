import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 shadow-md">
    {/* Search Bar */}
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search something..."
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Notification and Profile */}
    <div className="flex items-center gap-4 ml-4">
      {/* Notification Icons */}
      <div className="relative flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <i className="fas fa-bell text-blue-500"></i>
        </div>
        <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5">
          21
        </span>
      </div>
      <div className="relative flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <i className="fas fa-comments text-blue-500"></i>
        </div>
        <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5">
          4
        </span>
      </div>
      <div className="relative flex items-center">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <i className="fas fa-cog text-red-500"></i>
        </div>
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
          3
        </span>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm text-gray-600">Hi, John</span>
      </div>
    </div>
  </div>
  );
};

export default Navbar;
