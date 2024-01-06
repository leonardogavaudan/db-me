import classNames from 'classnames';

export interface SearchProps {
	className?: string;
	onClick: () => void;
}

export function Search({ className, onClick }: SearchProps) {
	const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	const shortcutKey = isMac ? '⌘K' : 'Ctrl+K';

	return (
		<button
			className={classNames(
				'flex',
				'justify-between',
				'p-3',
				'border',
				'border-gray-200',
				'border-2',
				'text-gray-400',
				'rounded-2xl',
				...(className ?? '').split(' '),
			)}
			onClick={onClick}
		>
			Search
			<kbd>{shortcutKey}</kbd>
		</button>
	);
}
