import axios from 'axios'

export const createTeamRequest = async(values, authtoken)=>{
    return await axios.post(process.env.REACT_APP_API+ "/join-project/request",values,
    {
        headers: {
            Authorization: `Bearer ${authtoken}`
        }
    });
}
//not use it old join-project/requested
export const meRequested = async (values, authtoken) => {
    return await axios.post(process.env.REACT_APP_API + "/join-project/requested",values,
    {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    });
};

export const getAllMeRequest = async (id,authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/join-project/me-request/" + id,
    {
        headers: {
          Authorization: `Bearer ${authtoken}`
        }
      });
};

export const getAllMeSentRequest = async (id,authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/join-project/me-sent-request/" + id,
  {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    });
};

export const acceptRequested = async (values, authtoken) => {
  return await axios.post(process.env.REACT_APP_API + "/join-project/accept",values,
  {
    headers: {
      Authorization: `Bearer ${authtoken}`
    }
  });
};

export const removeRequested = async (id, authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/join-project/cancel-request/"+id,
  {
    headers: {
      Authorization: `Bearer ${authtoken}`
    }
  });
};
