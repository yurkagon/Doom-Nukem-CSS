import _ from "lodash";

import Sound from "../../Sound";

import step1Url from "./step1.wav";
import step2Url from "./step2.wav";
import step3Url from "./step3.wav";

const step1 = new Sound(step1Url, 0.4);
const step2 = new Sound(step2Url, 0.4);
const step3 = new Sound(step3Url, 0.4);

const steps = [step1, step2, step3];

const playRandomFootstep = () => {
  const sound = _.sample(steps);

  sound.play();
};

export {
  steps as default,
  step1,
  step2,
  step3,
  playRandomFootstep,
  step1Url,
  step2Url,
  step3Url
};
