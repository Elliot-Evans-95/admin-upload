import React, { useEffect, useState } from 'react'

import { getAllAdminUploads } from './uploaded-document.service'
import { adminUploads } from './uploaded-document.types'

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

    return (
        <section>
            <h1>Admin Uploaded</h1>
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
