const Removed = ({message}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="removed">
        {message}
      </div>
    )
  }
  
  export default Removed