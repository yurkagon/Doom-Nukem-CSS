export interface ButtonData {
  text: string;
  onClick: () => void;
}

export interface Props {
  data: ButtonData[];
}
