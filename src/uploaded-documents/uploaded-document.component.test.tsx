import React from 'react'
import {render, waitFor} from '@testing-library/react'

import { getAllAdminUploads } from './uploaded-document.service'
import UploadedDocument from './uploaded-document.component'

jest.mock('./uploaded-document.service')

const mockGetAllAdminUploads = getAllAdminUploads as jest.MockedFunction<
    typeof getAllAdminUploads
>
const mockedUploadedDocuments = [
    {
        type: 'pdf',
        name: 'Employee Handbook',
        added: '2017-01-06',
    },
]

describe('Uploaded Document', () => {
    describe('When the component has loaded', () => {
        beforeEach(() => {
            mockGetAllAdminUploads.mockResolvedValue(mockedUploadedDocuments)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        test('Then the `Admin Uploaded` heading appears', async () => {
            const { getByText } = render(<UploadedDocument />)
            const heading = getByText('Admin Uploaded')

            expect(heading).toBeInTheDocument()
        })

        test('Then the `uploaded` endpoint has been called', async () => {
            render(<UploadedDocument />)

            expect(mockGetAllAdminUploads).toHaveBeenCalled()
        })

        test('Then the `uploaded` items appear on the page', async () => {
            const { getByText } = render(<UploadedDocument />)

            await waitFor(() => {
                expect(
                    getByText(mockedUploadedDocuments[0].name)
                ).toBeInTheDocument()
            })
        })
    })
})
