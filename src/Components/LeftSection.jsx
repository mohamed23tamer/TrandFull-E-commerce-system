import { useEffect, useState } from "react";

const imageURL = "http://localhost:3000/api/uploads/images/";

const LeftSection = ({ images }) => {
  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    if (images) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  return (
    <div className="w-[30%] mr-[30px] ">
      <div className="flex sticky top-0">
        <ul className="list-none mr-3">
          {images
            ? images.map((img, index) => {
                return (
                  <li
                    className="w-[50px] mb-2 border-solid border-black border rounded-md overflow-hidden cursor-pointer image-item"
                    key={index + 1}
                  >
                    <img
                      src={imageURL + img}
                      alt=""
                      onMouseOver={() => {
                        setCurrentImage(img);
                      }}
                    />
                  </li>
                );
              })
            : ""}
        </ul>

        <div className="w-full flex justify-center">
          <img
            className="max-h-96 overflow-hidden"
            src={imageURL + currentImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
