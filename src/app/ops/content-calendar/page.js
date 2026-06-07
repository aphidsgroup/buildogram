import ContentCalendarClient from './ContentCalendarClient';

export const metadata = {
  title: 'Content Calendar | Buildogram Ops',
};

export default function ContentCalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Proof Assets Content Calendar</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ContentCalendarClient />
      </main>
    </div>
  );
}
