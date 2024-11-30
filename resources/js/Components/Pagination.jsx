import { router } from "@inertiajs/react";

export default function Pagination({ links, currentPage, setCurrentPage }) {
    const handlePageChange = (url) => {
        const pageParam = new URL(url).searchParams.get('page');
        setCurrentPage(pageParam);
        router.get(url, { preserveState: true });
    };

    return (
        <nav aria-label="Pagination">
            <ul className="pagination">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                    >
                        <a
                            href={link.url || '#'}
                            className="page-link"
                            onClick={(e) => {
                                e.preventDefault();
                                if (link.url) handlePageChange(link.url);
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
