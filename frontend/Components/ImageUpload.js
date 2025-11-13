import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageUploader = ({ formData, setFormData , isEdit }) => {
  const fileInputRef = useRef(null);
  const [duplicateImages, setDuplicateImages] = useState([]);

  // Compress image utility
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                })
              );
            },
            "image/jpeg",
            0.8
          );
        };
      };
    });
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    const newImages = [];
    const currentImages = formData.images || [];

    for (const [index, file] of files.entries()) {
      if (file.type.startsWith("image/")) {
        const compressedImage = await compressImage(file);

        const imageData = {
          id: Date.now() + Math.random() + index,
          file: compressedImage,
          previewUrl: URL.createObjectURL(compressedImage),
          category: "Others",
          name: file.name,
          size: file.size,
          isCover: currentImages.length === 0 && index === 0,
          isDuplicate: false,
        };

        // Check for duplicates
        const duplicate = currentImages.some(
          (img) => img.name === file.name && img.size === file.size
        );

        if (duplicate) {
          imageData.isDuplicate = true;
          setDuplicateImages((prev) => [...prev, imageData]);
        }

        newImages.push(imageData);
      }
    }

    // Update formData with all images
    const updatedImages = [
      ...currentImages,
      ...newImages.filter((img) => !img.isDuplicate),
    ];

    // Ensure first image is cover
    const normalizedImages = updatedImages.map((img, idx) => ({
      ...img,
      isCover: idx === 0,
    }));

    setFormData({ ...formData, images: normalizedImages });
  };

  // Remove individual image
  const handleRemoveImage = (index) => {
    const currentImages = formData.images || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);

    // Re-assign cover if needed
    const normalizedImages = updatedImages.map((img, idx) => ({
      ...img,
      isCover: idx === 0,
    }));

    setFormData({ ...formData, images: normalizedImages });
  };

  // Trigger upload dialog
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const images = formData.images || [];
  // console.log("images inside the form data" , images);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Images <span className="text-red-500">*</span>
      </label>

      {/* Upload Box */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleUploadClick}
      >
        <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-sm text-gray-600 font-medium mb-1">
          Drag & Drop or Click to Upload
        </p>
        <p className="text-xs text-gray-500">
          Supports: JPG, PNG, GIF (Max 10MB per file)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Duplicate Warning */}
      {duplicateImages.length > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {duplicateImages.length} duplicate image(s) were skipped
          </p>
        </div>
      )}

      {/* Horizontal Image Preview Section */}
      {images.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            {images.length} image(s) uploaded
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group flex-shrink-0 w-28 h-28 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                {image.isCover && (
                  <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-md z-10">
                    Cover
                  </span>
                )}
                <img
                  src={isEdit && image.url ? image.url :image.previewUrl}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 hover:text-red-700 shadow-lg hover:shadow-xl transition-all"
                  title="Remove image"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;