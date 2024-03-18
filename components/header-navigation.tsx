'use client';
import { authState } from "@/states/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import { useRecoilState } from "recoil";

export const HeaderNavigation = () => {
    const [auth, setAuth] = useRecoilState(authState);
    return (
      <>
        {
          auth.isLoggedIn ?
          (
            <Link className="font-bold text-sm" color="foreground" href="https://api.kyonggiti.me/google/logout">
                로그아웃
            </Link>
          ) :
          (
            <Link className="font-bold text-sm" color="foreground" href="https://api.kyonggiti.me/google">
                로그인
            </Link>
          )
        }
      </>
    );
}