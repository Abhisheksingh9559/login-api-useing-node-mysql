// module.exports = {
//     query: async (text, params, callback) => {
//       try {
//         // intialize store into Db log
//         // const startTime = new Date();
//         // main db query excucation
//         const data = await pgPool.query(text, params, callback);
  
//         // intialize update into Db log
//         //  const endDate = new Date();
//         // const seconds = (endDate.getTime() - startTime.getTime()) / 1000;
//         // common.callDBLog(text, seconds, data, params);
//         return data;
//       } catch (error) {
//         // eslint-disable-next-line no-console
//         console.log(error.message);
//         error.params = params;
//         error.text = text;
//         common.catchErrorMail(error, 'query');
//         throw new Error(error.message);
//       }
//     },
//   };
  