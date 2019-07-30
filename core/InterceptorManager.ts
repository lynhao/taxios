import { ResolvedFn, RejectdFn } from '../src/type'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectdFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectdFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    console.log(this.interceptors)
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}