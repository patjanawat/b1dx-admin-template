import { Button } from '@b1dx/ui';
import { getCurrentYear } from 'b1dx/utils';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">b1dx</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Landing Web</h1>
        <p className="mt-3 text-slate-600">
          Uses shared UI and utils from the monorepo. Current year: {getCurrentYear()}.
        </p>
        <div className="mt-6 flex gap-3">
          <Button>Get Started</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </div>
  );
}
