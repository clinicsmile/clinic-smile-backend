const { appointments } = require("./appointments");
const { clinicalHistory } = require("./clinicalHistory");
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

people.hasOne(users);
users.belongsTo(people);

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

bloodTypes.hasOne(people);
people.belongsTo(bloodTypes);

console.log("\n\n\nSe crearon las asociaciones\n\n\n");
const DefaultRegisters = async () => {
  //creacion de persona admin principal
  try {
    await people.create({
      document: "0000",
    });
  } catch (error) {
    console.log(error);
  }

  //creacion de usuario admin principal
  try {
    await users.create({
      username: "admin",
      password: "admin",
      personDocument: "0000",
    });
  } catch (error) {
    console.log(error);
  }

  //Creacion de roles por defecto
  try {
    await rol.bulkCreate([
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
    await genders.bulkCreate([
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

  // Creacion de especialidades por defecto
  try {
    await specialties.bulkCreate([
      {
        name: "Ortodoncia",
        description:
          "La ortodoncia es una especialidad que se encarga de corregir la posición de los dientes y la mandíbula para lograr una mordida adecuada y una sonrisa estéticamente agradable.",
      },
      {
        name: "Periodoncia",
        description:
          "La periodoncia se enfoca en el diagnóstico y tratamiento de las enfermedades de las encías y el tejido que rodea los dientes, incluyendo la gingivitis y la periodontitis.",
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
        name: "Odontopediatría",
        description:
          "La odontopediatría se dedica a la atención dental de niños y adolescentes, brindando cuidados preventivos y tratamientos adaptados a las necesidades de los más jóvenes.",
      },
    ]);
  } catch (error) {
    console.log(error);
  }

  try {
    await documentTypes.bulkCreate([
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
    await bloodTypes.bulkCreate([
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
};

module.exports = { DefaultRegisters };
