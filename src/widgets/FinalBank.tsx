"use client";

import logoBank from "../assets/logo_bank.png";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGeo } from '@/core/providers/geo/GeoHooks';
import { useEffect } from 'react';
import anime from 'animejs';


export function FinalBank() {
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  function integration (){
    //@ts-ignore
  window.FBPlayableOnCTAClick = () => {
    //@ts-ignore
    (typeof FbPlayableAd === "undefined") ? alert('FBPlayableAd.onCTAClick') : FbPlayableAd.onCTAClick()
  }
}
  const geo = useGeo();

  useEffect(() => {
    setTimeout(animeSum, 500)
  }, []);
  function animeSum() {
    anime({
      targets: ".sumWinnings",
      innerHTML: [0, geo.winnings],
      round: 1,
      easing: "easeInOutExpo",
    });
  }

  return (
    <Drawer open shouldScaleBackground>
      <DrawerContent className='drawer-content'>
        <DrawerTitle></DrawerTitle>
        <div className="mx-auto  h-[100vh] max-w-[400px] w-[100%]" onClick={() => {
          integration()
        }}>
          <div className="fixed inset-0 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white z-50 animate-slide-up flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-sm font-medium">OT</span>
                </div>
              </div>
              <div className="flex-1 mx-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-white/20 rounded-full py-2 px-4 text-sm text-white placeholder-white/70"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 5.07C9.17669 4.38158 10.5429 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 10.5429 4.38158 9.17669 5.07 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M15 9L12 12L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className='med-bank'>
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-white/80 mb-2">Main - {geo.currencyName}</div>
                <div className="text-4xl font-bold mb-8 sumWinnings-cont"><span className='sumWinnings'>0</span>.58 {geo.currency}</div>

                {/* Action buttons */}
                <div className="flex justify-between w-full max-w-md">
                  <div className="flex flex-col items-center ">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 bank-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs bank-button-text">Add money</span>
                  </div>
                  <div className="flex flex-col items-center ">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 bank-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 10L3 14L7 18M17 14L21 10L17 6M14 4L10 20"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs bank-button-text">Exchange</span>
                  </div>
                  <div className="flex flex-col items-center ">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 bank-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs bank-button-text">Details</span>
                  </div>
                  <div className="flex flex-col items-center ">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2 bank-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-xs bank-button-text">More</span>
                  </div>
                </div>
              </div>

              {/* Promo card */}
              <div className="mx-4 mb-4 bg-gray-800/50 rounded-xl p-4 offer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-base mb-1">Invite friends, earn 50</div>
                    <div className="text-white/70 text-xs">
                      Earn 50 for each friend you invite
                      <br />
                      by August 30.
                    </div>
                  </div>
                  <div className="w-16 h-16">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="64" height="64" rx="8" fill="#4F46E5" fillOpacity="0.2" />
                      <rect x="12" y="12" width="40" height="40" rx="4" fill="#4F46E5" />
                      <rect x="16" y="16" width="32" height="32" rx="2" fill="#818CF8" />
                      <path d="M32 16V48M16 32H48" stroke="#4F46E5" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
              </div>


              {/* Transactions */}
              <div className="mx-4 mb-4 bg-gray-800/50 rounded-xl overflow-auto">
                <div className="p-4 flex items-center parting">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3 parting-logo">
                    <img src={logoBank} alt="" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium parting-name">Plinko App</div>
                    <div className="text-xs text-white/70 parting-date">Today, {getCurrentTime()}</div>
                  </div>
                  <div className="text-green-400 font-semibold parting-sum">+{geo.winnings}.00 {geo.currency}</div>
                </div>
                <div className="p-4 flex items-center border-t border-white/10 parting">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3 parting-logo">
                    <img src={logoBank} alt="" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium parting-name">Plinko App</div>
                    <div className="text-xs text-white/70 parting-date">Today, {getCurrentTime()}</div>
                  </div>
                  <div className="font-semibold parting-sum">-{geo.price}.00 {geo.currency}</div>
                </div>
              </div>
            </div>


            {/* Bottom navigation */}
            <div className="mt-auto bg-gray-900/80 backdrop-blur-sm p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="#6366F1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-indigo-400">Home</span>
                </div>
                <div className="flex flex-col items-center ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-white/50">Invest</span>
                </div>
                <div className="flex flex-col items-center ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 1L21 5M21 5L17 9M21 5H7M7 15L3 19M3 19L7 23M3 19H17"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-white/50">Transfers</span>
                </div>
                <div className="flex flex-col items-center ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.767 19.089C12.2063 19.3896 12.7938 19.3896 13.2331 19.089L20.5543 14.3254C20.9852 14.0315 21.0777 13.4351 20.7586 13.0332C20.6392 12.8823 20.4692 12.7784 20.2807 12.7394L13.3333 11.1667M13.3333 11.1667L12.5 8.33333L11.6667 11.1667M13.3333 11.1667L11.6667 11.1667M11.6667 11.1667L4.71925 12.7394C4.2686 12.8308 3.9693 13.2739 4.06065 13.7245C4.09963 13.913 4.20352 14.083 4.35447 14.2024L11.767 19.089Z"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-white/50">Crypto</span>
                </div>
                <div className="flex flex-col items-center ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20M4 19.5C4 20.163 4.26339 20.7989 4.73223 21.2678C5.20107 21.7366 5.83696 22 6.5 22H20V2H6.5C5.83696 2 5.20107 2.26339 4.73223 2.73223C4.26339 3.20107 4 3.83696 4 4.5V19.5Z"
                      stroke="white"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs text-white/50">Lifestyle</span>
                </div>
              </div>
              <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                <div className="w-1/5 h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
