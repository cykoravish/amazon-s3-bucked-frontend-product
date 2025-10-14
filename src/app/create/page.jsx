"use client";

import React, { useState } from "react";
import { Upload, DollarSign, Package, FileText } from "lucide-react";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [filename, setFilename] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      const mimeType = file.type.split("/")[1];

      const res = await fetch("http://localhost:4000/api/get-presigned-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mime: mimeType }),
      });
      if (!res.ok) {
        console.log("error in getting presigned url");
        return;
      }
      const data = await res.json();

      setFilename(data.finalName);

      const res2 = await fetch(data.url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!res2.ok) {
        console.log("error in assigning image to presign url");
        return;
      }
      console.log("success");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, filename }),
    });

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    alert("Product uploaded successfully!");

    // Reset form
    setFormData({ name: "", description: "", price: "" });
    setImage(null);
    setFilename("");
    setImagePreview(null);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/10 rounded-2xl mb-4 sm:mb-6 ring-2 ring-emerald-500/20">
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
            Upload Product
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Add your product details to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-emerald-500/10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center text-sm font-medium text-gray-200 mb-2"
              >
                <Package className="w-4 h-4 mr-2 text-emerald-500" />
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
                className="w-full px-4 py-3 sm:py-3.5 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="flex items-center text-sm font-medium text-gray-200 mb-2"
              >
                <FileText className="w-4 h-4 mr-2 text-emerald-500" />
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
                className="w-full px-4 py-3 sm:py-3.5 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-500 resize-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="flex items-center text-sm font-medium text-gray-200 mb-2"
              >
                <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
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
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="flex items-center text-sm font-medium text-gray-200 mb-2"
              >
                <Upload className="w-4 h-4 mr-2 text-emerald-500" />
                Product Image
              </label>
              {imagePreview ? (
                <div className="relative group">
                  <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-gray-900/50 border-2 border-gray-600">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFileName("");
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <label
                    htmlFor="image"
                    className="absolute bottom-3 right-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg cursor-pointer transition-all duration-200 group-hover:opacity-100 transform hover:scale-105"
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
                <div className="relative">
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
                    className="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-10 bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer transition-all duration-200 hover:border-emerald-500 hover:bg-gray-900/70 group"
                  >
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mb-3 group-hover:text-emerald-500 transition-colors duration-200" />
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 text-center">
                      Click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
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
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
          By uploading, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
}
