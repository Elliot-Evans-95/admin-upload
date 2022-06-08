import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { getAllAdminUploads } from './uploaded-document.service'
import UploadedDocument from './uploaded-document.component'
import { adminUploads } from './uploaded-document.types'
import {sortUploadsByName} from "./uploaded-document.helpers";

jest.mock('./uploaded-document.service')

const mockGetAllAdminUploads = getAllAdminUploads as jest.MockedFunction<
    typeof getAllAdminUploads
>
const mockedUploadedDocuments: adminUploads[] = [
    {
        type: 'folder',
        name: 'Expenses',
        files: [
            {
                type: 'doc',
                name: 'Expenses claim form',
                added: '2017-05-02',
            },
            {
                type: 'doc',
                name: 'Fuel allowances',
                added: '2017-05-03',
            },
        ],
    },
]

const mockPDFUploadDoc: adminUploads = {
    type: 'pdf',
    name: 'Public Holiday policy',
    added: '2016-12-06',
}

const mockedAllUploadedDocuments: adminUploads[] = [
    mockPDFUploadDoc,
    ...mockedUploadedDocuments,
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

        test('Then the `uploaded` folder name appears on the page', async () => {
            const { getByText } = render(<UploadedDocument />)

            const folderName = mockedUploadedDocuments[0].name

            await waitFor(() => {
                expect(getByText(folderName)).toBeInTheDocument()
            })
        })

        test('Then the `uploaded` files and folders appear on the page', async () => {
            const { getByText } = render(<UploadedDocument />)

            const filesInFolder = mockedUploadedDocuments[0].files

            await waitFor(() => {
                expect(getByText(filesInFolder[0].name)).toBeInTheDocument()
                expect(getByText(filesInFolder[1].name)).toBeInTheDocument()
            })
        })
    })

    describe('When the user has sorted buy name', () => {
        beforeEach(() => {
            mockGetAllAdminUploads.mockResolvedValue(mockedAllUploadedDocuments)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        // Due to time I will only test the sort function
        test('Then the folders sort in alphabetical order', async () => {
            const expected = [...mockedUploadedDocuments, mockPDFUploadDoc]
            const actual = sortUploadsByName(mockedAllUploadedDocuments)

            expect(actual).toStrictEqual(expected)
        })
    })
})
