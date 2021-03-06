/** 入口文件 **/
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../src/type/index'
import xhr from './xhr'
import { buildURL, isAbsoluteUrl, combineURL } from '../example/helpers/url'
import { transformRequest, transformResponse } from '../example/helpers/datas'
import { processHeaders, flattenHeaders } from '../example/helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  }).catch(err => {
    if (err && err.response) {
      err.response = transformResponseData(err.response)
    }
    return Promise.reject(err)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // config.data = transformRequestData(config)
  config.headers = transformHeaders(config) // 这一步必须在transformRequest之前
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteUrl(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
