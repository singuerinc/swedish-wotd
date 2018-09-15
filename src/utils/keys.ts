const onSpacePress = (callback: () => void) => (e: KeyboardEvent) => {
  if (e.keyCode === 32) {
    callback();
    return true;
  } else {
    return false;
  }
};

export { onSpacePress };
