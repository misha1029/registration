import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import styles from './UserAvatar.module.scss'

export const UserAvatar: FC<{
	avatarPath: string
	link: string
	title?: string
}> = ({ avatarPath, link, title }) => {
	return (
		<Link href={link}>
			<a title={title}>
				<Image
					className={styles.avatar}
					src={avatarPath}
					width={46}
					height={46}
				/>
			</a>
		</Link>
	)
}
