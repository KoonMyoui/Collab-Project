import axios from 'axios'
export const createProfile = async(value,authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/createProfile",value,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const updateProfile = async(id, values, authtoken)=>{
    return await axios.put(process.env.REACT_APP_API+ "/profile/"+ id,values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}