'use client';
import { SignedIn,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';


const NavBar = () => {
  const pathname = usePathname();

    return (
        <>
          <nav className="flex justify-between items-center bg-white fixed z-50 w-full h-20 px-10 gap-4 shadow-sm">
              <Link href="/" className="flex items-center gap-1 hover:scale-105 duration-500">
                <Image
                  src="/assets/zoom.png"
                  width={60}
                  height={60}
                  alt="HuddleX"
                  className='sm:block hidden'
                />
              </Link>

              <section className="sticky flex justify-between">
                <div className="flex flex-1 gap-2 sm:gap-6">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                    
                    return (
                      <Link
                        href={item.route}
                        key={item.label}
                        className={
                          cn('flex gap-2 md:gap-5 items-center p-3 rounded-md justify-start shadow hover:scale-105 bg-slate-50 duration-1000 ',
                            isActive && 'bg-blue-50'
                          )
                        }
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={24}
                          height={24}
                          className=''
                        />
                        
                        <p className={cn(
                            "text-gray-600 max-lg:hidden",
                          )}>
                          {item.label}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <div className='scale-130 flex hover:scale-140 duration-1000 items-center'>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
              </div>
          </nav>
        </>
    )
}

export default NavBar