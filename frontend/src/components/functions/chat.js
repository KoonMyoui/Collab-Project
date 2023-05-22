import axios from 'axios'

export const createGroupChat = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/chat/group/new-group",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const getMyChat = async(authtoken)=>{
    return await axios.get(process.env.REACT_APP_API+ "/chat",
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const leaveGroup = async( values, authtoken)=>{
    return await axios.put(process.env.REACT_APP_API+ "/chat/group/remove-user",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}
///chat/group/remove-user