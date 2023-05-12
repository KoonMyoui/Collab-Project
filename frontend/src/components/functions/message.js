import axios from 'axios'
//'/message/:chatId'
export const sendMessage = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/message",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const getAllMessage = async(chatID, authtoken)=>{
    return await axios.get(process.env.REACT_APP_API+ "/message/" + chatID ,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}