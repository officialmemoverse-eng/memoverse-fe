export const logger = {
  error: (msg: any, ...args: any[]) => console.error(msg, ...args),
  warn: (msg: any, ...args: any[]) => console.warn(msg, ...args),
  info: (msg: any, ...args: any[]) => console.log(msg, ...args),
  debug: (msg: any, ...args: any[]) => console.debug(msg, ...args),
};
