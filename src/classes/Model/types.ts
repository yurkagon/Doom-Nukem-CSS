export interface Transform {
  position: Position;
  rotation?: Position;
  scale?: Position;
}

export interface ModelConfig {
  name: string;
  data: string;
  position?: Position;
  rotation?: Position;
  scale?: Position;
}
