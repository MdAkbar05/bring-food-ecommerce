import React from "react";

const StarRating = ({ stars, size }) => {
  const styles = {
    width: size + "px",
    hieght: size + "px",
    marginRight: size / 6 + "px",
    color: "red",
  };

  function Star({ number }) {
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <img src="/star-full.svg" style={styles} alt={number} />
    ) : stars >= halfNumber ? (
      <img src="/star-half.svg" style={styles} alt={number} />
    ) : (
      <img src="/star-empty.svg" style={styles} alt={number} />
    );
  }
  return (
    <div className="flex py-2">
      {[1, 2, 3, 4, 5].map((number) => (
        <Star key={number} number={number} />
      ))}
    </div>
  );
};
StarRating.defaultProps = {
  size: 18,
};
export default StarRating;
