import {AuthButton} from "@/modules/auth/ui/components/auth-button";
import {CartSheet} from "@/modules/site/cart/ui/components/cart-sheet";
import {FavoritesSheet} from "@/modules/site/favorites/ui/components/favorites-sheet";

export const UserActions = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="hidden md:flex items-center space-x-3">
        <FavoritesSheet />
        <CartSheet />
      </div>
      <AuthButton />
    </div>
  );
};
