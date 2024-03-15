import React, { useState } from 'react';
import { Image } from 'cloudinary-react';


const Upload = () => {
  const [image, setImage] = useState('');

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'oskvfu3n'); // Replace 'your_upload_preset' with your Cloudinary upload preset name
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/disd40wdk/image/upload`, // Using provided cloud name 'disd40wdk'
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    setImage(data.secure_url);
    console.log(data.url);
  };

  return (
    
    <div>
      <input type="file" onChange={uploadImage} />
      {image && (
        <div>
          <Image cloudName="disd40wdk" publicId={image} /> {/* Using provided cloud name 'disd40wdk' */}
        </div>
      )}
    </div>
  );
};

export default Upload;
