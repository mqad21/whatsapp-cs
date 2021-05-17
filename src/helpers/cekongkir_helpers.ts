import axiosRo from "@/plugins/axios_ro";

export default (path: string, config: object) => {
  const env = process.env.NODE_ENV;
  return new Promise((resolve, reject) => {
    // if (env == 'development') {
      axiosRo(path, config)
        .then((response) => response.data)
        .then((result) => {
          if (!result.status) {
            throw result.message;
          }
          if (!result.data) {
            throw "Gagal mendapatkan ongkir.";
          }
          return result.data.rajaongkir;
        })
        .then((result) => {
          if (result.status.code != 200) {
            throw result.status.description;
          }
          resolve(result.results);
        })
        .catch((e) => reject(e));
    // } else {
    //   axiosRo(path, config)
    //     .then((response) => response.data.rajaongkir)
    //     .then((result) => {
    //       if (result.status.code != 200) {
    //         throw result.status.description;
    //       }
    //       resolve(result.results);
    //     })
    //     .catch((e) => reject(e));
    // }
  });
}