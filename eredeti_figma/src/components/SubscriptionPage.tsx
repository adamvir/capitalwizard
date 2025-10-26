import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Crown, 
  Zap, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Sparkles,
  Check,
  Star,
  Flame,
  Trophy,
  Target,
  Users,
  Download,
  Infinity
} from 'lucide-react';

interface SubscriptionPageProps {
  onBack: () => void;
  subscriptionTier: 'free' | 'pro' | 'master';
  onSubscriptionChange: (tier: 'free' | 'pro' | 'master') => void;
}

type BillingPeriod = 'monthly' | 'yearly';

interface Plan {
  id: string;
  name: string;
  icon: any;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  price: {
    monthly: number;
    yearly: number;
  };
  popular?: boolean;
  features: {
    icon: any;
    text: string;
    highlight?: boolean;
  }[];
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Alapszint',
    icon: BookOpen,
    color: 'slate',
    gradientFrom: 'from-slate-600',
    gradientTo: 'to-slate-700',
    borderColor: 'border-slate-500/50',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { icon: BookOpen, text: '3 lecke naponta' },
      { icon: Trophy, text: '5 küzdőtéri játék naponta' },
      { icon: Star, text: 'Alapvető könyvtár hozzáférés' },
      { icon: TrendingUp, text: 'Napi sorozat követés' },
      { icon: Target, text: 'Alapvető statisztikák' },
    ],
    badge: 'Ingyenes',
  },
  {
    id: 'pro',
    name: 'Professzionális',
    icon: Zap,
    color: 'purple',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-600',
    borderColor: 'border-purple-400/50',
    price: {
      monthly: 4990,
      yearly: 49990,
    },
    popular: true,
    features: [
      { icon: Infinity, text: 'Korlátlan leckék', highlight: true },
      { icon: Infinity, text: 'Korlátlan küzdőtér játékok', highlight: true },
      { icon: BookOpen, text: 'Teljes könyvtár (15 könyv)' },
      { icon: Download, text: 'Offline mód' },
      { icon: TrendingUp, text: 'Részletes statisztikák' },
      { icon: Flame, text: '2x gyorsabb XP gyűjtés' },
      { icon: Crown, text: 'Exkluzív jelvények' },
    ],
    badge: 'Legtöbb választás',
  },
  {
    id: 'ultimate',
    name: 'Mester',
    icon: Crown,
    color: 'yellow',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-600',
    borderColor: 'border-yellow-400/50',
    price: {
      monthly: 9990,
      yearly: 99990,
    },
    features: [
      { icon: Sparkles, text: 'Minden Pro funkció', highlight: true },
      { icon: Users, text: '1-1 mentori támogatás' },
      { icon: Target, text: 'Személyre szabott tanulási terv' },
      { icon: Trophy, text: 'Exkluzív kihívások' },
      { icon: Star, text: 'Korai hozzáférés új funkciókhoz' },
      { icon: Shield, text: 'Prioritás támogatás' },
      { icon: Crown, text: 'Arany mester jelvény' },
      { icon: Flame, text: '3x gyorsabb XP gyűjtés' },
    ],
    badge: 'Legjobb érték',
  },
];

