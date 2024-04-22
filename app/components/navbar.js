function Navbar({ onSelect }) {
    return (
      <nav className="flex justify-center p-4 bg-gray-100">
        <button
          className="mx-2 px-4 py-2 border border-transparent rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => onSelect('local')}>
          Local Time
        </button>
        <button
          className="mx-2 px-4 py-2 border border-transparent rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => onSelect('world')}>
          World Time
        </button>
      </nav>
    );
  }

  export default Navbar;