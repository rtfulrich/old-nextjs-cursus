import Link from 'next/link'
import React from 'react'

function IanaTekLogo({ url = null, withText = true }) {
	return (
		<>
			{url && (
				<Link href={url}>
					<a className="flex items-center">
						<img src="/images/logo7.webp" alt="Logo" width="40" />
						{withText && <span className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</span>}
					</a>
				</Link>
			)}
			{url === null && (
				<span className="flex items-center">
					<img src="/images/logo7.webp" alt="Logo" width="40" />
					{withText && <span className="text-2xl font-bold tracking-widest mx-3 twitter">IanaTek</span>}
				</span>
			)}
		</>
	)
}

export default IanaTekLogo
