import React from "react";

function Notification({ showNotification }) {
  return (
    <div>
      {showNotification && (
        <div className="notification-container show">
          <p>You have already entered this letter</p>
        </div>
      )}
    </div>
  );
}

export default Notification;
