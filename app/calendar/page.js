import Header from "@/components/Header";
import ReleaseCalendar from "@/components/ReleaseCalendar";

export const metadata = {
    title: "Release Calendar | MovieDB",
    description: "Upcoming and recent movie releases by month.",
};

export default function CalendarPage() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-2">Release Calendar</h1>
                <p className="text-gray-400 mb-8">
                    Browse movie releases by date. Poster thumbnails mark each film&apos;s release day —
                    click one to view details, or switch to list view. Today is outlined in red.
                </p>
                <ReleaseCalendar />
            </main>
        </>
    );
}
