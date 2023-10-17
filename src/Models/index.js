const { appointments } = require("./appointments");
const { clinics } = require("./clinics");
const { doctors } = require("./doctors");
const { documentTypes } = require("./documentTypes");
const { genders } = require("./genders");
const { people } = require("./people");
const { procedures } = require("./procedures");
const { rol } = require("./rol");
const { sessions } = require("./sessions");
const { specialties } = require("./specialties");
const { users } = require("./users");
const { bloodTypes } = require("./bloodTypes");
const { academicLevels } = require("./academicLevels");

const models = {};

models.appointments = appointments;
models.clinics = clinics;
models.doctors = doctors;
models.documentTypes = documentTypes;
models.genders = genders;
models.people = people;
models.procedures = procedures;
models.rol = rol;
models.sessions = sessions;
models.specialties = specialties;
models.users = users;
models.bloodTypes = bloodTypes;
models.academicLevels = academicLevels;

const DefaultRegisters = async () => {
  //Creacion de roles por defecto
  try {
    await models.rol.bulkCreate([
      {
        name: "Administrador",
        description: "Usuario administrador con todos los permisos",
      },
      {
        name: "Doctor",
        description: "Usuario Doctor",
      },
      {
        name: "Paciente",
        description: "Usuario Paciente",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  //Creacion de generos por defecto
  try {
    await models.genders.bulkCreate([
      {
        acronym: "M",
        name: "MASCULINO",
      },
      {
        acronym: "F",
        name: "FEMENINO",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  // Creacion de especialidades por defecto para los doctores
  try {
    await models.specialties.bulkCreate([
      {
        name: "Odontologia General",
        description:
          "La Odontología General es la especialidad de Odontología encargada de prevenir, diagnosticar y tratar aquellos problemas primarios relacionados con los dientes, las encías o la lengua.",
      },
      {
        name: "Endodoncia",
        description:
          "La endodoncia se dedica a tratar los problemas internos de los dientes, como las infecciones en la pulpa dental, mediante procedimientos como la realización de conductos radiculares.",
      },
      {
        name: "Cirugía Oral y Maxilofacial",
        description:
          "La cirugía oral y maxilofacial se encarga de realizar procedimientos quirúrgicos en la boca, la mandíbula y la cara, como extracciones de dientes de terceros molares y cirugía reconstructiva.",
      },
      {
        name: "Ortodoncia",
        description:
          "La ortodoncia es una especialidad que se encarga de corregir la posición de los dientes y la mandíbula para lograr una mordida adecuada y una sonrisa estéticamente agradable.",
      },
      {
        name: "Odontopediatría",
        description:
          "La odontopediatría se dedica a la atención dental de niños y adolescentes, brindando cuidados preventivos y tratamientos adaptados a las necesidades de los más jóvenes.",
      },
      {
        name: "Periodoncia",
        description:
          "La periodoncia se enfoca en el diagnóstico y tratamiento de las enfermedades de las encías y el tejido que rodea los dientes, incluyendo la gingivitis y la periodontitis.",
      },
      {
        name: "Estetica Dental",
        description:
          "La estética dental es una especialidad odontológica que tiene como objetivo no solo mejorar los dientes y encías.",
      },
      {
        name: "Rehabilitación Oral",
        description:
          "La Rehabilitación Oral es una especialidad de la Odontología encargada de la restauración de las piezas dentales para devolverle su función estética y armónica oral mediante Prótesis Dentales.",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  try {
    await models.academicLevels.bulkCreate([
      {
        name: "Educación básica primaria",
        description:
          "Educación primaria y secundaria; comprende nueve (9) grados y se estructurará en torno a un currículo común (primaria cinco grados y secundaria cuatro grados)",
      },
      {
        name: "Educación Secundaria",
        description: "Dos grados y culmina con el título de bachiller",
      },
      {
        name: "Pregrado, Técnico y/o Tecnólogo",
        description: "Educación superior profesional",
      },
      {
        name: "Posgrado, Especializaciones, Maestría y/o Doctorado",
        description: "Educación superior avanzada",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  //Creacion de tipos de documento base
  try {
    await models.documentTypes.bulkCreate([
      {
        acronym: "CC",
        name: "Cedula de ciudadanía",
        description: "mayor de 18 años",
      },
      {
        acronym: "TI",
        name: "Tarjeta de identidad",
        description: "De 7 años a 18 años.",
      },
      {
        acronym: "RC",
        name: "Registro civil",
        description: "De 0 meses a 7 años.",
      },
      {
        acronym: "CE",
        name: "Cedula de extranjería",
        description:
          "Ciudadanos extranjeros residentes permanentes en Colombia.",
      },
      {
        acronym: "PEP",
        name: "Permiso especial de permanencia ",
        description:
          "Ciudadanos venezolanos con estancia regularizada en el país a través de este documento.",
      },
      {
        acronym: "DNI",
        name: "Documento Nacional de identidad",
        description:
          "Ciudadanos extranjeros con estancia temporal en Colombia y demás documentos que acrediten su permanencia.",
      },
      {
        acronym: "SCR",
        name: "Salvoconducto",
        description:
          "Ciudadanos extranjeros, mayores de edad, a los cuales se les regula la salida del país a través del presente. ",
      },
      {
        acronym: "PA",
        name: "Pasaporte",
        description:
          "CCiudadanos Extranjeros dentro del territorio, mayores o menores de edad.",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  //Creacion de tipos de sangre por defecto
  try {
    await models.bloodTypes.bulkCreate([
      {
        acronym: "A+",
      },
      {
        acronym: "A-",
      },
      {
        acronym: "B+",
      },
      {
        acronym: "B-",
      },
      {
        acronym: "AB+",
      },
      {
        acronym: "AB-",
      },
      {
        acronym: "O+",
      },
      {
        acronym: "O-",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  //creacion de persona admin principal
  try {
    await models.people.create({
      document: "0000",
      name: "Administrador",
      rolId: 1,
    });
  } catch (error) {
    console.log(error);
  }

  //creacion de usuario admin principal
  try {
    await models.users.create({
      username: "admin",
      password: "admin",
      PersonDocument: "0000",
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await models.clinics.create({
      name: "clinicSmile",
      primaryColor: "#673ab7",
      secundaryColor: "#9c27b0",
      logo: "https://cdn-icons-png.flaticon.com/512/3895/3895205.png",
    });
  } catch (error) {
    console.log(error);
  }
};

const relations = async () => {
  models.users.belongsTo(models.people, { onDelete: "cascade", hooks: true }); // un usuario pertenece a una persona
  models.sessions.belongsTo(models.users); //Una sesion pertenece a un usuario
  models.users.belongsTo(models.clinics); //Un usuario pertenece a una clinica
  models.people.belongsTo(models.genders); // Una persona pertenece a un genero M o F
  models.people.belongsTo(models.documentTypes); // una persona pertenece a un tipo de documento
  models.people.belongsTo(models.rol); // Un Usuario pertenece a un rol
  models.doctors.belongsTo(models.people); //Un doctor puede ser una persona
  models.people.belongsTo(models.bloodTypes); //Una persona pertenece a un tipo de sangre
  models.appointments.belongsTo(models.specialties); // Una cita pertenece a una especialidad
  models.doctors.hasMany(models.appointments); //Un Doctor puede tener muchas citas
  models.specialties.hasMany(models.doctors); //una especialiad puede pertenecer a muchos doctores
  models.people.hasMany(models.appointments); //una persona puede tener muchas citas
  models.appointments.belongsTo(models.people);
  models.appointments.belongsTo(models.doctors);
  models.doctors.belongsTo(models.academicLevels); // un doctor pertenece a un nivel academico

  models.appointments.belongsTo(models.procedures);
  models.procedures.belongsTo(models.appointments);

  models.people.hasMany(models.procedures);
  models.procedures.belongsTo(models.people);
};

module.exports = { models, DefaultRegisters, relations };
