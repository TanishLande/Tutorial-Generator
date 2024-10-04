'use client';
import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PlanCard = ({ plan, isSelected, onSelect, billingCycle }: { plan: any, isSelected: boolean, onSelect: (id: string) => void, billingCycle: string }) => (
  <Card 
    className={`cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`}
    onClick={() => onSelect(plan.id)}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{plan.title}</h3>
        {isSelected && <Check className="w-5 h-5 text-blue-500" />}
      </div>
      <p className="text-3xl font-bold mb-2">
        ₹{billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice} 
        <span className="text-sm font-normal">/ month</span>
      </p>
      <p className="text-sm mb-4">
        ₹{plan[billingCycle === 'annual' ? 'annualPrice' : 'monthlyPrice']} billed {billingCycle === 'annual' ? 'annually' : 'monthly'}
        {billingCycle === 'annual' && <span className="ml-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">SAVE {plan.savePercentage}</span>}
      </p>
      <ul className="space-y-2">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
const FloatingButton = ({ selectedPlan, billingCycle }: { selectedPlan: any, billingCycle: string }) => (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 m-2">
      <div className="bg-gradient-to-r from-black via-blue-500 to-blue-800 p-6  rounded-lg shadow-lg text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">{selectedPlan.title}</h2>
            <p className="text-3xl font-bold mb-1">
              ₹{selectedPlan[billingCycle === 'annual' ? 'annualPrice' : 'monthlyPrice']}
              <span className="text-sm font-normal"> / {billingCycle === 'annual' ? 'year' : 'month'}</span>
            </p>
            <p className="text-sm">Billed {billingCycle === 'annual' ? 'annually' : 'monthly'}</p>
          </div>
          <Button className="w-full md:w-auto bg-white text-blue-900 hover:bg-blue-100 py-3 rounded-full transition duration-200 shadow-md">
            Subscribe & Get AI Learning
          </Button>
        </div>
        <p className="text-xs">
          By subscribing, you agree to our Terms of Service. Access AI-generated tutorials, book summaries, and connect with fellow learners.
        </p>
      </div>
    </div>
  );
  
  
  

const ComparisonTable = ({ plans }: { plans: any[] }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold mb-6">Compare AI Learning Features</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Feature</th>
            {plans.map((plan: any) => (
              <th key={plan.id} className="text-center py-2">{plan.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { category: 'AI-Generated Content', features: ['Personalized tutorials', 'Book summaries', 'Topic reviews', 'AI-powered study plans'] },
            { category: 'Learning Community', features: ['Connect with similar learners', 'AI-moderated study groups', 'Expert Q&A sessions', 'Progress tracking'] },
            { category: 'Advanced Features', features: ['Custom AI tutor', 'Adaptive learning paths', 'Multi-language support'] },
          ].map(section => (
            <React.Fragment key={section.category}>
              <tr className="border-b">
                <td colSpan={4} className="py-4 font-bold">{section.category}</td>
              </tr>
              {section.features.map(feature => (
                <tr key={feature} className="border-b">
                  <td className="py-2">{feature}</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center py-2">
                      {plan.allFeatures.includes(feature) ? <Check className="inline w-5 h-5 text-green-500" /> : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PremiumPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('annual');

  const plans = [
    {
      id: 'basic',
      title: 'AI Learner',
      monthlyPrice: '215.87',
      annualPrice: '2,590.48',
      annualMonthlyPrice: '215.87',
      savePercentage: '11%',
      features: [
        'Basic AI-generated tutorials',
        'Limited book summaries',
        'Connect with learners',
        'Basic study plans'
      ],
      allFeatures: [
        'Personalized tutorials', 'Book summaries', 'Topic reviews', 'AI-powered study plans',
        'Connect with similar learners', 'AI-moderated study groups'
      ]
    },
    {
      id: 'premium',
      title: 'AI Scholar',
      monthlyPrice: '566.67',
      annualPrice: '6,800',
      annualMonthlyPrice: '566.67',
      savePercentage: '12%',
      features: [
        'Advanced AI-generated content',
        'Unlimited book summaries',
        'Expert Q&A sessions',
        'Custom AI tutor'
      ],
      allFeatures: [
        'Personalized tutorials', 'Book summaries', 'Topic reviews', 'AI-powered study plans',
        'Connect with similar learners', 'AI-moderated study groups', 'Expert Q&A sessions', 'Progress tracking',
        'Custom AI tutor', 'Adaptive learning paths'
      ]
    },
    {
      id: 'premiumPlus',
      title: 'AI Genius',
      monthlyPrice: '1,133.33',
      annualPrice: '13,600',
      annualMonthlyPrice: '1,133.33',
      savePercentage: '12%',
      features: [
        'All AI Scholar features',
        'Priority access to new AI tools',
        'Multi-language AI support',
        'Personalized learning ecosystem'
      ],
      allFeatures: [
        'Personalized tutorials', 'Book summaries', 'Topic reviews', 'AI-powered study plans',
        'Connect with similar learners', 'AI-moderated study groups', 'Expert Q&A sessions', 'Progress tracking',
        'Custom AI tutor', 'Adaptive learning paths', 'Multi-language support'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Removed the close button here */}
      <h1 className="text-3xl font-bold text-center mb-2">Upgrade Your AI Learning Journey</h1>
      <p className="text-center text-gray-600 mb-6">
        Experience personalized AI-generated tutorials, connect with fellow learners, and accelerate your growth.
        <br />
        (For organizations, <a href="#" className="text-blue-500 underline">explore our team plans</a>)
      </p>
      
      <div className="flex justify-center mb-6">
        <Button 
          variant={billingCycle === 'annual' ? 'default' : 'outline'}
          onClick={() => setBillingCycle('annual')}
          className="mr-2"
        >
          Annual <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">Best Value</span>
        </Button>
        <Button 
          variant={billingCycle === 'monthly' ? 'default' : 'outline'}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
            billingCycle={billingCycle}
          />
        ))}
      </div>

      <FloatingButton 
        selectedPlan={plans.find(p => p.id === selectedPlan) || plans[0]} 
        billingCycle={billingCycle}
      />

      <ComparisonTable plans={plans} />
    </div>
  );
};

export default PremiumPlansPage;