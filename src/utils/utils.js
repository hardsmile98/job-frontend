export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const clearnTag = (html) => {
  return html
    .replace(/<\/?b[^>]*>/g, '')
    .replace(/<\/?span[^>]*>/g, '')
    .replace(/<\/?i[^>]*>/g, '')
    .replace(/<\/?ul[^>]*>/g, '')
    .replace(/<\/?p[^>]*>/g, ' ')
    .replace(/<\/?li[^>]*>/g, ' ')
    .replace(/&nbsp;/g, '')
}

export const limitStr = (str, n, symb) => {
  if (!n && symb) return str
  symb = symb || '...'
  if (str !== '') {
    n = n + 1
  }
  return str.substr(0, n) + symb
}

export async function uploadImage(file) {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'r5owq9en')
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dnuwke5no/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const { secure_url } = await response.json()
    return secure_url
  } catch (e) {}
}
