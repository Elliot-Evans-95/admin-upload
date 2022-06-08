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
            {adminUploadedItems.map((uploadedItem, index) => (
                <div>{uploadedItem.name}</div>
            ))}
        </section>
    )
}

export default UploadedDocument
