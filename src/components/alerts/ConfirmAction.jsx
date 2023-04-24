import React from 'react'

const ConfirmAction = (props) => {
  return (<>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Are you sure to delete your account?</h3>
          <button className="btn py-4">DELETE ACCOUNT</button>
        </label>
      </label>
    </>
  )
}

export default ConfirmAction