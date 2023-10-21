import { useState } from "react";

const AvatarDisplay = ({ ticket }) => {
  console.log(ticket.avatar);

  const [imageSrc, setImageSrc] = useState(ticket.avatar);

  const handleImageError = () => {
    // Handle the image error here, e.g., by setting the default image URL
    setImageSrc(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };

  return (
    <div className="avatar-container">
      <div className="img-holder">
        <img
           src={imageSrc}
           onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default AvatarDisplay;
