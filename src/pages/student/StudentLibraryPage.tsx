import React, { useState, useEffect } from 'react';
import {
  Library,
  Search,
  BookOpen,
  Calendar,
  CheckCircle,
  Bookmark,
  Clock,
  MapPin,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { LibraryBook } from '../../types';

export const StudentLibraryPage: React.FC = () => {
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [search, setSearch] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState<string | null>(null);

  useEffect(() => {
    api.getLibraryBooks().then(data => setBooks(data));
  }, []);

  const handleReserve = async (bookId: string, title: string) => {
    const res = await api.reserveBook(bookId);
    if (res.success) {
      setBooks(prev =>
        prev.map(b => (b.id === bookId ? { ...b, isReserved: true, availableCopies: Math.max(0, b.availableCopies - 1) } : b))
      );
      setReserveSuccess(`"${title}" has been reserved for 48 hours at Circulation Desk 2.`);
      setTimeout(() => setReserveSuccess(null), 3000);
    }
  };

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            AUTOMATED REPOSITORY & ARCHIVES
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Digital University Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            RFID book locator, real-time desk inventory, and digital hold reservation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search title, author, or ISBN..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
          />
        </div>
      </div>

      {reserveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{reserveSuccess}</span>
        </div>
      )}

      {/* Quick Summary Pill Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
          <span className="text-[11px] text-slate-400">Books Borrowed</span>
          <p className="text-xl font-bold text-white mt-1 font-mono">1 Active</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
          <span className="text-[11px] text-amber-400">Renewal Due</span>
          <p className="text-xl font-bold text-amber-300 mt-1 font-mono">Oct 10 (CLRS)</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
          <span className="text-[11px] text-slate-400">Catalog Volume</span>
          <p className="text-xl font-bold text-white mt-1 font-mono">48,200 Titles</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5">
          <span className="text-[11px] text-emerald-400">Seats in Library</span>
          <p className="text-xl font-bold text-emerald-300 mt-1 font-mono">158 Available</p>
        </div>
      </div>

      {/* Books Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(book => (
          <div
            key={book.id}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                  {book.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  book.availableCopies > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {book.availableCopies > 0 ? `${book.availableCopies} COPIES AVAILABLE` : 'ALL ISSUED'}
                </span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                {book.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{book.author}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">ISBN: {book.isbn}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{book.shelfLocation}</span>
              </div>

              {book.isBorrowedByStudent ? (
                <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                  Borrowed
                </span>
              ) : book.isReserved ? (
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  Reserved
                </span>
              ) : (
                <button
                  onClick={() => handleReserve(book.id, book.title)}
                  disabled={book.availableCopies === 0}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs disabled:opacity-40 hover:scale-105 transition-all shadow-md shadow-cyan-500/20"
                >
                  Reserve Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
