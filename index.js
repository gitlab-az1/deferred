"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Deferred = void 0;
class Deferred {
  #successHandlers = [];
  #rejectedHandlers = [];
  #finallyHandlers = [];
  resolve = () => void 0;
  reject = () => void 0;
  constructor() {
    this.promise = new Promise((resolve, reject) => [this.resolve, this.reject] = [resolve, reject]);
  }
  onfulfilled(handler) {
    if (typeof handler !== 'function') return;
    this.#successHandlers.push(handler);
  }
  onrejected(handler) {
    if (typeof handler !== 'function') return;
    this.#rejectedHandlers.push(handler);
  }
  onfinally(handler) {
    if (typeof handler !== 'function') return;
    this.#finallyHandlers.push(handler);
  }
  then(onfulfilled, onrejected) {
    this.#successHandlers.push(onfulfilled ?? (() => void 0));
    this.#rejectedHandlers.push(onrejected ?? (() => void 0));
    return this.promise.then(async __value_t => {
      return await Promise.all(this.#successHandlers.map(async handler => {
        try {
          const res = await handler(__value_t);
          return res;
        } catch (err) {
          return err;
        }
      }) // eslint-disable-line comma-dangle
      );
    }, async () => {
      return await Promise.all(this.#rejectedHandlers.map(async handler => {
        try {
          const res = await handler();
          return res;
        } catch (err) {
          return err;
        }
      }) // eslint-disable-line comma-dangle
      );
    } // eslint-disable-line comma-dangle
    );
  }

  catch(onrejected) {
    this.#rejectedHandlers.push(onrejected ?? (() => void 0));
    return this.promise.catch(async () => {
      return await Promise.all(this.#rejectedHandlers.map(async handler => {
        try {
          const res = await handler();
          return res;
        } catch (err) {
          return err;
        }
      }) // eslint-disable-line comma-dangle
      );
    });
  }

  finally(onfinally) {
    this.#finallyHandlers.push(onfinally ?? (() => void 0));
    this.promise.finally(async () => {
      return await Promise.all(this.#finallyHandlers.map(async handler => {
        try {
          const res = await handler();
          return res;
        } catch (err) {
          return err;
        }
      }) // eslint-disable-line comma-dangle
      );
    });

    return this.promise;
  }
}
exports.Deferred = Deferred;
var _default = exports.default = Deferred;
