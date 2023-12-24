import { createPostSlice } from './createPostSlice'

describe('createPostSlice reducer', () => {
  it('should handle setImage', () => {
    const initialState = {
      page: 0,
      images: [],
      croppedImages: [],
    }

    const action = {
      type: createPostSlice.actions.setImage.type,
      payload: { img: 'your_image_data' },
    }

    const newState = createPostSlice.reducer(initialState, action)

    expect(newState.images.length).toBe(1)
    expect(newState.croppedImages.length).toBe(1)

  })


})
