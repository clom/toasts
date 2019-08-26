/**
 * Print 
 * 
 * 2019 K.Nomiyama
 */

export const toJson = (obj?: any): void => {
  if (!obj) {
    console.log([]);
  } else {
    console.log(JSON.stringify(obj, null, 4));
  }
};
