import { TABS } from "./OrderType";

function TabBar({ active, onChange, counts }) {
    return (
        <div
            className="flex border-b mb-5"
            style={{ borderColor: "var(--light-primary)" }}
        >
            {TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className="flex-1 font-bold py-2.5 text-lg  font-jost  transition-colors duration-200"
                    style={
                        active === tab
                            ? {
                                color: "var(--primary)",
                                borderBottom: "2px solid var(--primary)",
                                marginBottom: "-1px",
                            }
                            : { color: "var(--text)" }
                    }
                    onMouseEnter={(e) => {
                        if (active !== tab) e.currentTarget.style.color = "var(--primary)";
                    }}
                    onMouseLeave={(e) => {
                        if (active !== tab) e.currentTarget.style.color = "var(--text)";
                    }}
                >
                    {tab}
                    {counts[tab] > 0 && (
                        <span className="ml-1.5 text-[11px]" style={{ color: "var(--text)" }}>
                            ({counts[tab]})
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

export default TabBar;