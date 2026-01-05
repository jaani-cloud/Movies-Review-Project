export default function Button({children , onClick , isActive}) {
    return (
        <button
            onClick={onClick}
            className={isActive ? "home-btn-active" : "home-btn"}
        >
            {children}
        </button>
    )
};
