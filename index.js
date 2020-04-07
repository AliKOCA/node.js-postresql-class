const Postgres = require("./ktb.db.postgres"),
  postgresAyarlar = require("./config/config.db"),
  bodyParser = require("body-parser"),
  express = require("express"),
  app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({
    Bilgi: "node.js-postresql-class",
    Info: "Rest API Hizmeti",
  });
});

app.get("/tablolar/:okytno", (request, response) => {
  const OKytNo = parseInt(request.params.okytno);
  Postgres.PostgreSStatic.Select(
    postgresAyarlar.pgDBAyarlari,
    "sch_pg_class.umm_tablolar",
    "*",
    "isim",
    "okytno > $1",
    [OKytNo],
    response
  );
});

app.get("/veriler/:rbt_umm_tablolar", (request, response) => {
  const rbt_umm_tablolar = parseInt(request.params.rbt_umm_tablolar);
  Postgres.PostgreSStatic.Select(
    postgresAyarlar.pgDBAyarlari,
    "sch_pg_class.umm_veriler",
    "*",
    "veri",
    "rbt_umm_tablolar = $1",
    [rbt_umm_tablolar],
    response
  );
});

app.listen(1453, function () {
  console.log("Sunucu çalışmaya başladı! port no:1453");
  console.log("http://localhost:1453");
});

//http://localhost:1453/
