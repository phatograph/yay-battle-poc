import * as __axios from 'axios'
import Cookies from 'js-cookie'
import {get, entries, nth, mapValues, keyBy, filter} from 'lodash'

import en from '@locales/en.yml'
import ja from '@locales/ja.yml'

const locales = {
  en,
  ja,
}

export const COOKIE_ACCESS_TOKEN = 'sdds_cookie_access_token'
export const COOKIE_COMPANY = 'sdds_cookie_company'

export const _t = (currentLocale: string | undefined) => {
  return (key: string, args = {}, defaultValue?: string) => {
    const _key = `${currentLocale}.${key}`

    let text = get(locales, _key, defaultValue ?? _key)

    try {
      const argsEntries = entries(args)

      if (argsEntries.length) {
        text = argsEntries.reduce((result, current) => {
          const pattern = new RegExp(`%{${nth(current, 0)}}`, 'g')

          return result.replace(pattern, nth(current, 1)?.toString?.() || '')
        }, text)
      }

      return text
    } catch (e) {
      console.log(e)
      return text
    }
  }
}

// <input type="text" name="publisher_name" value="a" />
// <input type="text" name="purchaser_name" value="b" />
// => {publisher_name: "a", purchaser_name: "b"}
export const formInputsToObject = ({
  elements,
}: {
  elements: HTMLFormControlsCollection
}) => {
  return mapValues(
    keyBy(
      filter(elements, (x) => get(x, 'name')).map((x) => ({
        name: get(x, 'name'),
        value: get(x, 'value'),
      })),
      'name'
    ),
    'value'
  )
}

/////////////////
//
// Axios
//
/////////////////

const axiosConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

// Some of the headers need to be fresh values
// by the time of the call. So we'll just
// slap in said headers for every Axios call.
const getAxiosFreshConfig = () => {
  return {
    // 'x-href': typeof window != 'undefined' ? window.location.href : null,
  }
}

const axiosGenerator = (
  axiosBase: __axios.AxiosInstance,
  options: {cookieKey?: string} = {}
) => {
  const _axios = axiosBase
  const {cookieKey} = options

  return {
    // The 3rd `token` param here is explicitly provided
    // from `getServerSideProps`.
    get: async (url: string, data?: any, token?: string, csv?: boolean) => {
      return await _axios.get(url, {
        params: data,
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Bearer ${
                  token ? token : Cookies.get(cookieKey)
                }`,
                'X-Referer': '/',
                'X-CompanyID': Cookies.get(COOKIE_COMPANY),
              }
            : {}),
          ...(csv
            ? {
                Accept: 'text/csv',
                'Content-Type': 'text/csv',
              }
            : {}),
        },
      })
    },

    post: async (url: string, data?: any) => {
      return await _axios.post(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Bearer ${Cookies.get(cookieKey)}`,
                'X-Referer': '/',
                'X-CompanyID': Cookies.get(COOKIE_COMPANY),
              }
            : {}),
        },
      })
    },

    patch: async (url: string, data?: any) => {
      return await _axios.patch(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Bearer ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },

    put: async (url: string, data?: any) => {
      return await _axios.put(url, data, {
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Bearer ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },

    delete: async (url: string, data?: any) => {
      return await _axios.delete(url, {
        data,
        headers: {
          ...getAxiosFreshConfig(),
          ...(cookieKey
            ? {
                Authorization: `Bearer ${Cookies.get(cookieKey)}`,
              }
            : {}),
        },
      })
    },
  }
}

export const axiosSelf = axiosGenerator(__axios.default.create(axiosConfig))

export const BASE_URL = 'https://chizo.azurewebsites.net'

export const axiosAzure = axiosGenerator(
  __axios.default.create({
    ...axiosConfig,
    baseURL: BASE_URL,
  }),
  {
    cookieKey: COOKIE_ACCESS_TOKEN,
  }
)
