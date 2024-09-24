"use client";

import { useRouter } from 'next/navigation';


export default function Tutorial() {
    const cardsData = [
        { title: 'Javascript Tutorial', description: 'This is the description for card 1.', pagePath: '/tutorial/js' },
        { title: 'Python Tutorial', description: 'Coming Soon ...' },
        { title: 'Java Tutorial', description: 'Coming Soon ...' },
        { title: 'Machine Learning Tutorial', description: 'Coming Soon ...' },
      ];
      const router = useRouter();

      const handleRouteClick = (pagePath) => {
        router.push(pagePath);
      };
    return (
        <>
      <div className="container mx-auto px-4 py-48">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.description}</p>
            
            <button className='text-green-500'
             onClick={ () => {
                handleRouteClick(card.pagePath)
             }}
            >Read More</button>
          </div>
        ))}
      </div>
    </div>
        </>
    )
}