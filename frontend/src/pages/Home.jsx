import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24 px-4 md:px-6"> {/* Reduced padding-top */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 mt-8">
            Welcome to SuperMarket!
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Your one-stop shop for everything
          </p>
          
          {/* Sample content to test scrolling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md p-6 border">
                <h3 className="text-xl font-semibold mb-3">Product {item}</h3>
                <p className="text-gray-600 mb-4">Description of product {item}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Featured Categories</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Grocery', 'Mobiles'].map((cat) => (
                <div key={cat} className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}