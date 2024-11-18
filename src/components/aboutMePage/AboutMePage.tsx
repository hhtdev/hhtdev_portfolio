import React from "react";

interface MeProps {
  display: boolean;
}

export const AboutMePage: React.FC<MeProps> = (MeProps) => {
  return (
    MeProps.display ? (
      <div>
        <h1>Hi, I'm a React component!</h1>
      </div>
    ) : null
  );
};