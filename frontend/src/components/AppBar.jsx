function AppBar() {
  return (
    <div className="w-full h-16 flex items-center justify-between px-6
                    bg-blue-50 shadow-md border-b border-blue-200">
      
      <div className="text-xl font-bold text-blue-700">
        Paytm
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-blue-800">
          User Name
        </span>

        <div className="w-9 h-9 rounded-full bg-blue-600
                        flex items-center justify-center
                        text-white font-semibold">
          U
        </div>
      </div>
    </div>
  );
}

export default AppBar;
