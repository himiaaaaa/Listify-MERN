/* eslint-disable no-undef */
import axios from 'axios'

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData()
  formData.append('file', uploadFile)
  formData.append('upload_preset', 'bloglist')

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload/`,
      formData
    )
    return response.data.secure_url
  } catch (error) {
    console.log(error)
  }
}