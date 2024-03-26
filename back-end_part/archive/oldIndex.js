// part 1

const names = ["John", "Luke", "Alex", "Denis", "Mike"];

const sortedNames = names.sort();

console.log(sortedNames);

// part 2
const { v4: uuidv4 } = require("uuid");
const genId = uuidv4();

const objectFunc = (name, company) => {
  const genId = uuidv4();

  return {
    name: name,
    company: company,
    id: genId,
  };
};

const comObj = objectFunc("Andrew", "Pure Inc.");

console.log(comObj);

// part 3

const casual = require("casual");

const city = casual.city;
const firstName = casual.first_name;
const lastName = casual.last_name;

console.log(
  `Presentation: Hello my name is ${firstName} ${lastName} and I'm from ${city} city`
);
