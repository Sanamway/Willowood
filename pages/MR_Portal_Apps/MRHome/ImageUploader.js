import { useState } from "react";
import Image from "next/image";
const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <img
          src={image}
          className=" rounded  bg-gray-200 w-72 h-60"
          alt="img"
          onClick={() => {
            // setShowCamera(true);
            // setImgType("Old");
          }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
