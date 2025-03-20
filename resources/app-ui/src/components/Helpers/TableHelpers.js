export const OrderByFromSort = ( sort) => {

  if ( null === typeof sort || 'undefined' === typeof sort ){
    return;
  }
  return ( undefined != Object.keys(sort)[0] ) ? Object.keys(sort)[0]: '';

};

export const OrderFromSort = ( sort) => {

  if ( null === typeof sort || 'undefined' === typeof sort ){
    return;
  }

  switch (Object.values(sort)[0]) {
    case "ascend":
      return "asc";
    case "descend":
      return "desc";
    default:
      return;
  }
  
};

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};
