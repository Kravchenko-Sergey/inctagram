export const createFormData = (res: Uint8Array[]) => {
  const formData = new FormData()

  res.forEach(binaryData => {
    const blob = new Blob([binaryData], { type: 'image/jpeg' })

    formData.append(`file`, blob)
  })

  return formData
}
