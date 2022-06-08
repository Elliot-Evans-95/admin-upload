import { adminUploads } from './uploaded-document.types'

export const sortUploadsByName = (
    adminUploads: adminUploads[]
): adminUploads[] => {
    return adminUploads.sort((a, b) => {
        const uppercaseA = a.name.toUpperCase()
        const uppercaseB = b.name.toUpperCase()

        if (uppercaseA < uppercaseB) return -1
        if (uppercaseA > uppercaseB) return 1

        return 0
    })
}
