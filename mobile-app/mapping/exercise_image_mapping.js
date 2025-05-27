// Exercise resimleri static import mapping
const EXERCISE_IMAGES_PATH = '../assets/images/exercises/';

const exerciseImages = {
  'upper arms': require(`${EXERCISE_IMAGES_PATH}upper arms.png`),
  'shoulder': require(`${EXERCISE_IMAGES_PATH}shoulder.png`),
  'chest': require(`${EXERCISE_IMAGES_PATH}chest.png`),
  'neck': require(`${EXERCISE_IMAGES_PATH}neck.png`),
  'lower legs': require(`${EXERCISE_IMAGES_PATH}lower legs.png`),
  'waist': require(`${EXERCISE_IMAGES_PATH}waist.png`),
  'upper legs': require(`${EXERCISE_IMAGES_PATH}upper legs.png`),
  'lower arms': require(`${EXERCISE_IMAGES_PATH}lower arms.png`),
  'cardio': require(`${EXERCISE_IMAGES_PATH}cardio.png`),
  'back': require(`${EXERCISE_IMAGES_PATH}back.png`),
};

export const getExerciseImage = (exerciseName) => {
  return exerciseImages[exerciseName] || null;
};

export default exerciseImages; 