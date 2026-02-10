import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

prompt.start();
prompt.message = "";

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
  ],
});

class Person {
  constructor(name = "", number = "", email = "") {
    this.validate(name, number, email);
    this.name = name;
    this.number = number;
    this.email = email;
  }

  validate(name, number, email) {
    validateName(name);
    validateNumber(number);
    validateEmail(email);
  }

  async saveToCSV() {
    const { name, number, email } = this;
    await csvWriter.writeRecords([{ name, number, email }]);
    console.log(`${this.name} Salvo!!`);
  }
}

const validateName = (name) => {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Nome inválido");
  }
  return name;
};

const validateNumber = (number) => {
  if (typeof number !== "string" || !/^\d+$/.test(number)) {
    throw new Error("Telefone inválido");
  }
  return number;
};

const validateEmail = (email) => {
  if (typeof email !== "string" || !email.includes("@")) {
    throw new Error("Email inválido");
  }
  return email;
};

const askUntilValid = async (question, validateFn) => {
  while (true) {
    try {
      const response = await prompt.get([question]);
      return validateFn(response[question.name]);
    } catch (error) {
      console.error(`❌ ${error.message}`);
    }
  }
};

const startApp = async () => {
  const name = await askUntilValid(
    { name: "name", description: "Nome do contato" },
    validateName,
  );

  const number = await askUntilValid(
    { name: "number", description: "Número do contato" },
    validateNumber,
  );

  const email = await askUntilValid(
    { name: "email", description: "Email do contato" },
    validateEmail,
  );

  const person = new Person(name, number, email);
  await person.saveToCSV();

  const { again } = await prompt.get([
    { name: "again", description: "Deseja continuar? (s/n)" },
  ]);

  if (again.toLowerCase() === "s") await startApp();
};

startApp();
