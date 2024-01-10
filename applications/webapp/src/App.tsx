import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Search } from './components/Search';
import classNames from 'classnames';

const predefinedActions = [
	'create new contact',
	'search contacts',
	'edit contact',
];

export function App() {
	const [showModal, setShowModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [activeSearchResultsIndex, setActiveSearchResultsIndex] = useState(0);
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

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (showModal && activeSearchResultsIndex < searchResults.length - 1) {
					setActiveSearchResultsIndex((index) => index + 1);
				}
			}

			if (event.key === 'ArrowUp') {
				event.preventDefault();
				if (showModal && activeSearchResultsIndex > 0) {
					setActiveSearchResultsIndex((index) => index - 1);
				}
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [showModal, activeSearchResultsIndex, searchResults.length]);

	const handleSearchBarOnClick = () => {
		setShowModal(true);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const query = event.target.value;

		setSearchQuery(query);

		if (query) {
			const filteredResults = predefinedActions.filter((action) =>
				action.toLowerCase().includes(query),
			);
			setSearchResults(filteredResults);
		} else {
			setSearchResults([]);
		}
	};

	const handleModalClose = () => {
		setShowModal(false);
		setSearchQuery('');
		setSearchResults([]);
	};

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-row justify-center pt-64 pl-2">
				<Search className="w-2/5" onClick={handleSearchBarOnClick} />
			</div>

			<Modal
				ref={modalRef}
				isOpen={showModal}
				onClose={handleModalClose}
				className="w-1/2 fixed top-1/4"
			>
				<input
					type="text"
					className="w-full focus:outline-none p-5"
					value={searchQuery}
					onChange={handleSearchChange}
				/>

				<div
					className={classNames('bg-slate-300 opacity-50 w-full p-4', {
						hidden: searchResults.length === 0,
					})}
				>
					{searchResults.map((result, index) => (
						<div
							key={index}
							className={classNames([
								'px-2 py-2 my-2',
								{
									'bg-sky-900 text-white rounded-lg':
										index === activeSearchResultsIndex,
								},
							])}
						>
							{result}
						</div>
					))}
				</div>
			</Modal>
		</div>
	);
}
