import jwcat from './jwcat.jpg'

const NotFound = () => {


  return (
    <div style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>
      <img src={jwcat} alt="page not found" width="600" height="600" />
      <h2 className="title center">Page Not Found</h2>
    </div>
  )
}

export default NotFound