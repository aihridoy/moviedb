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
                <h1 className="text-3xl font-bold mb-8">Release Calendar</h1>
                <ReleaseCalendar />
            </main>
        </>
    );
}
