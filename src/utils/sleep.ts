const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => {
    const timerId = setTimeout(() => {
      clearTimeout(timerId);

      resolve();
    }, ms);
  });

export default sleep;
