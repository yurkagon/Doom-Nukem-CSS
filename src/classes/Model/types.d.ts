import { IPosition } from "../../types";

interface ITransform {
  position: IPosition;
  rotation?: IPosition;
  scale?: IPosition;
}

interface IModelConfig {
  name: string;
  data: string;
  position?: IPosition;
  rotation?: IPosition;
  scale?: IPosition;
}
