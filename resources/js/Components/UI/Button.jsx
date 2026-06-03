export default function Button({
    children,
    onClick,
    type = "button"
}) {

    return (

        <button
            type={type}
            onClick={onClick}
            className="
                bg-[#1F3A5F]
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-[#244b88]
                transition
            "
        >
            {children}
        </button>

    );
}