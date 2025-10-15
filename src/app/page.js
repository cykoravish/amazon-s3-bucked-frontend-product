import Image from "next/image";
import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) {
    console.log("Error loading products");
  }
  const products = await res.json();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">
              Premium Collection
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent animate-gradient">
            Featured Products
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed px-4">
            Discover our curated collection of premium tech products
          </p>

          <Link href="/create">
            <button className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">Create Product</span>
              <div className="absolute inset-0 -z-10 bg-emerald-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-800 hover:border-emerald-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-500 rounded-2xl sm:rounded-3xl" />

              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

              <div className="relative">
                <div className="relative h-56 sm:h-64 lg:h-80 overflow-hidden bg-gray-950/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  <Image
                    src={`${process.env.NEXT_PUBLIC_AMAZON_CDN_URL}/${product.filename}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    priority={product.id <= 3}
                  />
                </div>

                <div className="relative p-5 sm:p-6 lg:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                        {product.price} Rs
                      </span>
                    </div>

                    <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 rounded-lg transition-all duration-300 text-sm font-medium group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20">
              <Plus className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No Products Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start by creating your first product
            </p>
            <Link href="/create">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105">
                Create Product
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
