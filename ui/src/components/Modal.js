import React from 'react';
export default ({ handleClose, show, children}) => {
    const showHide = show ? "c-modal d-block" : "c-modal d-none";

    return (
        <div className={showHide}>
            <div className="c-modal__body">
                {children}
                <button onClick={handleClose}>close</button>
            </div>
        </div>
    )
}