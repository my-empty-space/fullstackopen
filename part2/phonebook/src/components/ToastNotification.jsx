const ToastNotification = ({ data }) => {
  const { message, status } = data
  if (message === undefined) return null

  const notificationStyle = {
    position: "absolute",
    top: 20,
    right: 10,
    maxWidth: 400,
    minWidth: 200,
    background: "#eee",
    padding: "14px 18px",
    color: "#333",
    borderBottom: "5px solid #555",
    lineHeight: 1.4
  }
  if (status === "success") notificationStyle.borderBottom = "5px solid #68e4b4"
  if (status === "warn") notificationStyle.borderBottom = "5px solid #f5da82"
  if (status === "error") notificationStyle.borderBottom = "5px solid #f04c4c"

  return (
    <p style={notificationStyle}>
      {message}
    </p>
  )
}

export default ToastNotification