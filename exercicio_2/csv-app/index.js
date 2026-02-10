// import { writeFileSync } from "fs";
import { createInterface } from "readline";
import { promisify } from "util";
import { appendFileSync, existsSync } from "fs";

// const content = "Test content";

// try {
//   writeFileSync("./file.txt", content);
//   console.log("File created successfully");
// } catch (error) {
//   console.error("Error writing file:", error);
// }

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (message) =>
  new Promise((resolve) => readline.question(message, resolve));

// const readLineAsync = promisify(readline.question).bind(rl)(async () => {
//   try {
//     const name = await readLineAsync("Qual é o seu nome?");
//     console.log(`Olá ${name}!`);
//   } catch (err) {
//     console.error("Error", err.message);
//   } finally {
//     readline.close();
//   }
// })();

class Person {
  constructor(name = "", number = "", email = "") {
    this.name = name;
    this.number = number;
    this.email = email;
  }

  saveToCSV() {
    const content = `${this.name}, ${this.number}, ${this.email}\n`;

    if (!existsSync("./contacts.csv")) {
      appendFileSync("./contacts.csv", "Name, Number, Email\n");
    }

    try {
      appendFileSync("./contacts.csv", content);
      console.log(`${this.name} Salvo!!`);
    } catch (err) {
      console.log(err);
    }
  }
}

const startApp = async () => {
  let shouldContinue = true;
  while (shouldContinue) {
    const name = await readLineAsync("Nome do contato: ");
    const number = await readLineAsync("Número do contato: ");
    const email = await readLineAsync("Email do contato: ");

    const person = new Person(name, number, email);
    person.saveToCSV();

    const response = await readLineAsync(
      "Deseja adicionar outro contato? (s/n): ",
    );
    shouldContinue = response.toLowerCase() === "s";
  }
  readline.close();
};

startApp();
