import React, { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { IButton } from './button.interface'
import styles from './Button.module.scss'

export const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}
