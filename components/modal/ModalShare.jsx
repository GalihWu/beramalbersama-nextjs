import React, { useState } from "react";
import {
  FaCopy,
  FaFacebook,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Toastr from "@/components/ui/toastr";

export const ModalShare = ({
  closeModalShare,
  show,
  shareUrl,
  whatsappMessage,
}) => {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowToast(true);
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
      });
  };
  return (
    <>
      {showToast && (
        <Toastr
          message="Disalin ke Clipboard"
          onClose={() => setShowToast(false)}
        />
      )}

      <div
        className={`modal modal-share fade ${show ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bagikan Program</h5>
              <button
                type="button"
                className="btn button-icon button-close"
                onClick={closeModalShare}
              >
                <FaTimes color="grey" />
              </button>
            </div>
            <div className="modal-body">
              <div className="share-box">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  className="btn button-shared-social fbook"
                >
                  <FaFacebook />
                  {/* <i className="fab fa-facebook-f"></i> */}
                </a>
                <p>Facebook</p>
              </div>
              <div className="share-box">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                  className="btn button-shared-social twit"
                >
                  <FaTwitter />
                </a>
                <p>Twitter</p>
              </div>
              <div className="share-box">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
                  className="btn button-shared-social wa"
                >
                  <FaWhatsapp />
                </a>
                <p>Whatsapp</p>
              </div>
              <div className="share-box">
                <button
                  className="btn button-shared-social"
                  onClick={() => copyToClipboard(shareUrl)}
                >
                  <FaCopy />
                </button>
                <p>Salin URL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
