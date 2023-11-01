import Enquirer from 'enquirer';

// ----------------------------------------------------------------------

const enquirer = new Enquirer();

type Props = {
  compile: 'TypeScript' | 'JavaScript';
};

const receiveCLIArgs = async (): Promise<Props> => {
  const questions = [
    {
      type: 'autocomplete',
      name: 'compile',
      message: 'Compile for:',
      initial: 0,
      choices: ['TypeScript', 'JavaScript'],
    },
  ];

  const answers = (await enquirer.prompt(questions)) as Props;

  return answers;
};

export default receiveCLIArgs;
