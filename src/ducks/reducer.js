const initialState = {
    user_id: '',
    username: '',
    profile_picture: ''
}

// DEFINE
const UPDATEUSER_ID = 'UPDATEUSER_ID'
const UPDATEDUSERNAME = 'UPDATEDUSERNAME'
const UPDATEPROFILE_PICTURE = 'UPDATEPROFILE_PICTURE'
const RESET_STATE = 'RESET_STATE'


// FUNCTION
export function update_user_id(user_id) {
    return {
        type: UPDATEUSER_ID,
        payload: user_id
    }
}
export function update_username(username) {
    return {
        type: UPDATEDUSERNAME,
        payload: username
    }
}
export function update_profile_picture(profile_picture) {
    return {
        type: UPDATEPROFILE_PICTURE,
        payload: profile_picture
    }
}

export function resetState() {
    return {
        type: RESET_STATE
    }
}

// EXPORT
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATEUSER_ID:
            return { ...state, user_id: action.payload }
        case UPDATEDUSERNAME:
            return { ...state, username: action.payload }
        case UPDATEPROFILE_PICTURE:
            return { ...state, profile_picture: action.payload }

        case RESET_STATE:
            return { user_id: 0, username: '', profile_picture: '' }
        default:
            return state;
    }
}