export function SubscriptionPage({ onBack, subscriptionTier, onSubscriptionChange }: SubscriptionPageProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('yearly');
  
  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      onSubscriptionChange('free');
    } else if (planId === 'pro') {
      onSubscriptionChange('pro');
    } else if (planId === 'ultimate') {
      onSubscriptionChange('master');
    }
  };

  const isCurrentPlan = (planId: string) => {
    if (planId === 'ultimate') {
      return subscriptionTier === 'master';
    }
    return subscriptionTier === planId;
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Ingyenes';
    return `${price.toLocaleString('hu-HU')} Ft`;
  };

  const getMonthlyPrice = (plan: Plan) => {
    if (plan.price.monthly === 0) return formatPrice(0);
    if (billingPeriod === 'yearly') {
      const monthly = Math.floor(plan.price.yearly / 12);
      return `${monthly.toLocaleString('hu-HU')} Ft`;
    }
    return formatPrice(plan.price.monthly);
  };

  const getSavings = (plan: Plan) => {
    if (plan.price.yearly === 0) return 0;
    const yearlyMonthly = plan.price.yearly / 12;
    const savings = ((plan.price.monthly - yearlyMonthly) / plan.price.monthly) * 100;
    return Math.round(savings);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Crystal Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-24 h-32 bg-gradient-to-br from-purple-600/20 to-transparent transform rotate-12 rounded-t-lg blur-sm animate-pulse"></div>
        <div className="absolute top-40 left-8 w-20 h-28 bg-gradient-to-br from-yellow-600/20 to-transparent transform -rotate-12 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-60 right-12 w-16 h-24 bg-gradient-to-br from-pink-600/20 to-transparent transform rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-6 w-14 h-20 bg-gradient-to-br from-cyan-600/20 to-transparent transform -rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900/95 via-purple-900/80 to-slate-900/95 backdrop-blur-md border-b border-purple-500/30 p-3 shadow-lg shadow-purple-900/50 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-lg flex items-center justify-center transition-all border border-slate-600/50"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h1 className="text-white">Előfizetési Csomagok</h1>
            </div>
            <p className="text-purple-300 text-xs">Válaszd a számodra megfelelő csomagot</p>
          </div>
          {subscriptionTier !== 'free' && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`px-2 py-1 rounded-lg border ${
                subscriptionTier === 'master' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400/50'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50'
              }`}
            >
              <span className="text-white text-xs">
                {subscriptionTier === 'master' ? 'Master előfizető' : 'Pro előfizető'}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 pb-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-3"
          >
            <Crown className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
          </motion.div>
          <h2 className="text-white text-2xl mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Fejleszd tudásod prémiummal
          </h2>
          <p className="text-slate-300 text-sm">
            Korlátlan hozzáférés, egyéni tanulási út, és több!
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className={`text-sm transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Havi
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-slate-700 rounded-full transition-all border border-slate-600"
          >
            <motion.div
              animate={{ x: billingPeriod === 'yearly' ? 28 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-sm transition-colors ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Éves
            </span>
            {billingPeriod === 'yearly' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 px-2 py-0.5 rounded-full border border-green-400/50"
              >
                <span className="text-white text-xs">-17%</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-4 py-1 rounded-full border-2 border-purple-400 shadow-lg shadow-purple-500/50"
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      <span className="text-white text-xs">{plan.badge}</span>
                      <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    </div>
                  </motion.div>
                </div>
              )}

              {plan.badge && !plan.popular && (
                <div className="absolute -top-2 right-4 z-10">
                  <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-3 py-1 rounded-full border border-slate-600">
                    <span className="text-slate-300 text-xs">{plan.badge}</span>
                  </div>
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ scale: plan.id === 'free' ? 1 : 1.02 }}
                className={`relative bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-800/80 rounded-2xl p-5 border-2 ${
                  plan.popular ? 'border-purple-500/80 shadow-2xl shadow-purple-500/30' : plan.borderColor
                } backdrop-blur-sm overflow-hidden ${plan.id === 'free' ? '' : 'cursor-pointer'}`}
              >
                {/* Glow effect for popular */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse pointer-events-none" />
                )}

                {/* Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo} rounded-xl flex items-center justify-center shadow-lg`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white">{plan.name}</h3>
                      <p className="text-slate-400 text-xs">
                        {plan.id === 'free' ? 'Kezdőknek' : plan.id === 'pro' ? 'Legtöbbeknek' : 'Elkötelezetteknek'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="relative mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} bg-clip-text text-transparent`}>
                      {getMonthlyPrice(plan)}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-slate-400 text-sm">/hó</span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                    <div className="mt-1">
                      <p className="text-slate-400 text-xs">
                        {formatPrice(plan.price.yearly)} évente
                      </p>
                      <p className="text-green-400 text-xs">
                        Spórolj {getSavings(plan)}%-ot évente!
                      </p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-5">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 + idx * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-5 h-5 rounded-full ${
                        feature.highlight 
                          ? `bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo}` 
                          : 'bg-slate-700'
                      } flex items-center justify-center flex-shrink-0`}>
                        <Check className={`w-3 h-3 ${feature.highlight ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                      <span className={`text-sm ${feature.highlight ? 'text-white' : 'text-slate-300'}`}>
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: isCurrentPlan(plan.id) ? 1 : 1.02 }}
                  whileTap={{ scale: isCurrentPlan(plan.id) ? 1 : 0.98 }}
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 rounded-xl transition-all border-2 flex items-center justify-center ${
                    isCurrentPlan(plan.id)
                      ? 'bg-slate-700/50 text-slate-300 border-slate-600 cursor-default'
                      : `bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white border-transparent shadow-lg ${
                          plan.popular ? 'shadow-purple-500/50' : ''
                        }`
                  }`}
                  disabled={isCurrentPlan(plan.id)}
                >
                  <span className="text-sm text-center">
                    {isCurrentPlan(plan.id) ? 'Jelenlegi csomag' : 'Váltás erre a csomagra'}
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-slate-800/60 to-purple-900/30 rounded-xl p-5 border border-purple-500/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-white">Miért érdemes prémiumra váltani?</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BookOpen, text: 'Teljes könyvtár' },
              { icon: Infinity, text: 'Korlátlan tanulás' },
              { icon: TrendingUp, text: 'Gyorsabb fejlődés' },
              { icon: Shield, text: 'Prioritás támogatás' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-900/40 rounded-lg p-2.5 border border-slate-700/50">
                <benefit.icon className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300 text-xs">{benefit.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-2">
            <Shield className="w-4 h-4" />
            <span>Biztonságos fizetés • Bármikor lemondható</span>
          </div>
          <p className="text-slate-500 text-xs">
            Több mint 10,000 tanuló fejleszti pénzügyi tudását a platformunkon
          </p>
        </motion.div>
      </div>
    </div>
  );
}
