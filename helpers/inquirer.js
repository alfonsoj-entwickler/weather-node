import inquirer from "inquirer";
import colors from "colors";

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      { value: 1, name: `${'1.'.white} Search a city` },
      { value: 2, name: `${'2.'.white} History` },
      { value: 0, name: `${'0.'.red} Leave` },
    ],
  },
];

const pauseOpts = [
  {
    type: "input",
    name: "key",
    message: `Press ${'ENTER'.green} to continue`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("   Select a option".white);
  console.log("===========================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pause = async () => {
  const { option } = await inquirer.prompt(pauseOpts);

  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value'
        }
        else {
          return true;
        }
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
}

const listPlaces = async (places = []) => {

  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;
    return {
      value: place.id,
      name: `${idx}. ${place.name}`,
    }
  });
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel',
  });
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a place',
      choices
    }
  ]
  const { id } = await inquirer.prompt(questions);
  return id;
}

export { inquirerMenu, pause, readInput, listPlaces };
