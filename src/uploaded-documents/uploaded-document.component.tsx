import React, { useEffect, useState } from 'react'

import { getAllAdminUploads } from './uploaded-document.service'
import { adminUploads } from './uploaded-document.types'
import { sortUploadsByName } from './uploaded-document.helpers'

const UploadedDocument = () => {
    const [adminUploadedItems, setAdminUploadedItems] = useState<
        adminUploads[]
    >([])

    useEffect(() => {
        const allAdminUploads = async () => {
            try {
                const adminUploads = await getAllAdminUploads()
                setAdminUploadedItems(adminUploads)
            } catch (e) {
                console.error('failed to get admin uploads')
            }
        }

        allAdminUploads()
    }, [])

    const handleSortByName = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()

        const sortedAdminUploads = sortUploadsByName(adminUploadedItems)
        setAdminUploadedItems(sortedAdminUploads)
    }

    return (
        <section>
            <h1>Admin Uploaded</h1>
            <button onClick={(e) => handleSortByName(e)}>
                Sort by name (accending)
            </button>
            {adminUploadedItems.map((uploadedItem, folderIndex) => (
                <details key={folderIndex}>
                    <summary>{uploadedItem.name}</summary>
                    <div>
                        Files:{' '}
                        {uploadedItem.files && (
                            <ul>
                                {uploadedItem.files.map((file, fileIndex) => (
                                    <li key={fileIndex}>{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </details>
            ))}
        </section>
    )
}

export default UploadedDocument
