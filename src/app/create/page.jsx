"use client"

import { useState } from "react"
import { Upload, DollarSign, Package, FileText, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  })
  const [filename, setFilename] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)

      const mimeType = file.type.split("/")[1]

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-presigned-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mime: mimeType }),
      })
      if (!res.ok) {
        console.log("error in getting presigned url")
        return
      }
      const data = await res.json()

      setFilename(data.finalName)

      const res2 = await fetch(data.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!res2.ok) {
        console.log("error in assigning image to presign url")
        return
      }
      console.log("success")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, filename }),
    })

    if (!res.ok) {
      alert("Failed to create product")
      return
    }

    alert("Product uploaded successfully!")

    // Reset form
    setFormData({ name: "", description: "", price: "" })
    setImage(null)
    setFilename("")
    setImagePreview(null)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950/20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="w-full max-w-2xl">
          <Link href="/">
            <button className="group mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/50 text-gray-400 hover:text-emerald-400 rounded-lg transition-all duration-300 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Products</span>
            </button>
          </Link>

          <div className="text-center mb-8 sm:mb-10 lg:mb-12 relative">
            {/* Animated gradient background orb */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-full h-full max-w-md max-h-64 bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-600/20 rounded-full blur-3xl animate-gradient opacity-50" />
            </div>

            {/* Icon with enhanced glow effects */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-emerald-400/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-3xl blur-3xl animate-pulse delay-500" />
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-[60px] animate-pulse delay-1000" />

              <div className="relative bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-emerald-600/30 rounded-3xl ring-2 ring-emerald-500/40 backdrop-blur-xl flex items-center justify-center w-full h-full shadow-2xl shadow-emerald-500/30 animate-gradient">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-3xl" />
                <Package className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            {/* Title with enhanced gradient and glow */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] leading-tight">
              Upload Product
            </h1>

            {/* Subtitle with better contrast */}
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg px-4 max-w-xl mx-auto leading-relaxed">
              Add your product details and showcase it to the world
            </p>

            {/* Decorative line */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500/50" />
              <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500/50" />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl sm:rounded-3xl opacity-20 group-hover:opacity-30 blur transition-all duration-500" />

            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 hover:border-emerald-500/30 p-6 sm:p-8 lg:p-10 transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-2 border border-emerald-500/20">
                      <Package className="w-4 h-4 text-emerald-400" />
                    </div>
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-950/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50 focus:shadow-lg focus:shadow-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-2 border border-emerald-500/20">
                      <FileText className="w-4 h-4 text-emerald-400" />
                    </div>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your product in detail"
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-950/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50 resize-none focus:shadow-lg focus:shadow-emerald-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-2 border border-emerald-500/20">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-lg font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-950/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-emerald-500/50 focus:shadow-lg focus:shadow-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="flex items-center text-sm font-medium text-gray-200 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-2 border border-emerald-500/20">
                      <Upload className="w-4 h-4 text-emerald-400" />
                    </div>
                    Product Image
                  </label>
                  {imagePreview ? (
                    <div className="relative group/image">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl opacity-0 group-hover/image:opacity-30 blur transition-all duration-300" />

                      <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gray-950/50 border-2 border-gray-700 group-hover/image:border-emerald-500/50 transition-all duration-300">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null)
                          setFilename("")
                          setFormData((prev) => ({ ...prev, image: null }))
                        }}
                        className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-200 opacity-0 group-hover/image:opacity-100 transform hover:scale-110 backdrop-blur-sm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <label
                        htmlFor="image"
                        className="absolute bottom-3 right-3 px-4 py-2 bg-emerald-500/90 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg cursor-pointer transition-all duration-200 opacity-0 group-hover/image:opacity-100 transform hover:scale-105 backdrop-blur-sm"
                      >
                        Change Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative group/upload">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        required
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12 bg-gray-950/50 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:bg-gray-950/70 group-hover/upload:shadow-lg group-hover/upload:shadow-emerald-500/10"
                      >
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl opacity-0 group-hover/upload:opacity-100 transition-opacity duration-300" />
                          <Upload className="relative w-10 h-10 sm:w-12 sm:h-12 text-gray-500 group-hover/upload:text-emerald-400 transition-colors duration-300" />
                        </div>
                        <p className="text-sm sm:text-base text-gray-400 group-hover/upload:text-gray-300 transition-colors duration-300 text-center font-medium">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Upload Product"
                    )}
                  </span>
                  <div className="absolute inset-0 -z-10 bg-emerald-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
            By uploading, you agree to our{" "}
            <span className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer">
              terms and conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
