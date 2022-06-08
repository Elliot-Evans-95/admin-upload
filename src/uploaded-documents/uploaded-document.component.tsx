import React, { useEffect, useState } from 'react'

import { getAllAdminUploads } from './uploaded-document.service'

const UploadedDocument = () => {
    const [adminUploadedItems, setAdminUploadedItems] = useState<any[]>([])

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
                <div key={folderIndex}>
                    <h2>{uploadedItem.name}</h2>
                    {uploadedItem.files && (
                        <div>
                            <h3>Files:</h3>
                            <ul>
                                {uploadedItem.files.map((file, fileIndex) => (
                                    <li key={fileIndex}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}

export default UploadedDocument
