import axios from 'axios'

export const createOpport = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/opport",values,
    {
        headers:{
            authtoken
        }
    });
}
///opport/search

export const searchOpport = async (params) => {
    // const params = { keyword };
    return await axios.get(process.env.REACT_APP_API + "/opport/search", {params});
};

export const getAllOpport = async () => {
    return await axios.get(process.env.REACT_APP_API + "/opport");
};

export const getOneOpport = async (id) => {
    return await axios.get(process.env.REACT_APP_API + "/opport/" + id);
};

export const getAllMeOpport = async (id, authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/opport/me/" + id,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
};


export const removeOpport = async(id, authtoken)=>{
    return await axios.delete(process.env.REACT_APP_API+ "/opport/"+id,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}


export const updateOpport = async(id, values, authtoken)=>{
    return await axios.put(process.env.REACT_APP_API+ "/opport/"+ id,values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const updateIsJoinOpport = async(id, values, authtoken)=>{
    return await axios.put(process.env.REACT_APP_API+ "/opport/change-isJoin/"+ id,values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

export const updateStatusOpport = async(id, values, authtoken)=>{
    return await axios.put(process.env.REACT_APP_API+ "/opport/change-status/"+ id,values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}

///opport/change-status/:id

export const testToken = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/tototoken",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}