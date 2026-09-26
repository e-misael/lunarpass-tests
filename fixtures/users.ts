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

export const validUser: User = {
    email: 'buzz@lunarpass.dev',
    password: 'pwd123'
};

export const invalidUserScenarios: InvalidUserScenario[] = [
    {
        description: 'using invalid e-mail',
        user: { email: faker.internet.email(), password: 'pwd123' },
        message: 'E-mail ou senha inválidos.'
    },
    {
        description: 'using invalid password',
        user: { email: 'buzz@lunarpass.dev', password: faker.internet.password() },
        message: 'E-mail ou senha inválidos.'
    },
    {
        description: 'submitting an empty email',
        user: { email: '', password: 'pwd123' },
        message: 'Informe um e-mail válido'
    },
    {
        description: 'leaving empty password',
        user: { email: 'buzz@lunarpass.dev', password: '' },
        message: 'Informe a senha'
    }
];
