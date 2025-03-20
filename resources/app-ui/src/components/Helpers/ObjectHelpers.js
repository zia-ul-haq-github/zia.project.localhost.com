
 export const RenameObjectKeys = (obj, newKeys) => {

  if ( null === typeof obj || 'undefined' === typeof obj ){
    return {};
  }
  
  const entries = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return {[newKey]: obj[key]};
  });

  return Object.assign({}, ...entries);

}
