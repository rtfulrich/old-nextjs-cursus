import React from 'react'

export default function PostContent({ content }) {
	// R E F S
	const contentParentRef = React.useRef();

	// M O U N T  E F F E C T
	React.useEffect(() => {
		contentParentRef.current.innerHTML = content;
		const html = contentParentRef.current.innerHTML;
		contentParentRef.current.innerHTML = html.replaceAll("&nbsp;", " ");
	}, []);

	return (
		<div className="break-normal" ref={contentParentRef}>
			{content}
		</div>
	)
}

