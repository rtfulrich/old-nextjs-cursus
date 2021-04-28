import Link from 'next/link'
import React from 'react'

function IanaTekLogo({ url = null, withText = true, version = null }) {
	return (
		<>
			{url && (
				<Link href={url}>
					<a className="flex items-center">
						<img src="/images/logo7.webp" alt="Logo" width="40" />
						{withText && <h1 className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</h1>}
						{version && <p className="text-xs px-2 py-4 border-2 rounded-full mr-4">v{version}</p>}
					</a>
				</Link>
			)}
			{url === null && (
				<div className="flex items-center">
					<img src="/images/logo7.webp" alt="Logo" width="40" />
					{withText && <h1 className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</h1>}
					{version && <p className="text-xs px-2 py-4 border-2 rounded-full mr-4">v{version}</p>}
				</div>
			)}
		</>
	)
}

export default IanaTekLogo
