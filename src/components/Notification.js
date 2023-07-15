const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  //console.log("Hey idiot:", message)

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification