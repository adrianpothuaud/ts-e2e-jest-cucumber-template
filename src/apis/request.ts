import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Wrap axios promise and return response event if the status code is not 2xx
 *
 * @param headers
 * @param method
 * @param payload
 * @param url
 * @returns response
 */
export const request = async ({
  headers,
  method,
  payload,
  url
}: {
  headers?: AxiosRequestConfig['headers'] | undefined
  method: 'delete' | 'get' | 'patch' | 'post' | 'put'
  payload?: AxiosRequestConfig['data'] | undefined
  url: string
}): Promise<AxiosResponse> => {
  return await new Promise((resolve, reject) => {
    const axiosConfig: AxiosRequestConfig = {}

    if (headers !== undefined && typeof headers === 'object') {
      axiosConfig.headers = headers
    }

    let axiosBase
    if (['delete', 'get'].includes(method)) {
      axiosBase = axios[method](url, axiosConfig)
    } else {
      axiosBase = axios[method](url, payload, axiosConfig)
    }

    axiosBase
      .then((axiosResponse) => {
        resolve(axiosResponse)
      })
      .catch((axiosError) => {
        if (axiosError.response !== undefined) {
          resolve(axiosError.response)
        } else {
          reject(axiosError)
        }
      })
  })
}
