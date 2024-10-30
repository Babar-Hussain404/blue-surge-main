import React from 'react';

const Modal = ({ show, handleClose }) => {
    return (
        <>
            {show && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{ backgroundColor: '#092948', color: 'white',fontSize:'15px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title text-light">Cookies</h5>
                                <button style={{  color: '#fff', fontSize:'32px' }} type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Blue Surge uses cookies to improve its activities and provide quality service. Please click for detailed information and to access ASELSAN Websites Terms of Use, Privacy and Cookies Policy .</p>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                <button type="button" className="btn accept_cookie_btn" onClick={handleClose}>Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
