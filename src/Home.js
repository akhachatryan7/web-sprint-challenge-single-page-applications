import { useNavigate } from "react-router-dom"



export default function Home() {
    
    const navigate= useNavigate()
   
    const routeToPizza = () => {
            console.log('clicked')
            navigate('pizza')
    }
  
    return (
      <div>
        <button  id="order-pizza" onClick={routeToPizza} className='md-button'>
          Build Your Own Pizza!
        </button>
      </div>
    )
  }