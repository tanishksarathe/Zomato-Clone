import React from "react";

const InsidePhotos = ({ header }) => {
  const restaurantPics = header?.restaurantImages;

  return (
    <>
      <div>
        <div className="flex flex-wrap gap-4">
          {header?.menu.map((item) =>
            item?.image?.map((i, idx) => (
              <img
                key={idx}
                src={i?.url}
                alt={header?.restaurantName}
                className={`${idx % 2 == 0 ? "h-50 w-50" : "h-50 w-80"}`}
              />
            )),
          )}
          {restaurantPics.map((item, idx) => (
            <img
              key={idx}
              src={item?.url}
              alt={header?.restaurantName}
              className={`${idx % 2 == 0 ? "h-50 w-50" : "h-50 w-80"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InsidePhotos;
