import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle,
  Clock,
  Download,
  ShieldCheck,
  AlertCircle,
  Receipt,
  X,
  Sparkles
} from 'lucide-react';
import { api } from '../../services/api';
import { FeeRecord } from '../../types';

export const StudentFeesPage: React.FC = () => {
  const [feeRecord, setFeeRecord] = useState<FeeRecord | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState('30000');
  const [payMethod, setPayMethod] = useState('UPI Instant (GPay / PhonePe)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptModal, setReceiptModal] = useState<any>(null);

  useEffect(() => {
    api.getFees().then(data => setFeeRecord(data));
  }, []);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await api.payFee(Number(payAmount), payMethod);
      if (res.success) {
        setFeeRecord(res.fee);
        setIsProcessing(false);
        setShowPayModal(false);
        setReceiptModal(res.transaction);
      }
    } catch {
      setIsProcessing(false);
    }
  };

  if (!feeRecord) {
    return <div className="p-8 text-center text-slate-400">Loading university fee accounts...</div>;
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
            STUDENT BURSAR & FINANCIAL SERVICES
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Tuition & Academic Fee Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Academic Year 2026-2027 • B.Tech Computer Science & Engineering
          </p>
        </div>

        {feeRecord.remainingAmount > 0 && (
          <button
            onClick={() => setShowPayModal(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all flex items-center space-x-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Dues (₹{feeRecord.remainingAmount.toLocaleString()})</span>
          </button>
        )}
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Total Semester Fee</span>
          <p className="text-3xl font-black text-white mt-2 font-mono">
            ₹{feeRecord.totalFee.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Tuition + Lab + Campus Infrastructure</p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 shadow-lg">
          <span className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Amount Paid</span>
          </span>
          <p className="text-3xl font-black text-emerald-300 mt-2 font-mono">
            ₹{feeRecord.paidAmount.toLocaleString()}
          </p>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: `${(feeRecord.paidAmount / feeRecord.totalFee) * 100}%` }}
              className="bg-emerald-400 h-full rounded-full"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-lg">
          <span className="text-xs text-amber-400 font-medium flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Remaining Balance</span>
          </span>
          <p className="text-3xl font-black text-amber-300 mt-2 font-mono">
            ₹{feeRecord.remainingAmount.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Due Date: <b className="text-white">{feeRecord.dueDate}</b>
          </p>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Receipt className="w-4 h-4 text-cyan-400" />
            <span>Authenticated Payment Transactions</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">256-Bit Encrypted Gateway</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Amount</th>
                <th className="py-3.5 px-3">Payment Method</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {feeRecord.transactions.map(txn => (
                <tr key={txn.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-cyan-300">{txn.referenceNo}</td>
                  <td className="py-4 px-3 text-slate-300">{txn.date}</td>
                  <td className="py-4 px-3 font-mono font-bold text-white">₹{txn.amount.toLocaleString()}</td>
                  <td className="py-4 px-3 text-slate-400">{txn.method}</td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      SUCCESS
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setReceiptModal(txn)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center space-x-1 ml-auto"
                    >
                      <Download className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 shadow-2xl">
            <button
              onClick={() => setShowPayModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Instant Tuition Fee Payment</h3>
            <p className="text-xs text-slate-400 mb-4">Simulated University Payment Gateway (Zero fee surcharge).</p>

            <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Payment Amount (INR)</label>
                <input
                  type="number"
                  max={feeRecord.remainingAmount}
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Payment Gateway Option</label>
                <select
                  value={payMethod}
                  onChange={e => setPayMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  <option value="UPI Instant (GPay / PhonePe)">UPI Instant (Google Pay, PhonePe, Paytm)</option>
                  <option value="Net Banking (HDFC, SBI, ICICI)">Net Banking (HDFC, SBI, ICICI, Axis)</option>
                  <option value="Credit / Debit Card (Visa/Mastercard)">Credit / Debit Card (Visa, Mastercard, RuPay)</option>
                </select>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-slate-300 text-[11px]">
                Instant electronic receipt issued immediately upon authorization.
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm Payment of ₹${Number(payAmount).toLocaleString()}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-white">Payment Receipt Verified</h3>
            <p className="text-xs text-slate-400 mt-1">Official University Finance Ledger</p>

            <div className="my-4 p-4 rounded-2xl bg-slate-950/70 border border-white/5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono text-cyan-300">{receiptModal.referenceNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-mono font-bold text-emerald-400">₹{receiptModal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-white">{receiptModal.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="text-slate-200">{receiptModal.method}</span>
              </div>
            </div>

            <button
              onClick={() => setReceiptModal(null)}
              className="w-full py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
