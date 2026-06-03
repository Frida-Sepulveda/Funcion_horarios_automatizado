export default function Table({
    headers,
    children
}) {

    return (

        <div className="overflow-x-auto bg-white rounded-lg shadow">

            <table className="min-w-full">

                <thead className="bg-[#1F3A5F] text-white">

                    <tr>

                        {headers.map((header, index) => (

                            <th
                                key={index}
                                className="px-4 py-3 text-left"
                            >
                                {header}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </div>
    );
}