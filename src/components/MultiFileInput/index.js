import React from "react";

const MultiFileInput = ({ allImages, setAllImages }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get all selected files
    setAllImages(files); // Store the File objects directly
  };

  return (
    <div>
      <label
        htmlFor="multiFileUpload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Images
      </label>
      <input
        id="multiFileUpload"
        type="file"
        multiple
        onChange={handleFileChange}
        className="mt-1 block w-full"
      />
    </div>
  );
};

export default MultiFileInput;
