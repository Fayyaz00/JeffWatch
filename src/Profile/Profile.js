import { useState, useEffect } from 'react'
import usersService from '../services/users'
import RecentRatings from './RecentRatings'
import RatingHistogram from './RatingHistogram'
import GenreBubbleChart from './GenreBubbleChart'
import ClipLoader from 'react-spinners/ClipLoader'

const Profile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [specificRatings, setSpecificRatings] = useState(null)

  useEffect(() => {
    fetchUserData(user)
  }, [user])

  const fetchUserData = async (user) => {
    try {
      const result = await usersService.getUser(user)
      if (result.status === 200) {
        setUserData(result.data)
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const showSpecificRatings = (rating) => {
    const specificRatings = userData.ratings.filter(r => r.rating === rating)
    setSpecificRatings(<RecentRatings ratings={specificRatings} title={`${user}'s ${rating} star ratings`}/>)
  }

  return (
    <div className="profile-page">
      {(userData && userData.username) ? 
        <h1>{userData.username}</h1> :
        <h1>User not found</h1>
      }
      <ClipLoader 
          size='150px'
          css={{display: 'block', margin: '0 auto'}}
          loading={isLoading}
      />
      {userData && <RatingHistogram ratings={userData.ratings}  showSpecificRatings={showSpecificRatings} />}
      {specificRatings}
      {userData && <RecentRatings ratings={userData.ratings} title={`${user}'s recent ratings`}/>}
      {userData && <GenreBubbleChart ratings={userData.ratings} />}
    </div>
  )
}

export default Profile