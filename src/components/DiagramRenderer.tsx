import React from 'react';
import { VisualDiagram } from '../types';
import { Layers, ArrowRight, Database, Server, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DiagramRendererProps {
  diagram: VisualDiagram;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram }) => {
  if (!diagram) return null;

  switch (diagram.type) {
    case 'oops-concepts':
      return (
        <div className="my-6 rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-emerald-800 uppercase">
              Visual Concept Architecture
            </span>
            <span className="text-xs text-emerald-600">The 4 Pillars of OOPS</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center shadow-xs">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
                1
              </div>
              <h4 className="text-sm font-bold text-amber-900">Encapsulation</h4>
              <p className="mt-1 text-xs text-amber-700">Data hiding & bundling within class (private fields + public properties)</p>
            </div>

            <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-center shadow-xs">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                2
              </div>
              <h4 className="text-sm font-bold text-sky-900">Abstraction</h4>
              <p className="mt-1 text-xs text-sky-700">Exposing essential features while hiding internal complexities</p>
            </div>

            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center shadow-xs">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                3
              </div>
              <h4 className="text-sm font-bold text-emerald-900">Inheritance</h4>
              <p className="mt-1 text-xs text-emerald-700">Parent-child relationship for code reusability & specialization</p>
            </div>

            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-center shadow-xs">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                4
              </div>
              <h4 className="text-sm font-bold text-indigo-900">Polymorphism</h4>
              <p className="mt-1 text-xs text-indigo-700">Many forms (Overloading at compile-time / Overriding at runtime)</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-700 shadow-xs sm:w-auto">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              CLASS: Blueprint / Template
            </div>
            <ArrowRight className="hidden h-4 w-4 text-slate-400 sm:block" />
            <div className="flex w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-50/80 p-2.5 text-xs font-semibold text-blue-800 shadow-xs sm:w-auto">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-600"></span>
              OBJECT: Physical Instance (State + Memory)
            </div>
          </div>
        </div>
      );

    case 'inheritance-types':
      return (
        <div className="my-6 rounded-xl border border-blue-100 bg-blue-50/30 p-5">
          <div className="mb-3 text-xs font-semibold tracking-wider text-blue-800 uppercase">
            Inheritance Structure Hierarchy
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Single</div>
              <div className="my-2 rounded bg-blue-100 py-1 text-xs font-semibold text-blue-900">BaseClass</div>
              <div className="text-slate-400">↓</div>
              <div className="rounded bg-indigo-100 py-1 text-xs font-semibold text-indigo-900">DerivedClass</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Multilevel</div>
              <div className="my-1 rounded bg-slate-100 py-1 text-xs font-semibold text-slate-800">GrandParent</div>
              <div className="text-slate-400">↓</div>
              <div className="rounded bg-blue-100 py-1 text-xs font-semibold text-blue-800">Parent</div>
              <div className="text-slate-400">↓</div>
              <div className="rounded bg-indigo-100 py-1 text-xs font-semibold text-indigo-900">Child</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase">Multiple in C#</div>
              <div className="my-1 flex justify-center gap-2">
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-800">1 Base Class</span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">Interface(s)</span>
              </div>
              <div className="text-slate-400">↓</div>
              <div className="rounded bg-indigo-100 py-1 text-xs font-semibold text-indigo-900">DerivedClass</div>
              <span className="mt-1 block text-[10px] text-amber-700">Prevents Diamond Conflict</span>
            </div>
          </div>
        </div>
      );

    case 'sql-joins':
      return (
        <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="mb-4 text-xs font-semibold tracking-wider text-slate-800 uppercase">
            SQL Server Joins Visual Venn Diagrams
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="relative mb-2 flex h-16 w-24 items-center justify-center">
                <div className="absolute left-2 h-12 w-12 rounded-full border border-slate-400 bg-white opacity-80"></div>
                <div className="absolute right-2 h-12 w-12 rounded-full border border-slate-400 bg-white opacity-80"></div>
                <div className="z-10 h-12 w-6 rounded-full bg-blue-500 opacity-90"></div>
              </div>
              <span className="text-xs font-bold text-slate-800">INNER JOIN</span>
              <span className="text-[10px] text-slate-500 text-center">Matching records in both tables</span>
            </div>

            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="relative mb-2 flex h-16 w-24 items-center justify-center">
                <div className="absolute left-2 h-12 w-12 rounded-full border border-blue-500 bg-blue-400 opacity-80"></div>
                <div className="absolute right-2 h-12 w-12 rounded-full border border-slate-400 bg-white opacity-80"></div>
                <div className="z-10 h-12 w-6 rounded-full bg-blue-600 opacity-90"></div>
              </div>
              <span className="text-xs font-bold text-slate-800">LEFT OUTER JOIN</span>
              <span className="text-[10px] text-slate-500 text-center">All from left + matched from right</span>
            </div>

            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="relative mb-2 flex h-16 w-24 items-center justify-center">
                <div className="absolute left-2 h-12 w-12 rounded-full border border-slate-400 bg-white opacity-80"></div>
                <div className="absolute right-2 h-12 w-12 rounded-full border border-blue-500 bg-blue-400 opacity-80"></div>
                <div className="z-10 h-12 w-6 rounded-full bg-blue-600 opacity-90"></div>
              </div>
              <span className="text-xs font-bold text-slate-800">RIGHT OUTER JOIN</span>
              <span className="text-[10px] text-slate-500 text-center">All from right + matched from left</span>
            </div>

            <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="relative mb-2 flex h-16 w-24 items-center justify-center">
                <div className="absolute left-2 h-12 w-12 rounded-full border border-blue-500 bg-blue-400 opacity-80"></div>
                <div className="absolute right-2 h-12 w-12 rounded-full border border-blue-500 bg-blue-400 opacity-80"></div>
                <div className="z-10 h-12 w-6 rounded-full bg-blue-600 opacity-90"></div>
              </div>
              <span className="text-xs font-bold text-slate-800">FULL OUTER JOIN</span>
              <span className="text-[10px] text-slate-500 text-center">All records from both tables</span>
            </div>
          </div>
        </div>
      );

    case 'boxing-unboxing':
      return (
        <div className="my-6 rounded-xl border border-amber-200 bg-amber-50/40 p-5">
          <div className="mb-3 text-xs font-semibold tracking-wider text-amber-800 uppercase">
            Memory Layout: Stack vs Heap
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
              <div className="mb-2 text-xs font-bold text-slate-600">STACK MEMORY (Fast, Value Types)</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded bg-slate-100 p-2 text-xs font-mono">
                  <span>int num = 100</span>
                  <span className="text-slate-500">[100]</span>
                </div>
                <div className="flex items-center justify-between rounded bg-blue-50 p-2 text-xs font-mono text-blue-700">
                  <span>object obj</span>
                  <span>ref pointer ➔ Heap</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
              <div className="mb-2 text-xs font-bold text-slate-600">HEAP MEMORY (Dynamic, Reference Types)</div>
              <div className="rounded border border-dashed border-amber-300 bg-amber-50 p-3 text-center text-xs">
                <div className="font-semibold text-amber-900">Boxed Object on Managed Heap</div>
                <div className="mt-1 font-mono text-amber-700">Type MethodTable + Value: 100</div>
                <span className="mt-2 inline-block rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  Garbage Collector Managed
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-amber-800">
            <span>⚡ <strong>Boxing</strong>: Stack ➔ Heap (Implicit, Slow)</span>
            <span>⚡ <strong>Unboxing</strong>: Heap ➔ Stack (Explicit cast `(int)obj`)</span>
          </div>
        </div>
      );

    case 'gc-generations':
      return (
        <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="mb-3 text-xs font-semibold tracking-wider text-slate-800 uppercase">
            .NET Garbage Collector (GC) Managed Heap Generations
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3">
              <div className="font-bold text-emerald-900">Generation 0</div>
              <div className="mt-1 text-[11px] text-emerald-700">Short-lived objects</div>
              <span className="mt-2 inline-block rounded bg-emerald-200 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-900">
                Most Frequent GC
              </span>
            </div>
            <div className="rounded-lg border border-sky-300 bg-sky-50 p-3">
              <div className="font-bold text-sky-900">Generation 1</div>
              <div className="mt-1 text-[11px] text-sky-700">Buffer zone</div>
              <span className="mt-2 inline-block rounded bg-sky-200 px-1.5 py-0.5 text-[10px] font-semibold text-sky-900">
                Surviving Gen 0
              </span>
            </div>
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
              <div className="font-bold text-amber-900">Generation 2</div>
              <div className="mt-1 text-[11px] text-amber-700">Long-lived & LOH</div>
              <span className="mt-2 inline-block rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                Least Frequent (Full GC)
              </span>
            </div>
          </div>
        </div>
      );

    case 'middleware-pipeline':
      return (
        <div className="my-6 rounded-xl border border-indigo-100 bg-indigo-50/30 p-5">
          <div className="mb-3 text-xs font-semibold tracking-wider text-indigo-800 uppercase">
            ASP.NET Core Middleware Pipeline Order
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {['ExceptionHandler', 'HSTS / HTTPS', 'StaticFiles', 'Routing', 'CORS', 'Authentication', 'Authorization', 'Endpoint / Action'].map(
              (name, idx, arr) => (
                <React.Fragment key={name}>
                  <div className="rounded-md border border-indigo-200 bg-white px-2.5 py-1.5 font-medium text-indigo-900 shadow-2xs">
                    {name}
                  </div>
                  {idx < arr.length - 1 && <span className="text-indigo-400">➔</span>}
                </React.Fragment>
              )
            )}
          </div>
        </div>
      );

    case 'jwt-anatomy':
      return (
        <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="mb-3 text-xs font-semibold tracking-wider text-slate-800 uppercase">
            JWT Token 3-Part Architecture
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <span className="rounded bg-rose-200 px-2 py-0.5 font-bold text-rose-800">1. HEADER</span>
              <p className="mt-2 font-mono text-[11px] text-rose-900">{"{\"alg\": \"HS256\", \"typ\": \"JWT\"}"}</p>
              <p className="mt-1 text-[11px] text-rose-700">Identifies algorithm & token type</p>
            </div>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
              <span className="rounded bg-purple-200 px-2 py-0.5 font-bold text-purple-800">2. PAYLOAD</span>
              <p className="mt-2 font-mono text-[11px] text-purple-900">{"{\"sub\": \"user_1\", \"role\": \"admin\"}"}</p>
              <p className="mt-1 text-[11px] text-purple-700">Contains user claims & expiry (exp)</p>
            </div>
            <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3">
              <span className="rounded bg-cyan-200 px-2 py-0.5 font-bold text-cyan-800">3. SIGNATURE</span>
              <p className="mt-2 font-mono text-[11px] text-cyan-900">HMACSHA256(header.payload, secret)</p>
              <p className="mt-1 text-[11px] text-cyan-700">Guarantees token authenticity</p>
            </div>
          </div>
        </div>
      );

    case 'solid-principles':
      return (
        <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="mb-3 text-xs font-semibold tracking-wider text-slate-800 uppercase">
            SOLID Design Principles Matrix
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-5 text-center">
            <div className="rounded-lg bg-blue-600 p-3 text-white">
              <div className="text-2xl font-black">S</div>
              <div className="mt-1 text-xs font-semibold">Single Responsibility</div>
            </div>
            <div className="rounded-lg bg-emerald-600 p-3 text-white">
              <div className="text-2xl font-black">O</div>
              <div className="mt-1 text-xs font-semibold">Open / Closed</div>
            </div>
            <div className="rounded-lg bg-amber-500 p-3 text-white">
              <div className="text-2xl font-black">L</div>
              <div className="mt-1 text-xs font-semibold">Liskov Substitution</div>
            </div>
            <div className="rounded-lg bg-indigo-600 p-3 text-white">
              <div className="text-2xl font-black">I</div>
              <div className="mt-1 text-xs font-semibold">Interface Segregation</div>
            </div>
            <div className="rounded-lg bg-violet-600 p-3 text-white">
              <div className="text-2xl font-black">D</div>
              <div className="mt-1 text-xs font-semibold">Dependency Inversion</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
