const {appointments} = require("./appointments");
const {clinicalHistory} = require("./clinicalHistory");
const {clinics} = require("./clinics");
const {doctors} = require("./doctors");
const {documentTypes} = require("./documentTypes");
const {genders} = require("./genders");
const {people} = require("./people");
const {procedures} = require("./procedures");
const {rol} = require("./rol");
const {sessions} = require("./sessions");
const {specialties} = require("./specialties");
const {users} = require("./users");

users.hasOne(people);
users.hasOne(sessions);
clinics.hasOne(users);
genders.hasOne(people);
documentTypes.hasOne(people);
rol.hasOne(people);
people.hasOne(clinicalHistory);
people.hasOne(doctors);
doctors.hasMany(appointments);
specialties.hasMany(doctors);
clinicalHistory.hasMany(procedures);
people.hasMany(appointments);

