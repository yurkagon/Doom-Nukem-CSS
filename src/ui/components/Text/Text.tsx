import React, { FC, memo } from "react";
import cn from "classnames";

import Char from "./Char";

import { TextProps } from "./types";

import "./style.scss";

const Text: FC<TextProps> = ({ children: text, onClick, className }) => {
  const array = text.toString().split("");

  return (
    <div className={cn("text-block", className)} onClick={onClick}>
      {array.map((char: string, index: number) => (
        <Char key={index + char}>{char}</Char>
      ))}
    </div>
  );
};

export default memo(Text);
