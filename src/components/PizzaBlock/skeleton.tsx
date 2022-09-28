import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton:React.FC = (props) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="137" r="125" />
    <rect x="-1" y="282" rx="16" ry="16" width="280" height="17" />
    <rect x="0" y="335" rx="10" ry="10" width="273" height="73" />
    <rect x="3" y="430" rx="12" ry="12" width="95" height="30" />
    <rect x="119" y="423" rx="21" ry="21" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
