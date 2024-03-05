'use client'

function loader({src}) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`
}

export default loader;