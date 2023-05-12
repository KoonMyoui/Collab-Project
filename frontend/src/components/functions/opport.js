import axios from 'axios'

export const createOpport = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/opport",values,
    {
        headers:{
            authtoken
        }
    });
}

export const getAllOpport = async () => {
    return await axios.get(process.env.REACT_APP_API + "/opport");
};

export const getOneOpport = async (id) => {
    return await axios.get(process.env.REACT_APP_API + "/opport/" + id);
};

export const testToken = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/tototoken",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}