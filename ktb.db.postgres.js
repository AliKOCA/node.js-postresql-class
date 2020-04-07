"use strict"; //Tanımsız değişkene müsaade etme!

const { Pool } = require("pg");

class PostgreSStatic {
  static hataMesajiOlustur = function (pMesaj) {
    return { Netice: "Hata!", Mesaj: pMesaj };
  };
  static tamamMesajiOlustur = function (pMesaj) {
    return { Netice: "Tamam.", Mesaj: pMesaj };
  };
  static veriMesajiOlustur = function (pVeri) {
    return { Netice: "Tamam.", Veriler: pVeri };
  };
  static Select(
    pDBAyarlari,
    pTabloIsmi,
    pSutunlar,
    pOrderBy,
    pSart,
    pParametreler,
    res
  ) {
    const pool = new Pool(pDBAyarlari);
    let cumle = " Select " + pSutunlar + " From " + pTabloIsmi;
    if (pSart) {
      cumle += " Where " + pSart;
    }
    if (pOrderBy) {
      cumle += " Order By " + pOrderBy;
    }
    console.log("Cümle: ", cumle);
    pool.connect().then((client) => {
      return client.query(cumle, pParametreler, (error, results) => {
        if (error) {
          client.release();
          res.status(200).json(PostgreSStatic.hataMesajiOlustur("Hata: " + error));
        } else {
          client.release();
          res.status(200).json(PostgreSStatic.veriMesajiOlustur(results.rows));
        }
      });
    });
  }

  static Update(pDBAyarlari, pTabloIsmi, pSutunlar, pSart, pParametreler, res) {
    const pool = new Pool(pDBAyarlari);
    let cumle = " Update " + pTabloIsmi + " ";
    let sutunCumlesi = " Set ";
    let siraNo = 1;
    pSutunlar.forEach((birSutun) => {
      sutunCumlesi += birSutun + " = $" + siraNo;
      siraNo++;
    });
    cumle += sutunCumlesi;
    if (pSart) {
      cumle += " Where " + pSart + " ";
    }
    pool.connect().then((client) => {
      return client.query(cumle, pParametreler, (error, results) => {
        if (error) {
          client.release();
          res.status(200).json(PostgreSStatic.hataMesajiOlustur("Hata: " + error));
        } else {
          client.release();
          //`Kullanıcı kaydı güncellendi, OKytNo : ${oKytNo}`
          res.status(200).json(PostgreSStatic.veriMesajiOlustur(`Kayıt güncellendi.`));
        }
      });
    });
  }

  /** class PostgreSStatik Âhiri */
}

module.exports = {
  PostgreSStatic,
};
