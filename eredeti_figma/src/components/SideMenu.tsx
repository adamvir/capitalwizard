import { ShoppingBag, CreditCard, Gift, Sparkles, MessageSquare } from 'lucide-react';

export function SideMenu() {
  const menuItems = [
    { icon: ShoppingBag, label: 'Bolt', color: 'bg-yellow-500' },
    { icon: MessageSquare, label: 'Üzenetek', color: 'bg-amber-600' },
    { icon: Gift, label: 'Ajándék', color: 'bg-amber-700' },
    { icon: Sparkles, label: 'Speciális', color: 'bg-orange-600' },
  ];

  return (
    <div className="absolute left-2 top-[111px] space-y-2 z-10">
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="group relative flex flex-col items-center gap-1"
        >
          <div className={`w-14 h-14 ${item.color} rounded-xl shadow-lg flex items-center justify-center border-2 border-black/20 transition-transform hover:scale-105 active:scale-95`}>
            <item.icon className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-xs drop-shadow-md">{item.label}</span>
        </button>
      ))}
    </div>
  );
}