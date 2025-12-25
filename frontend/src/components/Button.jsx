function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-[0.98]">
      {title}
    </button>
  );
}

export default Button;
