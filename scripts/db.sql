Create Role u_pg_class with login CREATEDB CREATEROLE encrypted password '+65şİfRe855';

CREATE DATABASE db_pg_class WITH OWNER u_pg_class TEMPLATE template0 ENCODING 'UTF-8' LC_COLLATE 'tr_TR.UTF-8' LC_CTYPE = 'tr_TR.UTF-8';

grant all privileges on database db_pg_class to u_pg_class;

\ connect db_pg_class

Create schema sch_pg_class;

ALTER SCHEMA sch_pg_class OWNER TO u_pg_class;

/*
PG-localhost-db_pg_class-u_pg_class

$ psql -h localhost -p 5432 -U u_pg_class -W db_pg_class
*/


create table sch_pg_class.umm_tablolar(
  okytno              serial          NOT NULL,
    constraint pk__umm_tablolar__okytno primary key(okytno),   
  isim                varchar(100)    NOT NULL,
    constraint uk__umm_tablolar__kullanici_ismi unique (isim),
  faal                 boolean         NOT NULL    DEFAULT FALSE,
  olusturulma_tarihi   timestamp       NOT NULL    DEFAULT Now()
);

create table sch_pg_class.umm_veriler(
  okytno              serial          NOT NULL,
    constraint pk__umm_veriler__okytno primary key(okytno),   
  rbt_umm_tablolar      int             not null,
      constraint fk__umm_veriler___rbt_umm_tablolar foreign key (rbt_umm_tablolar) 
            references sch_pg_class.umm_tablolar(okytno),
  Veri                varchar(100)    NOT NULL,
    constraint uk__umm_veriler__kullanici_ismi unique (rbt_umm_tablolar, veri),
  faal                 boolean         NOT NULL    DEFAULT FALSE,
  olusturulma_tarihi   timestamp       NOT NULL    DEFAULT Now()
);

insert into sch_pg_class.umm_tablolar(isim, faal) values('İller', true), ('Okullar', true);

insert into sch_pg_class.umm_veriler(rbt_umm_tablolar, Veri, Faal) values
  (1, 'İstanbul', true), (1, 'Ankara', true),(1, 'Konya', true), (1, 'Şanlıurfa', true);
 
insert into sch_pg_class.umm_veriler(rbt_umm_tablolar, Veri, Faal) values
  (2, 'İstanbul Bilişim Lisesi', true), (2, 'Ankara Sağlık Meslek Lisesi', true),(2, 'Konya Meram Fen Lisesi', true),
  (2, 'Şanlıurfa Balıklı Göl Sosyal Bilimler Lisesi', true)
  ;



