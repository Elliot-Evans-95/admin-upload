import React from 'react'
import { render } from '@testing-library/react'

import UploadedDocument from './uploaded-document.component'

describe('Uploaded Document', () => {
    describe('When the component has loaded', () => {
        afterAll(() => {
            jest.clearAllMocks()
        })

        test('Then the `Admin Uploaded` heading appears', () => {
            const { getByText } = render(<UploadedDocument />)
            const heading = getByText('Admin Uploaded')

            expect(heading).toBeInTheDocument()
        })
    })
})
