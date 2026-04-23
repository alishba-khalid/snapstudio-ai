import { AppSidebar } from '@/components/app/app-sidebar';
import { BottomNav } from '@/components/app/bottom-nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background pb-20 md:pb-0">
      <AppSidebar />
      <main className="md:ml-64 flex-1">
        <div className="h-full w-full">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
