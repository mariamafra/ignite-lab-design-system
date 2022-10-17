import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw'
import { SignIn } from './SignIn'

export default {
    title: 'Pages/Sign In',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post('/sessions', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login realizado'
                    }))
                })
            ],
        }
    }
} as Meta

export const Default: StoryObj = {
    // Essa fnção play serve para executar testes automatizados
    // Canvas pega o elemento inteiro da tela 
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite seu e-mail'), 'maframaria@gmail.com')
        userEvent.type(canvas.getByPlaceholderText('**********'), '5252HGSAI@')

        userEvent.click(canvas.getByRole('button'))
    }
}
