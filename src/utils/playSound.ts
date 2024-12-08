export const playSound = (sound: string) => {
    const audio = new Audio(`../../public/sounds/${sound}`);
    audio.play();
  };
  