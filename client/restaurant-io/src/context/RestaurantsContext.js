import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "./UserContext";


export const RestaurantsContext = createContext()

export default function RestaurantsProvider({children}){
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [onchange, setOnchange] = useState(false)
    const [currentRestaurant, setCurrentRestaurant] = useState({})
    const {apiEndpoint} = useContext(UserContext)
    const navigate= useNavigate()

    const authToken = sessionStorage.getItem('authToken')

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/restaurants`)
          .then((res) => res.json())
          .then((data) => {
            setRestaurants(data)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching data:', error)
            setIsLoading(false)
          })
    },[onchange, apiEndpoint])


    function addRestaurant(restaurant){
        fetch(`http://127.0.0.1:5555/restaurants`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken && authToken}`,
          },
          body: JSON.stringify({ ...restaurant }),
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Restaurant has been registered successfully.',
              showConfirmButton: false,
              timer: 1500,
            })
            navigate('/restaurants')
            setOnchange(!onchange)
          }
        })
    }
    function editRestaurant(restaurant){
        fetch(`http://127.0.0.1:5555/restaurants/${currentRestaurant.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken && authToken}`,
          },
          body: JSON.stringify({ ...restaurant }),
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Changes have been saved.',
              showConfirmButton: false,
              timer: 1500,
            })
            navigate(`/restaurants/${currentRestaurant.id}`)
            setOnchange(!onchange)
          }
        })
    }
    function editRestaurantCapacity(capacity){
        fetch(`http://127.0.0.1:5555/restaurants/${currentRestaurant.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...capacity}),
        }).then((res) => {
          if (res.ok) {
            console.log("success");
            setOnchange(!onchange)
          }
        })
    }

    function deleteRestaurant(){
         fetch(`http://127.0.0.1:5555/restaurants/${currentRestaurant.id}`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${authToken}`,
           },
         }).then((data) => {
           console.log('Success:', data)
           Swal.fire({
             title: 'Deleted!',
             text: 'Your restaurant has been deleted.',
             icon: 'success',
           }).then(() => {
            setOnchange(!onchange)
             navigate('/')
           })
         })
    }

    const contextData = {
        restaurants,
        addRestaurant,
        isLoading, 
        apiEndpoint,
        editRestaurant,
        currentRestaurant,
        setCurrentRestaurant,
        deleteRestaurant,
        editRestaurantCapacity
    }

    return (
        <RestaurantsContext.Provider value={contextData} >
            {children}
        </RestaurantsContext.Provider>
    )

}