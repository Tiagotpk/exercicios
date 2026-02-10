import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

prompt.start();
prompt.message = "";

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", tittle: "NAME" },
    { id: "number", tittle: "NUMBER" },
    { id: "email", tittle: "EMAIL" },
  ],
});

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }

  async saveToCSV() {
    // if (!existsSync("./contacts.csv")) {
    //   appendFileSync("./contacts.csv", "Name, Number, Email\n");
    // }

    try {
      const { name, number, email } = this;
      await csvWriter.writeRecords([{ name, number, email }]);
      console.log(`${this.name} Salvo!!`);
    } catch (err) {
      console.log(err);
    }
  }
}

const startApp = async () => {
  const questions = [
    {
      name: "name",
      description: "Nome do contato",
    },
    {
      name: "number",
      description: "Número do contato",
    },
    {
      name: "email",
      description: "Email do contato",
    },
  ];

  const responses = await prompt.get(questions);
  const person = new Person(responses.name, responses.number, responses.email);
  await person.saveToCSV();

  const { again } = await prompt.get([
    { name: "again", description: "Deseja continuar? (s/n)" },
  ]);
  if (again.toLowerCase() === "s") {
    await satartApp();
  }
};

startApp();
