export declare class Deferred<T, E = unknown> {
  resolve: ((value: T | PromiseLike<T>) => void);
  reject: ((reason?: E) => void);
  readonly promise: Promise<T>;
  constructor();
  onfulfilled(handler: (value: T | PromiseLike<T>) => void): void;
  onrejected(handler: (reason?: E) => void): void;
  onfinally(handler: () => void): void;
  then(onfulfilled?: ((value: T | PromiseLike<T>) => void) | null, onrejected?: ((reason?: E) => void) | null): Promise<T>;
  catch(onrejected?: ((reason?: E) => void) | null): Promise<T>;
  finally(onfinally?: (() => void) | null): Promise<T>;
}
export default Deferred;
