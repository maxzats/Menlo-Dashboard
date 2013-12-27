# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table bucket (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  required_for              varchar(255),
  constraint pk_bucket primary key (id))
;

create table category (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  constraint pk_category primary key (id))
;

create table course (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  availability              varchar(255),
  part_of_schedule          tinyint(1) default 0,
  credit_type               varchar(255),
  visible                   tinyint(1) default 0,
  category_id               bigint,
  duration                  varchar(255),
  description               longtext,
  other_requirements        longtext,
  constraint pk_course primary key (id))
;

create table course_cart (
  id                        bigint auto_increment not null,
  user_id                   bigint,
  selections                varchar(255),
  constraint pk_course_cart primary key (id))
;

create table schedule (
  id                        bigint auto_increment not null,
  secret_key                varchar(255),
  user                      bigint,
  freshman_classes          varchar(255),
  freshman_top_course       varchar(255),
  freshman_notes            longtext,
  sophomore_classes         varchar(255),
  sophomore_top_course      varchar(255),
  sophomore_notes           longtext,
  junior_classes            varchar(255),
  junior_top_course         varchar(255),
  junior_notes              longtext,
  senior_classes            varchar(255),
  senior_top_course         varchar(255),
  senior_notes              longtext,
  service_hours             integer,
  pecredits                 integer,
  constraint pk_schedule primary key (id))
;

create table settings (
  id                        integer auto_increment not null,
  app_name                  varchar(255),
  freshman_message          longtext,
  sophomore_message         longtext,
  junior_message            longtext,
  senior_message            longtext,
  constraint pk_settings primary key (id))
;

create table user (
  id                        bigint auto_increment not null,
  email                     varchar(255),
  password                  varchar(255),
  first_name                varchar(255),
  last_name                 varchar(255),
  role                      varchar(255),
  constraint pk_user primary key (id))
;


create table bucket_course (
  bucket_id                      bigint not null,
  course_id                      bigint not null,
  constraint pk_bucket_course primary key (bucket_id, course_id))
;
alter table course add constraint fk_course_category_1 foreign key (category_id) references category (id) on delete restrict on update restrict;
create index ix_course_category_1 on course (category_id);



alter table bucket_course add constraint fk_bucket_course_bucket_01 foreign key (bucket_id) references bucket (id) on delete restrict on update restrict;

alter table bucket_course add constraint fk_bucket_course_course_02 foreign key (course_id) references course (id) on delete restrict on update restrict;

# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table bucket;

drop table bucket_course;

drop table category;

drop table course;

drop table course_cart;

drop table schedule;

drop table settings;

drop table user;

SET FOREIGN_KEY_CHECKS=1;

