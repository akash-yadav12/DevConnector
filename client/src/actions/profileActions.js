import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types'

// Get current profile 
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading)
  axios.get('/api/profile')
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })  
    })
    .catch(err => 
      dispatch({
        type:GET_PROFILE,
        payload: {}
      })
    )
}

// Profile laoding
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear Current Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}