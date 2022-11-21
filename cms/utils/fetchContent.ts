import fetch from 'isomorphic-unfetch'

export const fetchContentById = (context?: any) => {
  return fetch(
    `https://${context?.query?.api}/content/id/${context?.query?.content}?depth=all&format=inlined`
  )
    .then((resp) => {
      return resp.json()
    })
    .then((body) => {
      return body.content
    })
}

export const fetchContentByKey = (context?: any) => {
  return fetch(
    `https://${context?.query?.api}/content/key/${context?.query?.content}?depth=all&format=inlined`
  )
    .then((resp) => {
      return resp.json()
    })
    .then((body) => {
      return body.content
    })
}
