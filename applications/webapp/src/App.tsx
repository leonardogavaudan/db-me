import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Search } from './components/Search';

export function App() {
	const [showModal, setShowModal] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showModal && modalRef.current) {
			const focusableElement = modalRef.current.querySelector('input');
			if (focusableElement instanceof HTMLInputElement) {
				focusableElement.focus();
			}
		}
	}, [showModal]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				if (!showModal) {
					setShowModal(true);
				}
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [showModal]);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row justify-center pt-64 pl-2">
				<Search className="w-2/5" onClick={() => setShowModal(true)} />
			</div>

			<Modal
				ref={modalRef}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				className="w-1/2"
			>
				<input type="text" className="w-full focus:outline-none" />
			</Modal>
		</div>
	);
}
