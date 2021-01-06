const getCharClassName = (inputChar: string): string => {
  const char = inputChar.toLowerCase();

  switch (char) {
    case "1":
      return "one";
    case "2":
      return "two";
    case "3":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "6":
      return "six";
    case "7":
      return "seven";
    case "8":
      return "eight";
    case "9":
      return "nine";
    case "0":
      return "zero";
    case " ":
      return "space";
    case ".":
      return "dot";
    case "!":
      return "exclamation_mark";

    default:
      return char;
  }
};

export default getCharClassName;
