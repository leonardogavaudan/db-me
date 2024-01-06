import classNames from 'classnames';
import React, { useEffect, forwardRef } from 'react';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
	children: React.ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
	{ isOpen, onClose, className, children },
	ref,
) {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	const handleClickOutside = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
			onClick={handleClickOutside}
		>
			<div className={classNames('bg-white shadow-lg', className)} ref={ref}>
				{children}
			</div>
		</div>
	);
});
