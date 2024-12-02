import { NavLinks } from "./NavLinks";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { ShoppingCart } from "./ShoppingCart";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <div className='bg-white rounded-full shadow-lg max-w-6xl px-2 mx-auto'>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
          <MobileMenu />
        </div>

        <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
          <Logo className='flex-shrink-0 bg-lime-50 rounded-full size-12 border border-lime-400' />
          <NavLinks />
        </div>

        <div className='hidden md:block flex-1 max-w-xs mx-4'>
          <SearchBar />
        </div>

        <div className='flex items-center space-x-2 md:space-x-4'>
          <ThemeToggle />
          <UserMenu />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};
