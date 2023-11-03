import { ToastContainer } from 'react-toastify'

export const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        limit={1}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    </div>
  )
}
