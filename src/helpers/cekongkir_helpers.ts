import axiosRo from "@/plugins/axios_ro";

export const getData = (path: string, config: object) => {
  // const env = process.env.NODE_ENV;
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
        resolve(result);
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

export const getAddress = (area: any) => {
  const city = area.city || area.city_name;
  console.log(city);
  if (area.subdistrict_name) {
    return [area.subdistrict_name, area.type + ' ' + city, area.province].join(", ");
  }
  return [area.type + ' ' + city, area.province].join(", ");
}