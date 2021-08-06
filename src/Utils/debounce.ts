export const debounce = (func: () => void, delay: number) => {
  let debounceTimer: number;
  return () => {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context), delay);
  };
};
