export default function Button({children , onClick , isActive}) {
    return (
        <button
            onClick={onClick}
            className={isActive ? "Home-btn-active" : "Home-btn"}
        >
            {children}
        </button>
    )
};
