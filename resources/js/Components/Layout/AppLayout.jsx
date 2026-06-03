import Navbar from './Navbar';
//import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* <Sidebar /> */}

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}