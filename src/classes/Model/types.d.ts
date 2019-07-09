import { iPosition } from "../../types";

interface ITransform {
  position: iPosition;
  rotation?: iPosition;
  scale?: iPosition;
}

interface IModelConfig {
  name: string;
  data: string;
  position?: iPosition;
  rotation?: iPosition;
  scale?: iPosition;
}
