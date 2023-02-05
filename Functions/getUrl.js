import axios from 'axios'

const getUrl = async (file) => {
  try {
    const imageData = new FormData()
    imageData.set('key', '7ee6e3fa36e290c8d485eb6f25d910ee')

    imageData.append('image', file)
    const res = await axios.post(
      'https://api.imgbb.com/1/upload',

      imageData,
    )

    return res.data.data.display_url
  } catch (error) {
    return
  }
}

export default getUrl
