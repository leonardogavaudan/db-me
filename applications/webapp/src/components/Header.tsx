import classNames from 'classnames';

export interface SearchProps {
	className?: string;
}

export function Header({ className }: SearchProps) {
	return (
		<div
			className={classNames(
				'flex',
				'flex-row',
				'justify-center',
				'pt-8',
				'pb-10',
				...(className ?? '').split(' '),
			)}
		>
			<h1 className="text-4xl">dbme</h1>
			{/* <img src={addIcon} alt="Logo" className="w-10 h-10" /> */}
		</div>
	);
}
