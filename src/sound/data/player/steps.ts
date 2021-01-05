import _ from "lodash";

import Sound from "../../Sound";

export const step1 = new Sound("sounds/player/pl_step1.wav", 0.4);
export const step2 = new Sound("sounds/player/pl_step2.wav", 0.4);
export const step3 = new Sound("sounds/player/pl_step3.wav", 0.4);

const steps = [step1, step2, step3];

export const playRandomFootstep = () => {
  const sound = _.sample(steps);

  sound.play();
};

export default steps;
