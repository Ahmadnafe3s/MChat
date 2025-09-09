const debounce = <T extends (...args: any[]) => any>(Fn: T, time: number) => {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      Fn(...args);
    }, time);
  };
};

export default debounce;
