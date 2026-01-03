import { Link } from "react-router-dom"

const Home = ({ user }) => {


  return (
    <main>
      {user ? (
        <>
          <h1>Welcome, {user.employee_username}</h1>

               
              <p>  <span>{user.name} </span> 
                 ,Thank you to use our website to post your flights, Lets people try
                nice airplane  to travel world. 
              </p>
        </>
      ) : (
        <>
        
          <h1>Welcome to Sifraty App, Where's to found your trip</h1>
          <p>Please sign in or create an account.</p>

          

        </>
        
      )}
         <Link to={'/flights/new'}> <button>Post new Flight +</button></Link>
         <Link to={'/flights'}> <button>Browes your Flight</button></Link>
    </main>
    
  )
  
}


export default Home
