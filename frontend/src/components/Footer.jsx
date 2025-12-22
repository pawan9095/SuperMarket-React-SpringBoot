export default function Footer() {
  return (
    <footer className="w-full bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* LEFT */}
        <p className="text-sm">
          © {new Date().getFullYear()} SuperMarket. All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex gap-4 text-sm">
          <span className="cursor-pointer hover:underline">Privacy</span>
          <span className="cursor-pointer hover:underline">Terms</span>
          <span className="cursor-pointer hover:underline">Contact</span>
        </div>
      </div>
    </footer>
  );
}
