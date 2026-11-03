import {faker} from '@faker-js/faker';

export interface User {
    email: string;
    password: string;
}

export interface InvalidUserScenario {
    description: string;
    user: User;
    message: string;
}

function requiredCredential(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing ${name}. Set it in .dotenv or the environment.`);
    }

    return value;
}

export const validUser: User = {
    email: requiredCredential('LUNARPASS_EMAIL'),
    password: requiredCredential('LUNARPASS_PASSWORD')
};

export const invalidUserScenarios: InvalidUserScenario[] = [
    {
        description: 'using invalid e-mail',
        user: { email: faker.internet.email(), password: faker.internet.password() },
        message: 'E-mail ou senha inválidos.'
    },
    {
        description: 'using invalid password',
        user: { email: validUser.email, password: faker.internet.password() },
        message: 'E-mail ou senha inválidos.'
    },
    {
        description: 'submitting an empty email',
        user: { email: '', password: '' },
        message: 'Informe um e-mail válido'
    },
    {
        description: 'leaving empty password',
        user: { email: validUser.email, password: '' },
        message: 'Informe a senha'
    }
];
