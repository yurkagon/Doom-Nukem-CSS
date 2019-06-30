import SceneController from './SceneController';

class Scene extends SceneController {
  private static instance: Scene;

  public static getInstance(): Scene {
    if (Scene.instance) {
      return Scene.instance;
    } else {
      Scene.instance = new Scene();

      return Scene.instance;
    }
  }
}

export default Scene;
