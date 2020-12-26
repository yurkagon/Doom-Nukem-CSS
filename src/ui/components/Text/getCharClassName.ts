const getCharClassName = (inputChar: string): string => {
  const char = inputChar.toLowerCase();

  switch (char) {
    case " ":
      return "space";
    case ".":
      return "dot";

    default:
      return char;
  }
};

export default getCharClassName;
