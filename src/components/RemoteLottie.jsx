import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const RemoteLottie = ({ url, ...props }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setAnimationData);
  }, [url]);

  if (!animationData) return <div style={{height: 120}} />; // or a spinner

  return <Lottie animationData={animationData} {...props} />;
};

export default RemoteLottie; 