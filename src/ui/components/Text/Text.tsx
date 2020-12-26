import React, { FC, memo } from "react";

import Char from "./Char";

import { TextProps } from "./types";

import "./style.scss";

const Text: FC<TextProps> = ({ children: text, onClick }) => {
  const array = text.split("");

  return (
    <div className="text-block" onClick={onClick}>
      {array.map((char, index) => (
        <Char key={index + char}>{char}</Char>
      ))}
    </div>
  );
};

export default memo(Text);
