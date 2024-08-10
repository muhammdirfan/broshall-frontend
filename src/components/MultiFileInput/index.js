"use client";

import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

const MultiFileInput = () => {
  const [AllImages, setAllImages] = useState();
  console.log("AllImages", AllImages);
  return (
    <div>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput
        id="multiple-file-upload"
        multiple
        helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
        onChange={(e) => setAllImages(e)}
      />
    </div>
  );
};

export default MultiFileInput;
