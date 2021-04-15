import Link from 'next/link'
import React from 'react'

function IanaTekLogo({ url = null, withText = true, version = null }) {
	return (
		<>
			{url && (
				<Link href={url}>
					<a className="flex items-center">
						<img src="/images/logo7.webp" alt="Logo" width="40" />
						{withText && <span className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</span>}
						{version && <div className="text-xs px-2 py-4 border-2 rounded-full mr-4">v{version}</div>}
					</a>
				</Link>
			)}
			{url === null && (
				<span className="flex items-center">
					<img src="/images/logo7.webp" alt="Logo" width="40" />
					{withText && <span className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</span>}
					{version && <div className="text-xs px-2 py-4 border-2 rounded-full mr-4">v{version}</div>}
				</span>
			)}
		</>
	)
}

export default IanaTekLogo
